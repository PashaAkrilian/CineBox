// Environment and Setup Checker - Can run in v0
console.log("🔍 CineBox Environment Checker")
console.log("=".repeat(50))

// 1. Check Node.js version
console.log("\n📦 Node.js Environment:")
console.log(`Node.js version: ${process.version}`)
console.log(`Platform: ${process.platform}`)
console.log(`Architecture: ${process.arch}`)

// 2. Simulate environment variable check
console.log("\n📋 Environment Variables Check:")
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT"]

console.log("Required variables for .env.local:")
requiredEnvVars.forEach((varName) => {
  console.log(`✓ ${varName}`)
})

// 3. Generate .env.local content
console.log("\n📄 .env.local File Content:")
console.log("Copy this content to your .env.local file:")
console.log("-".repeat(40))
const envContent = `DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=Grandlane10
DB_NAME=GineBox
DB_PORT=3306`
console.log(envContent)
console.log("-".repeat(40))

// 4. File structure guide
console.log("\n📁 Project Structure:")
console.log("Your project should look like this:")
console.log(`
project-root/
├── app/
│   ├── api/
│   ├── movies/
│   └── page.tsx
├── components/
├── lib/
├── scripts/
├── package.json
├── next.config.js
└── .env.local  ← CREATE THIS FILE HERE!
`)

// 5. Common MySQL issues and solutions
console.log("\n🚨 Common MySQL Connection Issues:")

const commonIssues = [
  {
    issue: "ECONNREFUSED",
    cause: "MySQL server not running",
    solutions: [
      "Windows: Open Services.msc → Start MySQL80 service",
      "Mac: brew services start mysql",
      "Linux: sudo systemctl start mysql",
      "Check if port 3306 is available",
    ],
  },
  {
    issue: "ER_ACCESS_DENIED_ERROR",
    cause: "Wrong username/password",
    solutions: [
      "Try empty password: DB_PASSWORD=",
      "Reset MySQL root password",
      "Check MySQL Workbench connection first",
      "Verify user permissions",
    ],
  },
  {
    issue: "ER_BAD_DB_ERROR",
    cause: "Database 'GineBox' doesn't exist",
    solutions: [
      "Create database manually in MySQL Workbench",
      "Run: CREATE DATABASE GineBox;",
      "Check database name spelling (case sensitive)",
    ],
  },
  {
    issue: "Module not found: mysql2",
    cause: "Missing mysql2 package",
    solutions: ["Run: npm install mysql2", "Check package.json dependencies", "Restart Next.js server"],
  },
]

commonIssues.forEach((item, index) => {
  console.log(`\n${index + 1}. ❌ ${item.issue}`)
  console.log(`   Cause: ${item.cause}`)
  console.log(`   Solutions:`)
  item.solutions.forEach((solution) => {
    console.log(`   • ${solution}`)
  })
})

// 6. Step-by-step troubleshooting
console.log("\n🔧 Step-by-Step Troubleshooting:")
const steps = [
  "1. Check if MySQL is installed and running",
  "2. Test connection with MySQL Workbench",
  "3. Create .env.local file in project root",
  "4. Install mysql2: npm install mysql2",
  "5. Restart Next.js server: npm run dev",
  "6. Test at: http://localhost:3000/test-db",
]

steps.forEach((step) => console.log(`✓ ${step}`))

// 7. MySQL service check commands
console.log("\n💻 MySQL Service Commands:")
console.log("Windows:")
console.log("  • Check: services.msc → Look for MySQL80")
console.log("  • Start: net start mysql80")
console.log("  • Stop: net stop mysql80")

console.log("\nMac:")
console.log("  • Check: brew services list | grep mysql")
console.log("  • Start: brew services start mysql")
console.log("  • Stop: brew services stop mysql")

console.log("\nLinux:")
console.log("  • Check: sudo systemctl status mysql")
console.log("  • Start: sudo systemctl start mysql")
console.log("  • Stop: sudo systemctl stop mysql")

// 8. Database creation SQL
console.log("\n🗄️ Database Creation SQL:")
console.log("Run this in MySQL Workbench or command line:")
console.log("-".repeat(40))
console.log(`CREATE DATABASE IF NOT EXISTS GineBox;
USE GineBox;

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
);`)
console.log("-".repeat(40))

// 9. Next steps
console.log("\n🎯 Next Steps:")
console.log("1. Follow the troubleshooting steps above")
console.log("2. Create .env.local with the content provided")
console.log("3. Ensure MySQL service is running")
console.log("4. Test connection at /test-db page")
console.log("5. If still issues, check the specific error message")

console.log("\n✅ Environment check completed!")
console.log("Use the information above to fix your MySQL connection.")
