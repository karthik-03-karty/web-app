package handlers

import (
	"database/sql"
	"net/http"
	"synapmentor/internal/database"
	"synapmentor/internal/models"
	"time"

	"github.com/gin-gonic/gin"
)

// CreateSessionRequest represents the session creation request
type CreateSessionRequest struct {
	Title       string    `json:"title" binding:"required"`
	Description string    `json:"description"`
	Category    string    `json:"category" binding:"required"`
	SubCategory string    `json:"sub_category"`
	Duration    int       `json:"duration" binding:"required,min=15,max=480"`
	Price       float64   `json:"price" binding:"required,min=0"`
	ScheduledAt time.Time `json:"scheduled_at" binding:"required"`
	SeekerID    int       `json:"seeker_id"`
}

// GetSessions returns sessions for the current user
func GetSessions(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	status := c.Query("status")
	limit := c.DefaultQuery("limit", "20")
	offset := c.DefaultQuery("offset", "0")

	var query string
	var args []interface{}

	baseQuery := `
		SELECT s.id, s.solver_id, s.seeker_id, s.title, s.description, s.category,
		       s.sub_category, s.duration, s.price, s.status, s.scheduled_at,
		       s.started_at, s.ended_at, s.recording_url, s.rating, s.review,
		       s.created_at, s.updated_at,
		       solver.first_name || ' ' || solver.last_name as solver_name,
		       seeker.first_name || ' ' || seeker.last_name as seeker_name
		FROM sessions s
		JOIN users solver ON s.solver_id = solver.id
		JOIN users seeker ON s.seeker_id = seeker.id`

	if userRole == "solver" {
		query = baseQuery + " WHERE s.solver_id = ?"
		args = append(args, userID)
	} else {
		query = baseQuery + " WHERE s.seeker_id = ?"
		args = append(args, userID)
	}

	if status != "" {
		query += " AND s.status = ?"
		args = append(args, status)
	}

	query += " ORDER BY s.scheduled_at DESC LIMIT ? OFFSET ?"
	args = append(args, limit, offset)

	rows, err := database.DB.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get sessions"})
		return
	}
	defer rows.Close()

	var sessions []map[string]interface{}
	for rows.Next() {
		var session models.Session
		var solverName, seekerName string
		err := rows.Scan(&session.ID, &session.SolverID, &session.SeekerID,
			&session.Title, &session.Description, &session.Category,
			&session.SubCategory, &session.Duration, &session.Price,
			&session.Status, &session.ScheduledAt, &session.StartedAt,
			&session.EndedAt, &session.RecordingURL, &session.Rating,
			&session.Review, &session.CreatedAt, &session.UpdatedAt,
			&solverName, &seekerName)
		if err != nil {
			continue
		}

		sessionData := map[string]interface{}{
			"session":     session,
			"solver_name": solverName,
			"seeker_name": seekerName,
		}
		sessions = append(sessions, sessionData)
	}

	c.JSON(http.StatusOK, sessions)
}

