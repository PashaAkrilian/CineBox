-- Create database
CREATE DATABASE IF NOT EXISTS GineBox;
USE GineBox;

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url LONGTEXT,  -- For Base64 images
    rating DECIMAL(3,1) NOT NULL CHECK (rating >= 1 AND rating <= 10),
    review_user TEXT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_rating ON movies(rating);
CREATE INDEX idx_genre ON movies(genre);
CREATE INDEX idx_year ON movies(year);
CREATE INDEX idx_created_at ON movies(created_at);

-- Insert some sample data (optional)
INSERT INTO movies (title, description, image_url, rating, review_user, genre, year) VALUES
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', '/placeholder.svg?height=450&width=300', 9.3, 'A masterpiece of storytelling that never gets old. The character development and emotional depth are unmatched.', 'Drama', 1994),
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.', '/placeholder.svg?height=450&width=300', 9.0, 'Heath Ledger\'s Joker is absolutely phenomenal. This film redefined what superhero movies could be.', 'Action', 2008),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.', '/placeholder.svg?height=450&width=300', 8.9, 'Tarantino\'s non-linear storytelling at its finest. Every scene is memorable and quotable.', 'Thriller', 1994);

SELECT 'GineBox database and table created successfully!' as message;
