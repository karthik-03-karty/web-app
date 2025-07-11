package main

import (
	"log"
	"synapmentor/internal/database"
	"synapmentor/internal/handlers"
	"synapmentor/internal/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using default values")
	}

	// Initialize database
	if err := database.InitDatabase(); err != nil {
		log.Fatal("Failed to initialize database:", err)
	}

	// Initialize Gin router
	r := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "http://localhost:5179", "http://localhost:5180", "http://localhost:3000", "http://localhost:4173", "http://localhost:8080"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "message": "SynapMentor API is running"})
	})

	// API routes
	api := r.Group("/api/v1")

	// Public routes (no authentication required)
	public := api.Group("/")
	{
		public.POST("/register", handlers.Register)
		public.POST("/login", handlers.Login)
		public.POST("/refresh-token", handlers.RefreshToken)
		public.GET("/leaderboard", handlers.GetLeaderboard)
	}

	// Protected routes (authentication required)
	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		// User profile routes
		protected.GET("/profile", handlers.GetProfile)
		protected.PUT("/profile", handlers.UpdateProfile)

		// Dashboard routes
		protected.GET("/dashboard/stats", handlers.GetDashboardStats)
		protected.GET("/dashboard/recent-sessions", handlers.GetRecentSessions)
		protected.GET("/dashboard/upcoming-sessions", handlers.GetUpcomingSessions)
		protected.GET("/dashboard/analytics", handlers.GetAnalytics)

		// Session routes
		protected.GET("/sessions", handlers.GetSessions)
		protected.POST("/sessions", handlers.CreateSession)
		protected.GET("/sessions/:id", handlers.GetSession)
		protected.PUT("/sessions/:id", handlers.UpdateSession)
		protected.DELETE("/sessions/:id", handlers.DeleteSession)

		// Content routes
		protected.GET("/content", handlers.GetContent)
		protected.POST("/content", handlers.CreateContent)
		protected.GET("/content/:id", handlers.GetContentByID)
		protected.PUT("/content/:id", handlers.UpdateContent)
		protected.DELETE("/content/:id", handlers.DeleteContent)

		// Wallet routes
		protected.GET("/wallet", handlers.GetWallet)
		protected.GET("/wallet/transactions", handlers.GetTransactions)
		protected.POST("/wallet/transfer", handlers.TransferFunds)

		// Notification routes
		protected.GET("/notifications", handlers.GetNotifications)
		protected.PUT("/notifications/:id/read", handlers.MarkNotificationRead)
		protected.DELETE("/notifications/:id", handlers.DeleteNotification)

		// Community routes
		protected.GET("/community/discussions", handlers.GetDiscussions)
		protected.POST("/community/discussions", handlers.CreateDiscussion)
		protected.GET("/community/events", handlers.GetEvents)
		protected.POST("/community/events", handlers.CreateEvent)

		// Settings routes
		protected.GET("/settings", handlers.GetSettings)
		protected.PUT("/settings", handlers.UpdateSettings)
	}

	// Admin routes (admin role required)
	admin := api.Group("/admin")
	admin.Use(middleware.AuthMiddleware())
	admin.Use(middleware.RequireRole("admin"))
	{
		admin.GET("/users", handlers.GetAllUsers)
		admin.PUT("/users/:id/status", handlers.UpdateUserStatus)
		admin.GET("/sessions/all", handlers.GetAllSessions)
		admin.GET("/analytics/platform", handlers.GetPlatformAnalytics)
	}

	log.Println("Server starting on :8081")
	if err := r.Run(":8081"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
