console.log("🔍 MENCARI MASALAH EXACT ANDA")
console.log("=".repeat(50))

console.log("\n❓ PERTANYAAN DIAGNOSIS:")
console.log("Jawab pertanyaan ini untuk menemukan masalah:")

console.log("\n1. 📦 APAKAH NODE.JS SUDAH TERINSTALL?")
console.log("   Test: Buka terminal, ketik 'node --version'")
console.log("   ✅ Jika muncul versi (contoh: v18.17.0) = OK")
console.log("   ❌ Jika muncul error 'command not found' = MASALAH DI SINI")
console.log(
  "   \
   Solution jika ❌:",
)
console.log("   • Download Node.js: https://nodejs.org/")
console.log("   • Install versi LTS (Long Term Support)")
console.log("   • Restart computer setelah install")

console.log("\n2. 📁 APAKAH ANDA SUDAH PUNYA PROJECT CINEBOX?")
console.log("   ✅ Jika sudah download/clone project = Lanjut ke #3")
console.log("   ❌ Jika belum punya project = MASALAH DI SINI")
console.log(
  "   \
   Solution jika ❌:",
)
console.log("   • Download project dari v0")
console.log("   • Atau buat project baru dengan 'npx create-next-app@latest'")

console.log("\n3. 📂 APAKAH ANDA SUDAH MASUK KE FOLDER PROJECT?")
console.log("   Test: Ketik 'dir' (Windows) atau 'ls' (Mac/Linux)")
console.log("   ✅ Jika ada file 'package.json' = OK")
console.log("   ❌ Jika tidak ada 'package.json' = MASALAH DI SINI")
console.log("   
   Solution jika ❌:")\
console.log(\"   • cd nama-folder-project")
console.log("   • Pastikan Anda di folder yang benar")

console.log("\n4. 📦 APAKAH DEPENDENCIES SUDAH TERINSTALL?")
console.log("   Test: Cek apakah ada folder 'node_modules'")
console.log("   ✅ Jika ada folder 'node_modules' = OK")
console.log("   ❌ Jika tidak ada = MASALAH DI SINI")
console.log("   
   Solution jika ❌:")
console.log(\"   • Ketik: npm install\")\
console.log(\"   • Tunggu sampai selesai download")

console.log("\n5. 🚀 APAKAH 'npm run dev\' BISA JALAN?\")\
console.log("   Test: Ketik 'npm run dev'")
console.log(\"   ✅ Jika muncul \'Ready - started server\' = OK")\
console.log("   ❌ Jika ada error = MASALAH DI SINI")\
console.log("   
   Common errors:")
console.log("   • \'Port 3000 in use\' → Ketik: npx kill-port 3000")
console.log("   • 'Module not found' → Ketik: npm install")\
console.log("   • 'Permission denied' → Run as administrator")
\
console.log("\n6. 🌐 APAKAH BROWSER BISA AKSES LOCALHOST:3000?")\
console.log("   Test: Buka http://localhost:3000")
console.log(\"   ✅ Jika muncul halaman web = OK")
console.log(\"   ❌ Jika tidak bisa akses = MASALAH DI SINI")
console.log(\"   \
   Solution jika ❌:")
console.log(\"   • Coba: http://127.0.0.1:3000")\
console.log(\"   • Check firewall/antivirus")
console.log(\"   • Coba browser lain\")

console.log("\n" + "=".repeat(50))
console.log("🎯 DIAGNOSIS BERDASARKAN JAWABAN:")
console.log("=".repeat(50))

console.log("\n📋 SCENARIO 1: Node.js belum terinstall")
console.log("   Gejala: 'node --version' error")
console.log("   Fix: Install Node.js dari nodejs.org")

console.log("\n📋 SCENARIO 2: Project belum ada")
console.log("   Gejala: Tidak ada folder project")
console.log("   Fix: Download project atau buat baru")

console.log("\n📋 SCENARIO 3: Salah folder")
console.log("   Gejala: Tidak ada package.json")
console.log("   Fix: cd ke folder yang benar")

console.log("\n📋 SCENARIO 4: Dependencies belum install")
console.log("   Gejala: Tidak ada node_modules")
console.log("   Fix: npm install")

console.log("\n📋 SCENARIO 5: Port conflict")
console.log("   Gejala: 'Port 3000 in use'")
console.log("   Fix: npx kill-port 3000")

console.log("\n📋 SCENARIO 6: Firewall/Network")
console.log("   Gejala: Server jalan tapi browser tidak bisa akses")
console.log("   Fix: Check firewall, coba 127.0.0.1:3000")

console.log("\n" + "=".repeat(50))
console.log("💡 LANGKAH DIAGNOSIS:")
console.log("=".repeat(50))

console.log("\n1. Jawab pertanyaan 1-6 di atas")
console.log("2. Temukan di mana jawaban pertama yang ❌")
console.log("3. Ikuti solution untuk masalah tersebut")
console.log("4. Lanjut ke pertanyaan berikutnya")
console.log("5. Ulangi sampai semua ✅")

console.log("\n🚨 JIKA MASIH BINGUNG:")
console.log("Copy paste EXACT error message yang muncul!")
console.log("Contoh:")
console.log("• 'node' is not recognized as an internal command")
console.log("• npm ERR! code ENOENT")
console.log("• Error: listen EADDRINUSE :::3000")
console.log("• dll.")

console.log("\n✅ SETELAH SEMUA OK:")
console.log("Baru kita lanjut ke database connection setup!")
