package handlers

import (
	"net/http"
	"synapmentor/internal/database"

	"github.com/gin-gonic/gin"
)

// DashboardStats represents dashboard statistics
type DashboardStats struct {
	TotalSessions    int     `json:"total_sessions"`
	CompletedSessions int    `json:"completed_sessions"`
	TotalEarnings    float64 `json:"total_earnings"`
	TotalContent     int     `json:"total_content"`
	TotalViews       int     `json:"total_views"`
	Followers        int     `json:"followers"`
	Following        int     `json:"following"`
	WalletBalance    float64 `json:"wallet_balance"`
	ProfileComplete  int     `json:"profile_complete"`
}

// RecentSession represents a recent session
type RecentSession struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	SeekerName  string `json:"seeker_name"`
	Status      string `json:"status"`
	ScheduledAt string `json:"scheduled_at"`
	Duration    int    `json:"duration"`
	Price       float64 `json:"price"`
}

// LeaderboardEntry represents a leaderboard entry
type LeaderboardEntry struct {
	UserID      int     `json:"user_id"`
	Name        string  `json:"name"`
	ProfilePic  string  `json:"profile_pic"`
	TotalSessions int   `json:"total_sessions"`
	Rating      float64 `json:"rating"`
	Earnings    float64 `json:"earnings"`
}

// GetDashboardStats returns dashboard statistics for the current user
func GetDashboardStats(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var stats DashboardStats

	// Get session statistics
	err := database.DB.QueryRow(`
		SELECT 
			COUNT(*) as total_sessions,
			COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_sessions,
			COALESCE(SUM(CASE WHEN status = 'completed' THEN price ELSE 0 END), 0) as total_earnings
		FROM sessions WHERE solver_id = ?`, userID).Scan(
		&stats.TotalSessions, &stats.CompletedSessions, &stats.TotalEarnings)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get session stats"})
		return
	}

	// Get content statistics
	err = database.DB.QueryRow(`
		SELECT 
			COUNT(*) as total_content,
			COALESCE(SUM(views), 0) as total_views
		FROM content WHERE user_id = ? AND status = 'published'`, userID).Scan(
		&stats.TotalContent, &stats.TotalViews)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get content stats"})
		return
	}

	// Get profile statistics
	err = database.DB.QueryRow(`
		SELECT followers, following, profile_complete
		FROM user_profiles WHERE user_id = ?`, userID).Scan(
		&stats.Followers, &stats.Following, &stats.ProfileComplete)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get profile stats"})
		return
	}

	// Get wallet balance
	err = database.DB.QueryRow(`
		SELECT balance FROM wallets WHERE user_id = ?`, userID).Scan(&stats.WalletBalance)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get wallet balance"})
		return
	}

	c.JSON(http.StatusOK, stats)
}

// GetRecentSessions returns recent sessions for the current user
func GetRecentSessions(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var query string
	if userRole == "solver" {
		query = `
			SELECT s.id, s.title, u.first_name || ' ' || u.last_name as seeker_name,
			       s.status, s.scheduled_at, s.duration, s.price
			FROM sessions s
			JOIN users u ON s.seeker_id = u.id
			WHERE s.solver_id = ?
			ORDER BY s.scheduled_at DESC
			LIMIT 10`
	} else {
		query = `
			SELECT s.id, s.title, u.first_name || ' ' || u.last_name as solver_name,
			       s.status, s.scheduled_at, s.duration, s.price
			FROM sessions s
			JOIN users u ON s.solver_id = u.id
			WHERE s.seeker_id = ?
			ORDER BY s.scheduled_at DESC
			LIMIT 10`
	}

	rows, err := database.DB.Query(query, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get recent sessions"})
		return
	}
	defer rows.Close()

	var sessions []RecentSession
	for rows.Next() {
		var session RecentSession
		err := rows.Scan(&session.ID, &session.Title, &session.SeekerName,
			&session.Status, &session.ScheduledAt, &session.Duration, &session.Price)
		if err != nil {
			continue
		}
		sessions = append(sessions, session)
	}

	c.JSON(http.StatusOK, sessions)
}

