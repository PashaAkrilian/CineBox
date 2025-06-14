console.log("🧪 CREATING MINIMAL TEST PROJECT")
console.log("=".repeat(50))

console.log("\n📝 Jika project utama tidak bisa run, coba buat test project minimal:")

console.log("\n1. 📁 CREATE NEW FOLDER")
console.log("mkdir cinebox-test")
console.log("cd cinebox-test")

console.log("\n2. 📦 INIT NEW PROJECT")
console.log("npm init -y")

console.log("\n3. 📥 INSTALL NEXT.JS")
console.log("npm install next@latest react@latest react-dom@latest")

console.log("\n4. 📄 CREATE PACKAGE.JSON SCRIPTS")
console.log("Add to package.json:")
console.log("-".repeat(30))
console.log(`{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}`)
console.log("-".repeat(30))

console.log("\n5. 📁 CREATE FOLDER STRUCTURE")
console.log("mkdir app")

console.log("\n6. 📄 CREATE app/page.tsx")
console.log("Create file app/page.tsx:")
console.log("-".repeat(30))
console.log(`export default function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎬 CineBox Test</h1>
      <p>If you can see this, Next.js is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  )
}`)
console.log("-".repeat(30))

console.log("\n7. 📄 CREATE app/layout.tsx")
console.log("Create file app/layout.tsx:")
console.log("-".repeat(30))
console.log(`export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`)
console.log("-".repeat(30))

console.log("\n8. 🚀 TEST RUN")
console.log("npm run dev")

console.log("\n9. 🌐 OPEN BROWSER")
console.log("http://localhost:3000")

console.log("\n✅ JIKA TEST PROJECT BERHASIL:")
console.log("• Next.js environment OK")
console.log("• Problem ada di project utama")
console.log("• Copy working files ke project utama")

console.log("\n❌ JIKA TEST PROJECT GAGAL:")
console.log("• Problem di Node.js atau system")
console.log("• Perlu install/reinstall Node.js")
console.log("• Check system requirements")

console.log("\n🔧 SYSTEM REQUIREMENTS:")
console.log("• Node.js 16.8 atau lebih baru")
console.log("• npm 7 atau lebih baru")
console.log("• Windows 10+, macOS 10.13+, atau Linux")
console.log("• Minimal 4GB RAM")
console.log("• Port 3000 available")
