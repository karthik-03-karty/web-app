package handlers

import (
	"net/http"
	"synapmentor/internal/database"
	"synapmentor/internal/models"
	"time"

	"github.com/gin-gonic/gin"
)

// GetContent returns content for the current user or public content
func GetContent(c *gin.Context) {
	userID, _ := c.Get("user_id")
	category := c.Query("category")
	status := c.DefaultQuery("status", "published")
	limit := c.DefaultQuery("limit", "20")
	offset := c.DefaultQuery("offset", "0")

	query := `
		SELECT c.id, c.user_id, c.title, c.description, c.type, c.url,
		       c.category, c.sub_category, c.tags, c.views, c.likes,
		       c.status, c.created_at, c.updated_at,
		       u.first_name || ' ' || u.last_name as author_name
		FROM content c
		JOIN users u ON c.user_id = u.id
		WHERE (c.user_id = ? OR c.status = 'published')`

	args := []interface{}{userID}

	if category != "" {
		query += " AND c.category = ?"
		args = append(args, category)
	}

	if status != "" && status != "all" {
		query += " AND c.status = ?"
		args = append(args, status)
	}

	query += " ORDER BY c.created_at DESC LIMIT ? OFFSET ?"
	args = append(args, limit, offset)

	rows, err := database.DB.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get content"})
		return
	}
	defer rows.Close()

	var content []map[string]interface{}
	for rows.Next() {
		var item models.Content
		var authorName string
		err := rows.Scan(&item.ID, &item.UserID, &item.Title, &item.Description,
			&item.Type, &item.URL, &item.Category, &item.SubCategory,
			&item.Tags, &item.Views, &item.Likes, &item.Status,
			&item.CreatedAt, &item.UpdatedAt, &authorName)
		if err != nil {
			continue
		}

		contentData := map[string]interface{}{
			"content":     item,
			"author_name": authorName,
		}
		content = append(content, contentData)
	}

	c.JSON(http.StatusOK, content)
}

// CreateContent creates new content
func CreateContent(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var req models.Content
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := database.DB.Exec(`
		INSERT INTO content (user_id, title, description, type, url, category,
		                    sub_category, tags, status, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		userID, req.Title, req.Description, req.Type, req.URL, req.Category,
		req.SubCategory, req.Tags, req.Status, time.Now(), time.Now())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create content"})
		return
	}

	contentID, _ := result.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{
		"message":    "Content created successfully",
		"content_id": contentID,
	})
}

// GetContentByID returns specific content
func GetContentByID(c *gin.Context) {
	contentID := c.Param("id")

	var content models.Content
	var authorName string
	err := database.DB.QueryRow(`
		SELECT c.id, c.user_id, c.title, c.description, c.type, c.url,
		       c.category, c.sub_category, c.tags, c.views, c.likes,
		       c.status, c.created_at, c.updated_at,
		       u.first_name || ' ' || u.last_name as author_name
		FROM content c
		JOIN users u ON c.user_id = u.id
		WHERE c.id = ?`, contentID).Scan(
		&content.ID, &content.UserID, &content.Title, &content.Description,
		&content.Type, &content.URL, &content.Category, &content.SubCategory,
		&content.Tags, &content.Views, &content.Likes, &content.Status,
		&content.CreatedAt, &content.UpdatedAt, &authorName)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Content not found"})
		return
	}

	// Increment view count
	database.DB.Exec("UPDATE content SET views = views + 1 WHERE id = ?", contentID)

	c.JSON(http.StatusOK, map[string]interface{}{
		"content":     content,
		"author_name": authorName,
	})
}

// UpdateContent updates content
func UpdateContent(c *gin.Context) {
	contentID := c.Param("id")
	userID, _ := c.Get("user_id")

	var req models.Content
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify ownership
	var ownerID int
	err := database.DB.QueryRow("SELECT user_id FROM content WHERE id = ?", contentID).Scan(&ownerID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Content not found"})
		return
	}

	if ownerID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to update this content"})
		return
	}

	_, err = database.DB.Exec(`
		UPDATE content SET title = ?, description = ?, type = ?, url = ?,
		                  category = ?, sub_category = ?, tags = ?, status = ?, updated_at = ?
		WHERE id = ?`,
		req.Title, req.Description, req.Type, req.URL, req.Category,
		req.SubCategory, req.Tags, req.Status, time.Now(), contentID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update content"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Content updated successfully"})
}

// DeleteContent deletes content
func DeleteContent(c *gin.Context) {
	contentID := c.Param("id")
	userID, _ := c.Get("user_id")

	// Verify ownership
	var ownerID int
	err := database.DB.QueryRow("SELECT user_id FROM content WHERE id = ?", contentID).Scan(&ownerID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Content not found"})
		return
	}

	if ownerID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to delete this content"})
		return
	}

	_, err = database.DB.Exec("DELETE FROM content WHERE id = ?", contentID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete content"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Content deleted successfully"})
}

// GetWallet returns wallet information
func GetWallet(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var wallet models.Wallet
	err := database.DB.QueryRow(`
		SELECT id, user_id, balance, currency, created_at, updated_at
		FROM wallets WHERE user_id = ?`, userID).Scan(
		&wallet.ID, &wallet.UserID, &wallet.Balance, &wallet.Currency,
		&wallet.CreatedAt, &wallet.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get wallet"})
		return
	}

	c.JSON(http.StatusOK, wallet)
}

// GetTransactions returns transaction history
func GetTransactions(c *gin.Context) {
	userID, _ := c.Get("user_id")
	limit := c.DefaultQuery("limit", "20")
	offset := c.DefaultQuery("offset", "0")

	// Get wallet ID first
	var walletID int
	err := database.DB.QueryRow("SELECT id FROM wallets WHERE user_id = ?", userID).Scan(&walletID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Wallet not found"})
		return
	}

	rows, err := database.DB.Query(`
		SELECT id, wallet_id, session_id, type, amount, description, status, created_at
		FROM transactions WHERE wallet_id = ?
		ORDER BY created_at DESC LIMIT ? OFFSET ?`,
		walletID, limit, offset)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get transactions"})
		return
	}
	defer rows.Close()

	var transactions []models.Transaction
	for rows.Next() {
		var transaction models.Transaction
		err := rows.Scan(&transaction.ID, &transaction.WalletID, &transaction.SessionID,
			&transaction.Type, &transaction.Amount, &transaction.Description,
			&transaction.Status, &transaction.CreatedAt)
		if err != nil {
			continue
		}
		transactions = append(transactions, transaction)
	}

	c.JSON(http.StatusOK, transactions)
}

// TransferFunds handles fund transfers
func TransferFunds(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var req struct {
		Amount      float64 `json:"amount" binding:"required,min=0.01"`
		Description string  `json:"description"`
		Type        string  `json:"type" binding:"required,oneof=withdraw deposit"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get wallet
	var walletID int
	var currentBalance float64
	err := database.DB.QueryRow("SELECT id, balance FROM wallets WHERE user_id = ?", userID).Scan(&walletID, &currentBalance)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Wallet not found"})
		return
	}

	// Check balance for withdrawals
	if req.Type == "withdraw" && currentBalance < req.Amount {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient balance"})
		return
	}

	// Create transaction
	_, err = database.DB.Exec(`
		INSERT INTO transactions (wallet_id, type, amount, description, status, created_at)
		VALUES (?, ?, ?, ?, 'completed', ?)`,
		walletID, req.Type, req.Amount, req.Description, time.Now())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// Update wallet balance
	var newBalance float64
	if req.Type == "deposit" {
		newBalance = currentBalance + req.Amount
	} else {
		newBalance = currentBalance - req.Amount
	}

	_, err = database.DB.Exec("UPDATE wallets SET balance = ?, updated_at = ? WHERE id = ?",
		newBalance, time.Now(), walletID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update wallet balance"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Transfer completed successfully",
		"new_balance": newBalance,
	})
}

