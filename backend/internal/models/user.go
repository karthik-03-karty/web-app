package models

import (
	"time"
)

// User represents a user in the system
type User struct {
	ID                int       `json:"id" db:"id"`
	Email             string    `json:"email" db:"email"`
	Password          string    `json:"-" db:"password"` // Hidden from JSON
	FirstName         string    `json:"first_name" db:"first_name"`
	LastName          string    `json:"last_name" db:"last_name"`
	Country           string    `json:"country" db:"country"`
	City              string    `json:"city" db:"city"`
	Gender            string    `json:"gender" db:"gender"`
	DateOfBirth       *time.Time `json:"date_of_birth" db:"date_of_birth"`
	ProfilePic        string    `json:"profile_pic" db:"profile_pic"`
	Bio               string    `json:"bio" db:"bio"`
	Phone             string    `json:"phone" db:"phone"`
	IsEmailVerified   bool      `json:"is_email_verified" db:"is_email_verified"`
	IsPhoneVerified   bool      `json:"is_phone_verified" db:"is_phone_verified"`
	VerificationLevel string    `json:"verification_level" db:"verification_level"` // light, standard, full
	IsActive          bool      `json:"is_active" db:"is_active"`
	Role              string    `json:"role" db:"role"` // solver, seeker, admin
	CreatedAt         time.Time `json:"created_at" db:"created_at"`
	UpdatedAt         time.Time `json:"updated_at" db:"updated_at"`
}

// UserProfile represents extended user profile information
type UserProfile struct {
	UserID           int       `json:"user_id" db:"user_id"`
	Languages        string    `json:"languages" db:"languages"` // JSON array
	Skills           string    `json:"skills" db:"skills"`       // JSON array
	Experience       string    `json:"experience" db:"experience"` // JSON array
	Achievements     string    `json:"achievements" db:"achievements"` // JSON array
	Projects         string    `json:"projects" db:"projects"` // JSON array
	BankAccount      string    `json:"bank_account" db:"bank_account"`
	ProfileComplete  int       `json:"profile_complete" db:"profile_complete"` // percentage
	Followers        int       `json:"followers" db:"followers"`
	Following        int       `json:"following" db:"following"`
	Interests        string    `json:"interests" db:"interests"` // JSON array
	CreatedAt        time.Time `json:"created_at" db:"created_at"`
	UpdatedAt        time.Time `json:"updated_at" db:"updated_at"`
}

// Session represents a tutoring session
type Session struct {
	ID          int       `json:"id" db:"id"`
	SolverID    int       `json:"solver_id" db:"solver_id"`
	SeekerID    int       `json:"seeker_id" db:"seeker_id"`
	Title       string    `json:"title" db:"title"`
	Description string    `json:"description" db:"description"`
	Category    string    `json:"category" db:"category"`
	SubCategory string    `json:"sub_category" db:"sub_category"`
	Duration    int       `json:"duration" db:"duration"` // minutes
	Price       float64   `json:"price" db:"price"`
	Status      string    `json:"status" db:"status"` // scheduled, active, completed, cancelled
	ScheduledAt time.Time `json:"scheduled_at" db:"scheduled_at"`
	StartedAt   *time.Time `json:"started_at" db:"started_at"`
	EndedAt     *time.Time `json:"ended_at" db:"ended_at"`
	RecordingURL string   `json:"recording_url" db:"recording_url"`
	Rating      int       `json:"rating" db:"rating"`
	Review      string    `json:"review" db:"review"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

// Content represents user-generated content
type Content struct {
	ID          int       `json:"id" db:"id"`
	UserID      int       `json:"user_id" db:"user_id"`
	Title       string    `json:"title" db:"title"`
	Description string    `json:"description" db:"description"`
	Type        string    `json:"type" db:"type"` // reel, blog, video, link, pdf, github
	URL         string    `json:"url" db:"url"`
	Category    string    `json:"category" db:"category"`
	SubCategory string    `json:"sub_category" db:"sub_category"`
	Tags        string    `json:"tags" db:"tags"` // JSON array
	Views       int       `json:"views" db:"views"`
	Likes       int       `json:"likes" db:"likes"`
	Status      string    `json:"status" db:"status"` // draft, published, archived
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

// Wallet represents user wallet
type Wallet struct {
	ID        int       `json:"id" db:"id"`
	UserID    int       `json:"user_id" db:"user_id"`
	Balance   float64   `json:"balance" db:"balance"`
	Currency  string    `json:"currency" db:"currency"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// Transaction represents wallet transactions
type Transaction struct {
	ID          int       `json:"id" db:"id"`
	WalletID    int       `json:"wallet_id" db:"wallet_id"`
	SessionID   *int      `json:"session_id" db:"session_id"`
	Type        string    `json:"type" db:"type"` // credit, debit
	Amount      float64   `json:"amount" db:"amount"`
	Description string    `json:"description" db:"description"`
	Status      string    `json:"status" db:"status"` // pending, completed, failed
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

// Notification represents user notifications
type Notification struct {
	ID        int       `json:"id" db:"id"`
	UserID    int       `json:"user_id" db:"user_id"`
	Title     string    `json:"title" db:"title"`
	Message   string    `json:"message" db:"message"`
	Type      string    `json:"type" db:"type"` // email, push, in_app
	IsRead    bool      `json:"is_read" db:"is_read"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}
