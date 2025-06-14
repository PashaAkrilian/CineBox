console.log("🔍 DEBUGGING 'NO DATABASE CONNECT' STEP BY STEP")
console.log("=".repeat(60))

console.log("\n📋 CHECKLIST - Mari kita cek satu per satu:")

console.log("\n1. ✅ MySQL Server Status: CONFIRMED WORKING")
console.log("   • MySQL Workbench screenshot shows server running")
console.log("   • Database 'ginebox' exists")
console.log("   • Table 'movies' exists")
console.log("   • Connections are active")

console.log("\n2. 🔍 CHECK: .env.local File Location")
console.log("   CRITICAL: File harus di lokasi yang TEPAT!")
console.log(
  "   \
   ❌ WRONG locations:",
)
console.log("   • app/.env.local")
console.log("   • src/.env.local")
console.log("   • components/.env.local")
console.log("   • lib/.env.local")
console.log(
  "   \
   ✅ CORRECT location:",
)
console.log("   • project-root/.env.local (same level as package.json)")

console.log("\n3. 📄 CHECK: .env.local File Content")
console.log("   File harus berisi EXACTLY ini (copy paste):")
console.log("   " + "-".repeat(30))
console.log("   DB_HOST=127.0.0.1")
console.log("   DB_USER=root")
console.log("   DB_PASSWORD=")
console.log("   DB_NAME=ginebox")
console.log("   DB_PORT=3306")
console.log("   " + "-".repeat(30))
console.log("   
   ⚠️ COMMON MISTAKES:")\
console.log(\"   ❌ DB_PASSWORD=\"\" (jangan pakai quotes)")
console.log("   ❌ DB_HOST = 127.0.0.1 (jangan ada spasi)")
console.log("   ❌ DB_NAME=GineBox (harus lowercase: ginebox)")

console.log("\n4. 📦 CHECK: mysql2 Package")
console.log("   Run di terminal project:")
console.log("   npm list mysql2")
console.log("   
   If not installed:")
console.log(\"   npm install mysql2")
\
console.log(\"\n5. 🔄 CHECK: Server Restart\")\
console.log("   WAJIB restart setelah buat .env.local:")\
console.log(\"   1. Stop: Ctrl+C di terminal")
console.log("   2. Start: npm run dev")\
console.log("   3. Wait for 'Ready' message\")\
\
console.log("\n6. 🧪 CHECK: Environment Variables Loading\")\
console.log("   Add this to any page untuk debug:")
console.log("   console.log('ENV CHECK:', {\")\
console.log("     DB_HOST: process.env.DB_HOST,")
console.log(\"     DB_USER: process.env.DB_USER,")\
console.log(\"     DB_PASSWORD: process.env.DB_PASSWORD,")\
console.log(\"     DB_NAME: process.env.DB_NAME,\")\
console.log("     DB_PORT: process.env.DB_PORT")
console.log(\"   })")
\
console.log("\n" + \"=\".repeat(60))
console.log("🚨 MOST LIKELY ISSUES:")
console.log("=".repeat(60))

console.log("\n1. 📁 FILE LOCATION (90% of cases)")
console.log("   Problem: .env.local di folder yang salah")
console.log("   Solution: Pindahkan ke project root")

console.log("\n2. 📄 FILE CONTENT (5% of cases)")  
console.log("   Problem: Format .env.local salah")
console.log("   Solution: Copy exact content di atas")

console.log("\n3. 🔄 NO RESTART (3% of cases)")
console.log("   Problem: Lupa restart server")
console.log("   Solution: Ctrl+C then npm run dev")

console.log("\n4. 📦 MISSING PACKAGE (2% of cases)")
console.log("   Problem: mysql2 not installed")
console.log("   Solution: npm install mysql2")

console.log("\n" + "=".repeat(60))
console.log("🎯 DEBUGGING STEPS:")
console.log("=".repeat(60))

console.log("\nSTEP 1: Verify .env.local location")
console.log("• Open your project in file explorer")
console.log("• Look for package.json file")
console.log("• .env.local should be RIGHT NEXT to package.json")

console.log("\nSTEP 2: Check .env.local content")
console.log("• Open .env.local in text editor")
console.log("• Make sure content matches exactly")
console.log("• No extra spaces, quotes, or characters")

console.log("\nSTEP 3: Install dependencies")
console.log("• Terminal: npm install mysql2")
console.log("• Wait for installation to complete")

console.log("\nSTEP 4: Restart server")
console.log("• Stop: Ctrl+C")
console.log("• Start: npm run dev")
console.log("• Wait for 'Ready - started server on 0.0.0.0:3000'")

console.log("\nSTEP 5: Test connection")
console.log("• Open: http://localhost:3000/test-db")
console.log("• Check browser console for errors")
console.log("• Check terminal for error messages")

console.log("\n✅ Follow these steps in ORDER!")
console.log("99% of 'no database connect' issues are fixed by correct .env.local location!")