// GetLeaderboard returns the top performers leaderboard
func GetLeaderboard(c *gin.Context) {
	query := `
		SELECT 
			u.id, u.first_name || ' ' || u.last_name as name, u.profile_pic,
			COUNT(s.id) as total_sessions,
			COALESCE(AVG(s.rating), 0) as rating,
			COALESCE(SUM(CASE WHEN s.status = 'completed' THEN s.price ELSE 0 END), 0) as earnings
		FROM users u
		LEFT JOIN sessions s ON u.id = s.solver_id
		WHERE u.role = 'solver' AND u.is_active = true
		GROUP BY u.id, u.first_name, u.last_name, u.profile_pic
		HAVING total_sessions > 0
		ORDER BY earnings DESC, rating DESC
		LIMIT 20`

	rows, err := database.DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get leaderboard"})
		return
	}
	defer rows.Close()

	var leaderboard []LeaderboardEntry
	for rows.Next() {
		var entry LeaderboardEntry
		err := rows.Scan(&entry.UserID, &entry.Name, &entry.ProfilePic,
			&entry.TotalSessions, &entry.Rating, &entry.Earnings)
		if err != nil {
			continue
		}
		leaderboard = append(leaderboard, entry)
	}

	c.JSON(http.StatusOK, leaderboard)
}

// GetUpcomingSessions returns upcoming sessions for the current user
func GetUpcomingSessions(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var query string
	if userRole == "solver" {
		query = `
			SELECT s.id, s.title, u.first_name || ' ' || u.last_name as seeker_name,
			       s.status, s.scheduled_at, s.duration, s.price
			FROM sessions s
			JOIN users u ON s.seeker_id = u.id
			WHERE s.solver_id = ? AND s.status IN ('scheduled', 'confirmed')
			AND s.scheduled_at > datetime('now')
			ORDER BY s.scheduled_at ASC`
	} else {
		query = `
			SELECT s.id, s.title, u.first_name || ' ' || u.last_name as solver_name,
			       s.status, s.scheduled_at, s.duration, s.price
			FROM sessions s
			JOIN users u ON s.solver_id = u.id
			WHERE s.seeker_id = ? AND s.status IN ('scheduled', 'confirmed')
			AND s.scheduled_at > datetime('now')
			ORDER BY s.scheduled_at ASC`
	}

	rows, err := database.DB.Query(query, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get upcoming sessions"})
		return
	}
	defer rows.Close()

	var sessions []RecentSession
	for rows.Next() {
		var session RecentSession
		err := rows.Scan(&session.ID, &session.Title, &session.SeekerName,
			&session.Status, &session.ScheduledAt, &session.Duration, &session.Price)
		if err != nil {
			continue
		}
		sessions = append(sessions, session)
	}

	c.JSON(http.StatusOK, sessions)
}

// GetAnalytics returns detailed analytics for the current user
func GetAnalytics(c *gin.Context) {
	userID, _ := c.Get("user_id")

	// Get monthly session data for the last 6 months
	monthlyQuery := `
		SELECT 
			strftime('%Y-%m', scheduled_at) as month,
			COUNT(*) as sessions,
			COALESCE(SUM(CASE WHEN status = 'completed' THEN price ELSE 0 END), 0) as earnings
		FROM sessions 
		WHERE solver_id = ? 
		AND scheduled_at >= date('now', '-6 months')
		GROUP BY strftime('%Y-%m', scheduled_at)
		ORDER BY month`

	rows, err := database.DB.Query(monthlyQuery, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get analytics"})
		return
	}
	defer rows.Close()

	type MonthlyData struct {
		Month    string  `json:"month"`
		Sessions int     `json:"sessions"`
		Earnings float64 `json:"earnings"`
	}

	var monthlyData []MonthlyData
	for rows.Next() {
		var data MonthlyData
		err := rows.Scan(&data.Month, &data.Sessions, &data.Earnings)
		if err != nil {
			continue
		}
		monthlyData = append(monthlyData, data)
	}

	c.JSON(http.StatusOK, gin.H{
		"monthly_data": monthlyData,
	})
}
