package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

// InitDatabase initializes the SQLite database connection
func InitDatabase() error {
	var err error
	
	// Create database directory if it doesn't exist
	if err := os.MkdirAll("./data", 0755); err != nil {
		return fmt.Errorf("failed to create data directory: %v", err)
	}
	
	// Open database connection
	DB, err = sql.Open("sqlite3", "./data/synapmentor.db")
	if err != nil {
		return fmt.Errorf("failed to open database: %v", err)
	}
	
	// Test the connection
	if err = DB.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %v", err)
	}
	
	log.Println("Database connection established successfully")
	
	// Run migrations
	if err := runMigrations(); err != nil {
		return fmt.Errorf("failed to run migrations: %v", err)
	}
	
	// Seed demo data
	if err := seedDemoData(); err != nil {
		log.Printf("Warning: failed to seed demo data: %v", err)
	}
	
	return nil
}

// runMigrations creates all necessary tables
func runMigrations() error {
	migrations := []string{
		createUsersTable,
		createUserProfilesTable,
		createSessionsTable,
		createContentTable,
		createWalletsTable,
		createTransactionsTable,
		createNotificationsTable,
		createCommunitiesTable,
		createDiscussionsTable,
		createEventsTable,
	}
	
	for _, migration := range migrations {
		if _, err := DB.Exec(migration); err != nil {
			return fmt.Errorf("migration failed: %v", err)
		}
	}
	
	log.Println("All migrations completed successfully")
	return nil
}

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    country TEXT,
    city TEXT,
    gender TEXT,
    date_of_birth DATE,
    profile_pic TEXT,
    bio TEXT,
    phone TEXT,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    verification_level TEXT DEFAULT 'light',
    is_active BOOLEAN DEFAULT TRUE,
    role TEXT DEFAULT 'seeker',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`

const createUserProfilesTable = `
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id INTEGER PRIMARY KEY,
    languages TEXT DEFAULT '[]',
    skills TEXT DEFAULT '[]',
    experience TEXT DEFAULT '[]',
    achievements TEXT DEFAULT '[]',
    projects TEXT DEFAULT '[]',
    bank_account TEXT,
    profile_complete INTEGER DEFAULT 0,
    followers INTEGER DEFAULT 0,
    following INTEGER DEFAULT 0,
    interests TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`

const createSessionsTable = `
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    solver_id INTEGER NOT NULL,
    seeker_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    sub_category TEXT,
    duration INTEGER DEFAULT 60,
    price REAL DEFAULT 0.0,
    status TEXT DEFAULT 'scheduled',
    scheduled_at DATETIME NOT NULL,
    started_at DATETIME,
    ended_at DATETIME,
    recording_url TEXT,
    rating INTEGER DEFAULT 0,
    review TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solver_id) REFERENCES users(id),
    FOREIGN KEY (seeker_id) REFERENCES users(id)
);`

const createContentTable = `
CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    url TEXT,
    category TEXT,
    sub_category TEXT,
    tags TEXT DEFAULT '[]',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`

const createWalletsTable = `
CREATE TABLE IF NOT EXISTS wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    balance REAL DEFAULT 0.0,
    currency TEXT DEFAULT 'USD',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`

const createTransactionsTable = `
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_id INTEGER NOT NULL,
    session_id INTEGER,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id),
    FOREIGN KEY (session_id) REFERENCES sessions(id)
);`

const createNotificationsTable = `
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'in_app',
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`

const createCommunitiesTable = `
CREATE TABLE IF NOT EXISTS communities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    member_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`

const createDiscussionsTable = `
CREATE TABLE IF NOT EXISTS discussions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    community_id INTEGER,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (community_id) REFERENCES communities(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);`

const createEventsTable = `
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL,
    duration INTEGER DEFAULT 60,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    category TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);`

// seedDemoData inserts demo data for testing
func seedDemoData() error {
	// Check if data already exists
	var count int
	err := DB.QueryRow("SELECT COUNT(*) FROM users").Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		log.Println("Demo data already exists, skipping seeding")
		return nil
	}

	// Insert demo users
	demoUsers := []string{
		`INSERT INTO users (email, password, first_name, last_name, country, city, role, is_email_verified)
		 VALUES ('john.solver@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', 'USA', 'New York', 'solver', true)`,

		`INSERT INTO users (email, password, first_name, last_name, country, city, role, is_email_verified)
		 VALUES ('jane.seeker@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane', 'Smith', 'UK', 'London', 'seeker', true)`,

		`INSERT INTO users (email, password, first_name, last_name, country, city, role, is_email_verified)
		 VALUES ('admin@synapmentor.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'USA', 'San Francisco', 'admin', true)`,
	}

	for _, query := range demoUsers {
		if _, err := DB.Exec(query); err != nil {
			return fmt.Errorf("failed to insert demo user: %v", err)
		}
	}

	// Insert user profiles
	demoProfiles := []string{
		`INSERT INTO user_profiles (user_id, languages, skills, profile_complete, followers, following)
		 VALUES (1, '["English", "Spanish"]', '["JavaScript", "React", "Node.js"]', 85, 150, 75)`,

		`INSERT INTO user_profiles (user_id, languages, skills, profile_complete, followers, following)
		 VALUES (2, '["English"]', '["Python", "Data Science"]', 60, 50, 120)`,

		`INSERT INTO user_profiles (user_id, languages, skills, profile_complete, followers, following)
		 VALUES (3, '["English"]', '["System Administration"]', 100, 500, 100)`,
	}

	for _, query := range demoProfiles {
		if _, err := DB.Exec(query); err != nil {
			return fmt.Errorf("failed to insert demo profile: %v", err)
		}
	}

	// Insert wallets
	demoWallets := []string{
		`INSERT INTO wallets (user_id, balance) VALUES (1, 250.50)`,
		`INSERT INTO wallets (user_id, balance) VALUES (2, 100.00)`,
		`INSERT INTO wallets (user_id, balance) VALUES (3, 1000.00)`,
	}

	for _, query := range demoWallets {
		if _, err := DB.Exec(query); err != nil {
			return fmt.Errorf("failed to insert demo wallet: %v", err)
		}
	}

	// Insert demo sessions
	demoSessions := []string{
		`INSERT INTO sessions (solver_id, seeker_id, title, description, category, duration, price, status, scheduled_at)
		 VALUES (1, 2, 'JavaScript Fundamentals', 'Learn the basics of JavaScript programming', 'Programming', 60, 25.00, 'completed', datetime('now', '+1 day'))`,

		`INSERT INTO sessions (solver_id, seeker_id, title, description, category, duration, price, status, scheduled_at)
		 VALUES (1, 2, 'React Components Deep Dive', 'Advanced React component patterns', 'Programming', 90, 40.00, 'scheduled', datetime('now', '+2 days'))`,
	}

	for _, query := range demoSessions {
		if _, err := DB.Exec(query); err != nil {
			return fmt.Errorf("failed to insert demo session: %v", err)
		}
	}

	// Insert demo content
	demoContent := []string{
		`INSERT INTO content (user_id, title, description, type, category, tags, views, likes, status)
		 VALUES (1, 'Getting Started with React Hooks', 'A comprehensive guide to React Hooks', 'blog', 'Programming', '["React", "JavaScript", "Hooks"]', 1250, 89, 'published')`,

		`INSERT INTO content (user_id, title, description, type, category, tags, views, likes, status)
		 VALUES (1, 'Building REST APIs with Node.js', 'Step by step tutorial for building APIs', 'video', 'Programming', '["Node.js", "API", "Backend"]', 2100, 156, 'published')`,
	}

	for _, query := range demoContent {
		if _, err := DB.Exec(query); err != nil {
			return fmt.Errorf("failed to insert demo content: %v", err)
		}
	}

	log.Println("Demo data seeded successfully")
	return nil
}
