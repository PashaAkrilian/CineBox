console.log("🔧 BASIC TROUBLESHOOTING - NPM RUN DEV TIDAK BISA")
console.log("=".repeat(60))

console.log("\n❌ MASALAH: npm run dev tidak bisa jalan")
console.log("✅ SOLUSI: Check basic requirements step by step")

console.log("\n📋 STEP 1: CHECK NODE.JS INSTALLATION")
console.log("Buka terminal/command prompt, ketik:")
console.log("node --version")
console.log("")
console.log("✅ EXPECTED: v16.8.0 atau lebih baru (contoh: v18.17.0)")
console.log("❌ ERROR: 'node' is not recognized")
console.log("")
console.log("JIKA ERROR:")
console.log("• Download Node.js: https://nodejs.org/")
console.log("• Install versi LTS (Long Term Support)")
console.log("• Restart computer setelah install")
console.log("• Test lagi: node --version")

console.log("\n📋 STEP 2: CHECK NPM INSTALLATION")
console.log("Di terminal, ketik:")
console.log("npm --version")
console.log("")
console.log("✅ EXPECTED: 8.0.0 atau lebih baru (contoh: 9.8.1)")
console.log("❌ ERROR: 'npm' is not recognized")
console.log("")
console.log("JIKA ERROR:")
console.log("• NPM biasanya ikut dengan Node.js")
console.log("• Reinstall Node.js dari nodejs.org")
console.log("• Pastikan centang 'Add to PATH' saat install")

console.log("\n📋 STEP 3: CHECK PROJECT LOCATION")
console.log("Pastikan Anda di folder yang benar:")
console.log("dir (Windows) atau ls (Mac/Linux)")
console.log("")
console.log("✅ EXPECTED: Ada file package.json")
console.log("❌ ERROR: Tidak ada package.json")
console.log("")
console.log("JIKA ERROR:")
console.log("• cd ke folder project yang benar")
console.log("• Atau download project CineBox dulu")
console.log("• Contoh: cd Desktop/cinebox-project")

console.log("\n📋 STEP 4: CHECK PACKAGE.JSON CONTENT")
console.log("Buka file package.json, pastikan ada:")
console.log(`{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0"
  }
}`)
console.log("")
console.log("JIKA TIDAK ADA:")
console.log("• File package.json corrupt atau salah")
console.log("• Download ulang project")
console.log("• Atau buat project baru")

console.log("\n📋 STEP 5: INSTALL DEPENDENCIES")
console.log("Di terminal, ketik:")
console.log("npm install")
console.log("")
console.log("✅ EXPECTED: Download banyak packages, selesai tanpa error")
console.log("❌ ERROR: Network error, permission error, dll")
console.log("")
console.log("JIKA ERROR:")
console.log("• Check koneksi internet")
console.log("• Run as administrator (Windows)")
console.log("• Clear cache: npm cache clean --force")
console.log("• Try: npm install --force")

console.log("\n📋 STEP 6: TRY NPM RUN DEV")
console.log("Setelah npm install berhasil:")
console.log("npm run dev")
console.log("")
console.log("✅ EXPECTED: 'Ready - started server on 0.0.0.0:3000'")
console.log("❌ ERROR: Various errors...")

console.log("\n" + "=".repeat(60))
console.log("🚨 COMMON NPM RUN DEV ERRORS:")
console.log("=".repeat(60))

console.log("\n1. ❌ 'next' is not recognized")
console.log("   Cause: Next.js not installed")
console.log("   Fix: npm install next react react-dom")

console.log("\n2. ❌ Port 3000 already in use")
console.log("   Cause: Another app using port 3000")
console.log("   Fix: npx kill-port 3000")
console.log("   Or: npm run dev -- -p 3001")

console.log("\n3. ❌ Module not found")
console.log("   Cause: Dependencies not installed")
console.log("   Fix: Delete node_modules, npm install")

console.log("\n4. ❌ Permission denied")
console.log("   Cause: No permission to run")
console.log("   Fix: Run terminal as administrator")

console.log("\n5. ❌ Syntax error in files")
console.log("   Cause: Code error preventing startup")
console.log("   Fix: Check terminal for specific file errors")

console.log("\n6. ❌ Database connection error")
console.log("   Cause: App trying to connect to database")
console.log("   Fix: Comment out database imports (our original problem)")
