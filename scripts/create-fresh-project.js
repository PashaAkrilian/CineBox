console.log("🆕 CREATE FRESH NEXT.JS PROJECT")
console.log("=".repeat(50))

console.log("\n💡 JIKA PROJECT LAMA BERMASALAH:")
console.log("Mari buat project Next.js baru yang pasti jalan")

console.log("\n📋 STEP 1: CREATE NEW PROJECT")
console.log("Buka terminal di folder kosong, ketik:")
console.log("npx create-next-app@latest cinebox-fresh")
console.log("")
console.log("Pilihan saat ditanya:")
console.log("✓ TypeScript? → Yes")
console.log("✓ ESLint? → Yes")
console.log("✓ Tailwind CSS? → Yes")
console.log("✓ src/ directory? → No")
console.log("✓ App Router? → Yes")
console.log("✓ Import alias? → Yes")

console.log("\n📋 STEP 2: ENTER PROJECT FOLDER")
console.log("cd cinebox-fresh")

console.log("\n📋 STEP 3: TEST BASIC NEXT.JS")
console.log("npm run dev")
console.log("")
console.log("✅ EXPECTED: Server starts, localhost:3000 shows Next.js page")
console.log("❌ JIKA MASIH ERROR: Problem di Node.js/system")

console.log("\n📋 STEP 4: ADD CINEBOX COMPONENTS")
console.log("Jika basic Next.js jalan, copy components dari project lama:")
console.log("• Copy folder: components/")
console.log("• Copy folder: lib/ (tapi skip database.ts)")
console.log("• Copy file: app/globals.css")
console.log("• Edit app/page.tsx dengan content CineBox")

console.log("\n📄 STEP 5: SIMPLE CINEBOX PAGE")
console.log("Replace app/page.tsx dengan:")
console.log("-".repeat(40))
console.log(`export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-800 text-white p-4">
        <h1 className="text-2xl font-bold">🎬 CineBox</h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to CineBox!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Your movie rating and review platform
          </p>
          
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">✅ Success!</p>
            <p>Next.js application is running successfully!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">🚀 Next Steps</h3>
              <ul className="text-left space-y-2">
                <li>✅ Next.js working</li>
                <li>✅ Tailwind CSS loaded</li>
                <li>⏳ Add movie components</li>
                <li>⏳ Setup database</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">🎯 Features</h3>
              <ul className="text-left space-y-2">
                <li>• Movie rating system</li>
                <li>• User reviews</li>
                <li>• Movie database</li>
                <li>• Search & filter</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}`)
console.log("-".repeat(40))

console.log("\n✅ HASIL:")
console.log("• Fresh Next.js project yang pasti jalan")
console.log("• Tidak ada database dependency")
console.log("• Bisa test basic functionality")
console.log("• Foundation untuk add CineBox features")
