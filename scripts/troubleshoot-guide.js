// Interactive Troubleshooting Guide
console.log("🔧 CineBox MySQL Troubleshooting Guide")
console.log("=".repeat(50))

// Simulate different error scenarios and solutions
const errorScenarios = [
  {
    error: "ECONNREFUSED",
    description: "Connection refused - MySQL server not running",
    probability: "Very Common (70%)",
    symptoms: ["Cannot connect to database", "Connection timeout", "Port 3306 not responding"],
    diagnosis: ["Check if MySQL service is running", "Verify port 3306 is available", "Check firewall settings"],
    solutions: {
      windows: ["Open Services.msc", "Find MySQL80 service", "Right-click → Start", "Set to Automatic startup"],
      mac: [
        "brew services start mysql",
        "Or: sudo /usr/local/mysql/support-files/mysql.server start",
        "Check System Preferences → MySQL",
      ],
      linux: ["sudo systemctl start mysql", "sudo systemctl enable mysql", "Check: sudo systemctl status mysql"],
    },
  },
  {
    error: "ER_ACCESS_DENIED_ERROR",
    description: "Access denied - Wrong username/password",
    probability: "Common (20%)",
    symptoms: ["Authentication failed", "Access denied for user 'root'", "Invalid credentials"],
    diagnosis: ["Wrong password in .env.local", "MySQL user doesn't exist", "User lacks permissions"],
    solutions: {
      general: [
        "Try empty password: DB_PASSWORD=",
        "Reset MySQL root password",
        "Create new MySQL user",
        "Test with MySQL Workbench first",
      ],
      reset_password: [
        "Stop MySQL service",
        "Start MySQL with --skip-grant-tables",
        "Connect and run: ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';",
        "Restart MySQL normally",
      ],
    },
  },
  {
    error: "ER_BAD_DB_ERROR",
    description: "Database doesn't exist",
    probability: "Common (15%)",
    symptoms: ["Unknown database 'GineBox'", "Database not found", "Can't select database"],
    diagnosis: ["GineBox database not created", "Wrong database name", "Case sensitivity issue"],
    solutions: {
      create_db: [
        "Open MySQL Workbench",
        "Run: CREATE DATABASE GineBox;",
        "Or use the SQL script provided",
        "Verify with: SHOW DATABASES;",
      ],
    },
  },
]

errorScenarios.forEach((scenario, index) => {
  console.log(`\n${index + 1}. 🚨 ${scenario.error}`)
  console.log(`   Description: ${scenario.description}`)
  console.log(`   Probability: ${scenario.probability}`)

  console.log(`   Symptoms:`)
  scenario.symptoms.forEach((symptom) => {
    console.log(`   • ${symptom}`)
  })

  console.log(`   Diagnosis:`)
  scenario.diagnosis.forEach((diag) => {
    console.log(`   • ${diag}`)
  })

  console.log(`   Solutions:`)
  Object.entries(scenario.solutions).forEach(([platform, solutions]) => {
    console.log(`   ${platform.toUpperCase()}:`)
    solutions.forEach((solution) => {
      console.log(`   • ${solution}`)
    })
  })
})

console.log("\n" + "=".repeat(50))
console.log("🎯 QUICK DIAGNOSIS CHECKLIST")
console.log("=".repeat(50))

const checklist = [
  { step: "MySQL Service Running", command: "Check services.msc (Windows) or brew services list (Mac)" },
  { step: "Port 3306 Available", command: "netstat -an | grep 3306" },
  { step: "Can Connect Manually", command: "mysql -u root -p" },
  { step: "Database Exists", command: "SHOW DATABASES;" },
  { step: "Table Exists", command: "USE GineBox; SHOW TABLES;" },
  { step: ".env.local File Exists", command: "Check project root directory" },
  { step: "Environment Variables Set", command: "Check .env.local content" },
  { step: "mysql2 Package Installed", command: "npm list mysql2" },
]

checklist.forEach((item, index) => {
  console.log(`${index + 1}. ☐ ${item.step}`)
  console.log(`   Command: ${item.command}`)
})

console.log("\n🔍 DEBUGGING STEPS:")
console.log("1. Start with manual MySQL connection")
console.log("2. Create database if missing")
console.log("3. Verify .env.local configuration")
console.log("4. Test with simple connection script")
console.log("5. Check Next.js server logs")

console.log("\n💡 PRO TIPS:")
console.log("• Always test MySQL connection outside of Next.js first")
console.log("• Use MySQL Workbench for visual database management")
console.log("• Check MySQL error logs for detailed error messages")
console.log("• Restart Next.js server after .env.local changes")
console.log("• Use 127.0.0.1 instead of localhost if having issues")

console.log("\n✅ Troubleshooting guide completed!")
