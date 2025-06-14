-- =====================================================
-- Test Connection Script for GineBox Database
-- =====================================================

-- Test basic connection
SELECT 'Connection test successful!' as message;

-- Show current database
SELECT DATABASE() as current_database;

-- Show server version
SELECT VERSION() as mysql_version;

-- Test movies table
SELECT 
    COUNT(*) as total_movies,
    AVG(rating) as average_rating,
    MAX(rating) as highest_rating,
    MIN(rating) as lowest_rating
FROM movies;

-- Show all movies
SELECT 
    id,
    title,
    genre,
    rating,
    year,
    created_at
FROM movies 
ORDER BY rating DESC;

-- Test different filters
SELECT 'Top Rated Movies (>= 8.5):' as category;
SELECT title, rating FROM movies WHERE rating >= 8.5 ORDER BY rating DESC;

SELECT 'Movies by Genre:' as category;
SELECT genre, COUNT(*) as count FROM movies GROUP BY genre ORDER BY count DESC;

SELECT 'Movies by Year:' as category;
SELECT year, COUNT(*) as count FROM movies GROUP BY year ORDER BY year DESC;
