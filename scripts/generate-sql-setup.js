// Generate complete SQL setup script
console.log("🗄️ Generating Complete MySQL Setup Script")
console.log("=".repeat(60))

console.log("\n📋 Copy and paste this SQL into MySQL Workbench:")
console.log("-".repeat(60))

const sqlScript = `-- =====================================================
-- CineBox Complete Database Setup Script
-- Run this in MySQL Workbench or MySQL Command Line
-- =====================================================

-- Drop existing database (optional - removes all data)
-- DROP DATABASE IF EXISTS GineBox;

-- Create database with proper charset
CREATE DATABASE IF NOT EXISTS GineBox 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Select the database
USE GineBox;

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url LONGTEXT,
    rating DECIMAL(3,1) NOT NULL CHECK (rating >= 1 AND rating <= 10),
    review_user TEXT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better performance
CREATE INDEX idx_rating ON movies(rating);
CREATE INDEX idx_genre ON movies(genre);
CREATE INDEX idx_year ON movies(year);
CREATE INDEX idx_created_at ON movies(created_at);

-- Insert sample data
INSERT INTO movies (title, description, image_url, rating, review_user, genre, year) VALUES
('The Shawshank Redemption', 
 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 
 '/placeholder.svg?height=450&width=300', 
 9.3, 
 'A masterpiece of storytelling that never gets old. The character development and emotional depth are unmatched.', 
 'Drama', 
 1994),

('The Dark Knight', 
 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.', 
 '/placeholder.svg?height=450&width=300', 
 9.0, 
 'Heath Ledger\\'s Joker is absolutely phenomenal. This film redefined what superhero movies could be.', 
 'Action', 
 2008),

('Pulp Fiction', 
 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.', 
 '/placeholder.svg?height=450&width=300', 
 8.9, 
 'Tarantino\\'s non-linear storytelling at its finest. Every scene is memorable and quotable.', 
 'Thriller', 
 1994),

('Inception', 
 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 
 '/placeholder.svg?height=450&width=300', 
 8.8, 
 'Mind-bending and visually stunning. Nolan creates a complex narrative that rewards multiple viewings.', 
 'Sci-Fi', 
 2010);

-- Verify setup
SELECT 'Database setup completed!' as status;
SELECT COUNT(*) as total_movies FROM movies;
SELECT 'Sample movies:' as info;
SELECT id, title, genre, rating FROM movies ORDER BY rating DESC;

-- Test queries
SELECT 'Testing different filters:' as test_info;
SELECT 'Top rated (>= 8.5):' as filter_type, COUNT(*) as count FROM movies WHERE rating >= 8.5;
SELECT 'By genre:' as filter_type;
SELECT genre, COUNT(*) as count FROM movies GROUP BY genre;`

console.log(sqlScript)
console.log("-".repeat(60))

console.log("\n🚀 How to use this script:")
console.log("1. Open MySQL Workbench")
console.log("2. Connect to your MySQL server")
console.log("3. Create a new SQL tab")
console.log("4. Copy and paste the script above")
console.log("5. Click Execute (⚡) button")
console.log("6. Check the results in the output panel")

console.log("\n✅ After running the script:")
console.log("• GineBox database will be created")
console.log("• movies table will be created with proper structure")
console.log("• 4 sample movies will be inserted")
console.log("• Indexes will be created for better performance")

console.log("\n🔧 If you get errors:")
console.log("• Make sure you're connected to MySQL")
console.log("• Check if you have CREATE DATABASE permissions")
console.log("• Try running each section separately")
console.log("• Check MySQL error log for details")

console.log("\n📝 Alternative: Command Line")
console.log("You can also run this via command line:")
console.log("mysql -u root -p < setup_script.sql")
