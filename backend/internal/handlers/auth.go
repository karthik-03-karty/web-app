package handlers

import (
	"database/sql"
	"log"
	"net/http"
	"strings"
	"synapmentor/internal/auth"
	"synapmentor/internal/database"
	"synapmentor/internal/models"
	"time"

	"github.com/gin-gonic/gin"
)

// RegisterRequest represents the registration request payload
type RegisterRequest struct {
	Email           string `json:"email" binding:"required,email"`
	Password        string `json:"password" binding:"required,min=8"`
	ConfirmPassword string `json:"confirm_password" binding:"required"`
	FirstName       string `json:"first_name" binding:"required"`
	LastName        string `json:"last_name" binding:"required"`
	Role            string `json:"role" binding:"required,oneof=solver seeker"`
	AcceptTerms     bool   `json:"accept_terms" binding:"required"`
}

// LoginRequest represents the login request payload
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// AuthResponse represents the authentication response
type AuthResponse struct {
	Token string      `json:"token"`
	User  models.User `json:"user"`
}

// Register handles user registration
func Register(c *gin.Context) {
	log.Printf("Registration request received from %s", c.ClientIP())

	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("JSON binding error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Registration attempt for email: %s", req.Email)

	// Validate password confirmation
	if req.Password != req.ConfirmPassword {
		log.Printf("Password confirmation failed for email: %s", req.Email)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Passwords do not match"})
		return
	}

	// Validate password strength
	if !auth.ValidatePasswordStrength(req.Password) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password must be at least 8 characters with uppercase, lowercase, and number"})
		return
	}

	// Check if user already exists
	var existingID int
	err := database.DB.QueryRow("SELECT id FROM users WHERE email = ?", req.Email).Scan(&existingID)
	if err != sql.ErrNoRows {
		c.JSON(http.StatusConflict, gin.H{"error": "User with this email already exists"})
		return
	}

	// Hash password
	hashedPassword, err := auth.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Insert user
	result, err := database.DB.Exec(`
		INSERT INTO users (email, password, first_name, last_name, role, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
		req.Email, hashedPassword, req.FirstName, req.LastName, req.Role, time.Now(), time.Now())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	userID, _ := result.LastInsertId()

	// Create user profile
	_, err = database.DB.Exec(`
		INSERT INTO user_profiles (user_id, created_at, updated_at)
		VALUES (?, ?, ?)`,
		userID, time.Now(), time.Now())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user profile"})
		return
	}

	// Create wallet
	_, err = database.DB.Exec(`
		INSERT INTO wallets (user_id, created_at, updated_at)
		VALUES (?, ?, ?)`,
		userID, time.Now(), time.Now())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create wallet"})
		return
	}

	// Generate JWT token
	token, err := auth.GenerateToken(int(userID), req.Email, req.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Get created user
	user := models.User{}
	err = database.DB.QueryRow(`
		SELECT id, email, first_name, last_name, role, is_email_verified, is_active, created_at
		FROM users WHERE id = ?`, userID).Scan(
		&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.Role,
		&user.IsEmailVerified, &user.IsActive, &user.CreatedAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user"})
		return
	}

	log.Printf("User registration successful for email: %s", req.Email)
	c.JSON(http.StatusCreated, AuthResponse{
		Token: token,
		User:  user,
	})
}

// Login handles user authentication
func Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user from database
	var user models.User
	var hashedPassword string
	err := database.DB.QueryRow(`
		SELECT id, email, password, first_name, last_name, role, is_email_verified, is_active, created_at
		FROM users WHERE email = ?`, req.Email).Scan(
		&user.ID, &user.Email, &hashedPassword, &user.FirstName, &user.LastName,
		&user.Role, &user.IsEmailVerified, &user.IsActive, &user.CreatedAt)

	if err == sql.ErrNoRows {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Check if user is active
	if !user.IsActive {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Account is deactivated"})
		return
	}

	// Verify password
	if !auth.CheckPasswordHash(req.Password, hashedPassword) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT token
	token, err := auth.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Token: token,
		User:  user,
	})
}

// GetProfile returns the current user's profile
func GetProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var user models.User
	err := database.DB.QueryRow(`
		SELECT id, email,
		       COALESCE(first_name, '') as first_name,
		       COALESCE(last_name, '') as last_name,
		       COALESCE(country, '') as country,
		       COALESCE(city, '') as city,
		       COALESCE(gender, '') as gender,
		       date_of_birth,
		       COALESCE(profile_pic, '') as profile_pic,
		       COALESCE(bio, '') as bio,
		       COALESCE(phone, '') as phone,
		       COALESCE(is_email_verified, 0) as is_email_verified,
		       COALESCE(is_phone_verified, 0) as is_phone_verified,
		       COALESCE(verification_level, 'light') as verification_level,
		       COALESCE(is_active, 1) as is_active,
		       role, created_at, updated_at
		FROM users WHERE id = ?`, userID).Scan(
		&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.Country,
		&user.City, &user.Gender, &user.DateOfBirth, &user.ProfilePic, &user.Bio,
		&user.Phone, &user.IsEmailVerified, &user.IsPhoneVerified,
		&user.VerificationLevel, &user.IsActive, &user.Role, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get profile"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// UpdateProfile updates the current user's profile
func UpdateProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var req models.User
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update user profile
	_, err := database.DB.Exec(`
		UPDATE users SET first_name = ?, last_name = ?, country = ?, city = ?,
		               gender = ?, date_of_birth = ?, bio = ?, phone = ?, updated_at = ?
		WHERE id = ?`,
		req.FirstName, req.LastName, req.Country, req.City, req.Gender,
		req.DateOfBirth, req.Bio, req.Phone, time.Now(), userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}

// RefreshToken generates a new token
func RefreshToken(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
		return
	}

	tokenParts := strings.Split(authHeader, " ")
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization header format"})
		return
	}

	newToken, err := auth.RefreshToken(tokenParts[1])
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to refresh token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": newToken})
}