// CreateSession creates a new session
func CreateSession(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var req CreateSessionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var solverID, seekerID int
	if userRole == "solver" {
		solverID = userID.(int)
		if req.SeekerID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Seeker ID is required"})
			return
		}
		seekerID = req.SeekerID
	} else {
		seekerID = userID.(int)
		if req.SeekerID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Solver ID is required"})
			return
		}
		solverID = req.SeekerID // In this case, SeekerID field contains solver ID
	}

	// Validate scheduled time is in the future
	if req.ScheduledAt.Before(time.Now()) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Scheduled time must be in the future"})
		return
	}

	// Insert session
	result, err := database.DB.Exec(`
		INSERT INTO sessions (solver_id, seeker_id, title, description, category,
		                     sub_category, duration, price, scheduled_at, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		solverID, seekerID, req.Title, req.Description, req.Category,
		req.SubCategory, req.Duration, req.Price, req.ScheduledAt,
		time.Now(), time.Now())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create session"})
		return
	}

	sessionID, _ := result.LastInsertId()

	// Create notifications for both users
	notifications := []string{
		`INSERT INTO notifications (user_id, title, message, type, created_at)
		 VALUES (?, 'New Session Scheduled', 'A new session has been scheduled: ` + req.Title + `', 'in_app', ?)`,
	}

	for _, notifQuery := range notifications {
		database.DB.Exec(notifQuery, solverID, time.Now())
		if solverID != seekerID {
			database.DB.Exec(notifQuery, seekerID, time.Now())
		}
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":    "Session created successfully",
		"session_id": sessionID,
	})
}

// GetSession returns a specific session
func GetSession(c *gin.Context) {
	sessionID := c.Param("id")
	userID, _ := c.Get("user_id")

	var session models.Session
	var solverName, seekerName string
	err := database.DB.QueryRow(`
		SELECT s.id, s.solver_id, s.seeker_id, s.title, s.description, s.category,
		       s.sub_category, s.duration, s.price, s.status, s.scheduled_at,
		       s.started_at, s.ended_at, s.recording_url, s.rating, s.review,
		       s.created_at, s.updated_at,
		       solver.first_name || ' ' || solver.last_name as solver_name,
		       seeker.first_name || ' ' || seeker.last_name as seeker_name
		FROM sessions s
		JOIN users solver ON s.solver_id = solver.id
		JOIN users seeker ON s.seeker_id = seeker.id
		WHERE s.id = ? AND (s.solver_id = ? OR s.seeker_id = ?)`,
		sessionID, userID, userID).Scan(
		&session.ID, &session.SolverID, &session.SeekerID,
		&session.Title, &session.Description, &session.Category,
		&session.SubCategory, &session.Duration, &session.Price,
		&session.Status, &session.ScheduledAt, &session.StartedAt,
		&session.EndedAt, &session.RecordingURL, &session.Rating,
		&session.Review, &session.CreatedAt, &session.UpdatedAt,
		&solverName, &seekerName)

	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get session"})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"session":     session,
		"solver_name": solverName,
		"seeker_name": seekerName,
	})
}

// UpdateSession updates a session
func UpdateSession(c *gin.Context) {
	sessionID := c.Param("id")
	userID, _ := c.Get("user_id")

	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify user has permission to update this session
	var solverID, seekerID int
	err := database.DB.QueryRow("SELECT solver_id, seeker_id FROM sessions WHERE id = ?", sessionID).Scan(&solverID, &seekerID)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	if userID != solverID && userID != seekerID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to update this session"})
		return
	}

	// Build update query dynamically based on provided fields
	updateFields := []string{}
	args := []interface{}{}

	allowedFields := map[string]bool{
		"status":      true,
		"started_at":  true,
		"ended_at":    true,
		"rating":      true,
		"review":      true,
		"scheduled_at": true,
	}

	for field, value := range req {
		if allowedFields[field] {
			updateFields = append(updateFields, field+" = ?")
			args = append(args, value)
		}
	}

	if len(updateFields) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No valid fields to update"})
		return
	}

	updateFields = append(updateFields, "updated_at = ?")
	args = append(args, time.Now())
	args = append(args, sessionID)

	query := "UPDATE sessions SET " + joinStrings(updateFields, ", ") + " WHERE id = ?"
	_, err = database.DB.Exec(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update session"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Session updated successfully"})
}

// DeleteSession deletes a session
func DeleteSession(c *gin.Context) {
	sessionID := c.Param("id")
	userID, _ := c.Get("user_id")

	// Verify user has permission to delete this session
	var solverID, seekerID int
	err := database.DB.QueryRow("SELECT solver_id, seeker_id FROM sessions WHERE id = ?", sessionID).Scan(&solverID, &seekerID)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	if userID != solverID && userID != seekerID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to delete this session"})
		return
	}

	// Delete session
	_, err = database.DB.Exec("DELETE FROM sessions WHERE id = ?", sessionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete session"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Session deleted successfully"})
}

// Helper function to join strings
func joinStrings(strs []string, sep string) string {
	if len(strs) == 0 {
		return ""
	}
	if len(strs) == 1 {
		return strs[0]
	}
	
	result := strs[0]
	for i := 1; i < len(strs); i++ {
		result += sep + strs[i]
	}
	return result
}
