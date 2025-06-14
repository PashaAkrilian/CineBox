console.log("🔧 FIXING 'No Database Connect' ERROR")
console.log("=".repeat(50))

console.log("\n❌ ERROR: 'No Database Connect'")
console.log("This error means your Next.js app cannot connect to MySQL")

console.log("\n🔍 MOST COMMON CAUSES:")
console.log("1. MySQL service is not running")
console.log("2. .env.local file missing or wrong location")
console.log("3. Wrong database credentials")
console.log("4. mysql2 package not installed")
console.log("5. Database 'GineBox' doesn't exist")

console.log("\n" + "=".repeat(50))
console.log("🚀 STEP-BY-STEP FIX GUIDE")
console.log("=".repeat(50))

console.log("\n📋 STEP 1: Check MySQL Service")
console.log("Windows:")
console.log("• Press Win+R, type 'services.msc', press Enter")
console.log("• Look for 'MySQL80' or 'MySQL' service")
console.log("• If stopped: Right-click → Start")
console.log("• Set to 'Automatic' startup type")

console.log("\nMac:")
console.log("• Terminal: brew services list | grep mysql")
console.log("• If not running: brew services start mysql")
console.log("• Or: sudo /usr/local/mysql/support-files/mysql.server start")

console.log("\nLinux:")
console.log("• Terminal: sudo systemctl status mysql")
console.log("• If not running: sudo systemctl start mysql")

console.log("\n📄 STEP 2: Create .env.local File")
console.log("Location: Put this file in your PROJECT ROOT (same level as package.json)")
console.log("\nContent to copy:")
console.log("-".repeat(30))
console.log("DB_HOST=127.0.0.1")
console.log("DB_USER=root")
console.log("DB_PASSWORD=Grandlane10")
console.log("DB_NAME=GineBox")
console.log("DB_PORT=3306")
console.log("-".repeat(30))

console.log("\n📁 STEP 3: Verify File Location")
console.log("Your project structure should look like:")
console.log(`
your-cinebox-project/
├── app/
│   ├── api/
│   ├── movies/
│   └── page.tsx
├── components/
├── lib/
├── scripts/
├── package.json
├── next.config.js
└── .env.local  ← THIS FILE MUST BE HERE!
`)

console.log("\n🗄️ STEP 4: Create Database")
console.log("Open MySQL Workbench and run this SQL:")
console.log("-".repeat(40))
console.log(`-- Create database
CREATE DATABASE IF NOT EXISTS GineBox;

-- Use database
USE GineBox;

-- Create table
CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url LONGTEXT,
    rating DECIMAL(3,1) NOT NULL,
    review_user TEXT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO movies (title, description, image_url, rating, review_user, genre, year) VALUES
('Test Movie', 'This is a test movie', '/placeholder.svg', 8.5, 'Great movie!', 'Drama', 2024);

-- Verify
SELECT * FROM movies;`)
console.log("-".repeat(40))

console.log("\n📦 STEP 5: Install Dependencies")
console.log("In your project terminal, run:")
console.log("npm install mysql2")

console.log("\n🔄 STEP 6: Restart Next.js Server")
console.log("1. Stop server: Ctrl+C")
console.log("2. Start server: npm run dev")
console.log("3. Wait for 'Ready' message")

console.log("\n🧪 STEP 7: Test Connection")
console.log("Open these URLs in browser:")
console.log("• http://localhost:3000/test-db")
console.log("• http://localhost:3000/check-env")
console.log("• http://localhost:3000/api/test-connection")

console.log("\n" + "=".repeat(50))
console.log("🚨 IF STILL NOT WORKING:")
console.log("=".repeat(50))

console.log("\n1. 🔍 Check MySQL Connection Manually:")
console.log("   Open MySQL Workbench")
console.log("   Try to connect with:")
console.log("   • Host: 127.0.0.1")
console.log("   • Port: 3306")
console.log("   • Username: root")
console.log("   • Password: Grandlane10")

console.log("\n2. 🔧 Try Different Password:")
console.log("   If connection fails, try empty password:")
console.log("   DB_PASSWORD=")

console.log("\n3. 📋 Check Environment Variables:")
console.log("   Add this to your page to debug:")
console.log("   console.log('DB_HOST:', process.env.DB_HOST)")

console.log("\n4. 🗄️ Verify Database Exists:")
console.log("   In MySQL Workbench run:")
console.log("   SHOW DATABASES;")
console.log("   Look for 'GineBox' in the list")

console.log("\n" + "=".repeat(50))
console.log("✅ QUICK CHECKLIST:")
console.log("=".repeat(50))
console.log("☐ MySQL service is running")
console.log("☐ .env.local file exists in project root")
console.log("☐ .env.local has correct content")
console.log("☐ mysql2 package is installed")
console.log("☐ GineBox database exists")
console.log("☐ Next.js server restarted")
console.log("☐ Can connect with MySQL Workbench")

console.log("\n🎯 MOST LIKELY SOLUTION:")
console.log("1. Start MySQL service")
console.log("2. Create .env.local file in correct location")
console.log("3. Restart Next.js server")
console.log("4. Test at /test-db")

console.log("\n✅ Follow these steps and your database will connect!")
