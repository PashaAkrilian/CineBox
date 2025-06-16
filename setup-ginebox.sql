-- Create database
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

-- Create indexes
CREATE INDEX idx_rating ON movies(rating);
CREATE INDEX idx_genre ON movies(genre);
CREATE INDEX idx_year ON movies(year);
CREATE INDEX idx_created_at ON movies(created_at);

-- Insert sample data
INSERT INTO movies (title, description, image_url, rating, review_user, genre, year) VALUES
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'https://example.com/shawshank.jpg', 9.3, 'Andy Dufresne', 'Drama', 1994),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://example.com/godfather.jpg', 9.2, 'Michael Corleone', 'Crime', 1972),
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'https://example.com/darkknight.jpg', 9.0, 'Bruce Wayne', 'Action', 2008); 