// Placeholder handlers for remaining endpoints
func GetNotifications(c *gin.Context) {
	userID, _ := c.Get("user_id")
	
	rows, err := database.DB.Query(`
		SELECT id, user_id, title, message, type, is_read, created_at
		FROM notifications WHERE user_id = ?
		ORDER BY created_at DESC LIMIT 50`, userID)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get notifications"})
		return
	}
	defer rows.Close()

	var notifications []models.Notification
	for rows.Next() {
		var notification models.Notification
		err := rows.Scan(&notification.ID, &notification.UserID, &notification.Title,
			&notification.Message, &notification.Type, &notification.IsRead, &notification.CreatedAt)
		if err != nil {
			continue
		}
		notifications = append(notifications, notification)
	}

	c.JSON(http.StatusOK, notifications)
}

func MarkNotificationRead(c *gin.Context) {
	notificationID := c.Param("id")
	userID, _ := c.Get("user_id")

	_, err := database.DB.Exec("UPDATE notifications SET is_read = true WHERE id = ? AND user_id = ?",
		notificationID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to mark notification as read"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Notification marked as read"})
}

func DeleteNotification(c *gin.Context) {
	notificationID := c.Param("id")
	userID, _ := c.Get("user_id")

	_, err := database.DB.Exec("DELETE FROM notifications WHERE id = ? AND user_id = ?",
		notificationID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete notification"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Notification deleted"})
}

func GetDiscussions(c *gin.Context) { c.JSON(http.StatusOK, []interface{}{}) }
func CreateDiscussion(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "Discussion created"}) }
func GetEvents(c *gin.Context) { c.JSON(http.StatusOK, []interface{}{}) }
func CreateEvent(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "Event created"}) }
func GetSettings(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"theme": "dark", "notifications": true}) }
func UpdateSettings(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "Settings updated"}) }
func GetAllUsers(c *gin.Context) { c.JSON(http.StatusOK, []interface{}{}) }
func UpdateUserStatus(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "User status updated"}) }
func GetAllSessions(c *gin.Context) { c.JSON(http.StatusOK, []interface{}{}) }
func GetPlatformAnalytics(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"total_users": 1000, "total_sessions": 5000}) }
