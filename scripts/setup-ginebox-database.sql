-- =====================================================
-- GineBox Database Setup Script for MySQL Workbench
-- =====================================================

-- Drop database if exists (optional - uncomment if you want to reset)
-- DROP DATABASE IF EXISTS GineBox;

-- Create GineBox database
CREATE DATABASE IF NOT EXISTS GineBox 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
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

-- Insert sample data for testing
INSERT INTO movies (title, description, image_url, rating, review_user, genre, year) VALUES
('The Shawshank Redemption', 
 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 
 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5TaGF3c2hhbms8L3RleHQ+Cjwvc3ZnPg==', 
 9.3, 
 'A masterpiece of storytelling that never gets old. The character development and emotional depth are unmatched. This film teaches us about hope, friendship, and the power of human spirit.', 
 'Drama', 
 1994),

('The Dark Knight', 
 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.', 
 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMTExIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5EYXJrIEtuaWdodDwvdGV4dD4KPC9zdmc+', 
 9.0, 
 'Heath Ledger\'s Joker is absolutely phenomenal. This film redefined what superhero movies could be. The action sequences and moral dilemmas are perfectly balanced.', 
 'Action', 
 2008),

('Pulp Fiction', 
 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.', 
 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjNjY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5QdWxwIEZpY3Rpb248L3RleHQ+Cjwvc3ZnPg==', 
 8.9, 
 'Tarantino\'s non-linear storytelling at its finest. Every scene is memorable and quotable. The dialogue and character interactions are simply brilliant.', 
 'Thriller', 
 1994),

('Inception', 
 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 
 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjNDQ0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5JbmNlcHRpb248L3RleHQ+Cjwvc3ZnPg==', 
 8.8, 
 'Mind-bending and visually stunning. Nolan creates a complex narrative that rewards multiple viewings. The practical effects and cinematography are outstanding.', 
 'Sci-Fi', 
 2010),

('Forrest Gump', 
 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.', 
 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjNzc3Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5Gb3JyZXN0IEd1bXA8L3RleHQ+Cjwvc3ZnPg==', 
 8.8, 
 'Tom Hanks delivers an incredible performance. The film beautifully weaves personal story with historical events. Emotional, funny, and deeply moving.', 
 'Drama', 
 1994),

('The Matrix', 
 'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.', 
 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMDA1NTAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSIjMDBGRjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPlRoZSBNYXRyaXg8L3RleHQ+Cjwvc3ZnPg==', 
 8.7, 
 'Revolutionary filmmaking that changed cinema forever. The action sequences and philosophical themes are perfectly balanced. Keanu Reeves is iconic as Neo.', 
 'Sci-Fi', 
 1999);

-- Verify the setup
SELECT 'GineBox database setup completed successfully!' as status;
SELECT COUNT(*) as total_movies FROM movies;
SELECT 'Sample movies inserted:' as info;
SELECT id, title, genre, rating, year FROM movies ORDER BY rating DESC;

-- Show database and table info
SHOW TABLES;
DESCRIBE movies;
