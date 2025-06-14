console.log("📄 .env.local FILE CREATION GUIDE")
console.log("=".repeat(50))

console.log("\n🎯 EXACT STEPS TO CREATE .env.local:")

console.log("\n1. 📁 Navigate to Your Project Folder")
console.log("   • Open File Explorer (Windows) or Finder (Mac)")
console.log("   • Go to your CineBox project folder")
console.log("   • You should see: package.json, next.config.js, app folder")

console.log("\n2. 📝 Create New File")
console.log("   Windows:")
console.log("   • Right-click in empty space")
console.log("   • New → Text Document")
console.log("   • Rename to: .env.local (include the dot!)")
console.log("   • If you can't see extensions, enable them in View menu")

console.log("\n   Mac:")
console.log("   • Right-click in empty space")
console.log("   • New Document")
console.log("   • Save as: .env.local")

console.log("\n   VS Code:")
console.log("   • Right-click in Explorer panel")
console.log("   • New File")
console.log("   • Type: .env.local")

console.log("\n3. 📋 Copy This Content EXACTLY:")
console.log("-".repeat(40))
const envContent = `DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=Grandlane10
DB_NAME=GineBox
DB_PORT=3306`
console.log(envContent)
console.log("-".repeat(40))

console.log("\n4. 💾 Save the File")
console.log("   • Paste the content above")
console.log("   • Save the file (Ctrl+S)")
console.log("   • Make sure it's saved as .env.local (not .env.local.txt)")

console.log("\n5. 📍 Verify File Location")
console.log("   Your project should look like:")
console.log(`
   your-project/
   ├── app/
   ├── components/
   ├── lib/
   ├── package.json      ← .env.local should be here
   ├── next.config.js    ← same level as these files
   └── .env.local        ← YOUR NEW FILE
   `)

console.log("\n⚠️ COMMON MISTAKES TO AVOID:")
console.log("❌ Don't put .env.local inside app/ folder")
console.log("❌ Don't name it env.local (missing dot)")
console.log("❌ Don't save as .env.local.txt")
console.log("❌ Don't add quotes around values")
console.log("❌ Don't add spaces around = sign")

console.log("\n✅ CORRECT FORMAT:")
console.log("DB_HOST=127.0.0.1          ← No quotes, no spaces")
console.log("DB_PASSWORD=Grandlane10    ← Direct value")

console.log("\n❌ WRONG FORMAT:")
console.log('DB_HOST = "127.0.0.1"      ← Has spaces and quotes')
console.log("DB_PASSWORD = 'Grandlane10' ← Has spaces and quotes")

console.log("\n🔄 AFTER CREATING FILE:")
console.log("1. Restart your Next.js server")
console.log("2. Stop: Ctrl+C in terminal")
console.log("3. Start: npm run dev")
console.log("4. Test: http://localhost:3000/test-db")

console.log("\n✅ File creation guide completed!")
