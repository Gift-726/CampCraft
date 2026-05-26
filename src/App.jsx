import { useState } from 'react'

function App() {
  // Packing checklist state
  const [items, setItems] = useState([
    { id: 1, name: 'Weatherproof Tent', category: 'Shelter', packed: true },
    { id: 2, name: 'Warm Sleeping Bag', category: 'Shelter', packed: false },
    { id: 3, name: 'First Aid Kit', category: 'Gear', packed: true },
    { id: 4, name: 'Portable Stove & Fuel', category: 'Food', packed: false },
    { id: 5, name: 'Marshmallows & Smores Kit', category: 'Food', packed: true },
    { id: 6, name: 'Headlamp / Flashlight', category: 'Gear', packed: false },
  ])
  const [newItemName, setNewItemName] = useState('')
  const [newItemCategory, setNewItemCategory] = useState('Gear')

  // Ambient sound state simulation
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [soundVolume, setSoundVolume] = useState(50)

  const handleAddItem = (e) => {
    e.preventDefault()
    if (!newItemName.trim()) return
    const newItem = {
      id: Date.now(),
      name: newItemName.trim(),
      category: newItemCategory,
      packed: false
    }
    setItems([...items, newItem])
    setNewItemName('')
  }

  const togglePacked = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const packedCount = items.filter(item => item.packed).length
  const totalCount = items.length
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-900">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header / Navigation */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
              CampCraft
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#planner" className="hover:text-emerald-400 transition-colors">Adventure Planner</a>
            <a href="#ambient" className="hover:text-emerald-400 transition-colors">Campfire Radio</a>
          </nav>

          <a 
            href="#planner" 
            className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
          >
            Start Crafting
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center relative py-12 md:py-20 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-4 animate-pulse">
            <span>⛺ Ready for the Wild</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Craft Your Perfect <br/>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
              Camping Adventure
            </span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto font-light">
            Plan, organize, and pack for your next escape into nature. CampCraft helps you curate your gear list and set the perfect outdoor mood.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="#planner" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold hover:from-emerald-400 hover:to-teal-400 shadow-xl shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
            >
              Open Gear Checklist
            </a>
            <a 
              href="#ambient" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-semibold transition-all duration-200 text-center"
            >
              📻 Listen to Campfire Ambient
            </a>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Checklist</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Never forget your tent stakes again. Track shelter, gear, and food items dynamically so you stay organized.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ambient Atmosphere</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get into the camping spirit right from your browser. Play crackling fire sounds to inspire your trip planning.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-teal-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V10a2.5 2.5 0 00-2.5-2.5H14a2 2 0 00-2-2V5a2 2 0 00-2-2H9a3 3 0 00-3 3v.17" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Crafting Memories</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Designed with a premium interface to capture the cozy feeling of wilderness cabins and starry night skies.
            </p>
          </div>
        </section>

        {/* Live Interactive Checklist Widget */}
        <section id="planner" className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-amber-500/5 blur-2xl rounded-3xl pointer-events-none"></div>
          
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-2xl">
            {/* Widget Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Adventure Checklist</h2>
                <p className="text-slate-400 text-sm">Organize essentials before heading out into the wild.</p>
              </div>

              {/* Progress Tracker */}
              <div className="flex flex-col sm:items-end min-w-[140px]">
                <div className="flex justify-between text-xs font-semibold text-emerald-400 mb-1">
                  <span>Progress</span>
                  <span>{progressPercent}% packed</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Packing Form */}
            <form onSubmit={handleAddItem} className="p-6 border-b border-slate-800/60 bg-slate-950/40 flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Add camping gear item... (e.g. Hiking boots)" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-sm transition-all"
              />
              
              <div className="flex gap-3">
                <select 
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                >
                  <option value="Shelter">⛺ Shelter</option>
                  <option value="Gear">🎒 Gear</option>
                  <option value="Food">🔥 Food</option>
                </select>

                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 active:scale-[0.98] transition-all text-sm whitespace-nowrap"
                >
                  Add Item
                </button>
              </div>
            </form>

            {/* Checklist items */}
            <div className="divide-y divide-slate-800/50 max-h-[360px] overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <p className="text-sm">No items in your packing list. Add some above!</p>
                </div>
              ) : (
                items.map(item => (
                  <div 
                    key={item.id} 
                    className={`flex items-center justify-between p-4 transition-colors hover:bg-slate-900/30 ${item.packed ? 'bg-slate-950/10' : ''}`}
                  >
                    <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                      <button 
                        type="button"
                        onClick={() => togglePacked(item.id)}
                        className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                          item.packed 
                            ? 'bg-emerald-500/20 border-emerald-500/80 text-emerald-400' 
                            : 'border-slate-700 hover:border-slate-500 bg-slate-900'
                        }`}
                      >
                        {item.packed && (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      <span className={`text-sm truncate transition-all duration-200 ${
                        item.packed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}>
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.category === 'Shelter' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        item.category === 'Food' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                      }`}>
                        {item.category}
                      </span>

                      <button 
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-800/50 transition-colors"
                        title="Delete item"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Campfire Radio Section */}
        <section id="ambient" className="max-w-xl mx-auto text-center bg-gradient-to-tr from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800/80 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center relative">
              {/* Flame Animation effect */}
              <div className={`absolute inset-0 rounded-full bg-amber-500/20 blur-md transition-transform duration-500 ${isPlayingSound ? 'animate-ping' : ''}`}></div>
              <span className="text-2xl relative">🔥</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Campfire Radio</h3>
              <p className="text-xs text-slate-400">Cozy ambient sounds to design & craft by</p>
            </div>

            {/* Sound Wave simulator */}
            {isPlayingSound && (
              <div className="flex items-end justify-center space-x-1 h-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
                  const heights = ['h-3', 'h-5', 'h-4', 'h-6', 'h-2', 'h-5', 'h-3', 'h-6', 'h-4', 'h-3']
                  const randomHeight = heights[Math.floor(Math.random() * heights.length)]
                  return (
                    <div 
                      key={i} 
                      className={`w-1 bg-amber-500 rounded-full transition-all duration-300 ${randomHeight} animate-bounce`} 
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  )
                })}
              </div>
            )}

            <div className="flex flex-col items-center justify-center gap-4">
              <button 
                type="button"
                onClick={() => setIsPlayingSound(!isPlayingSound)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  isPlayingSound 
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isPlayingSound ? '⏸ Mute Campfire' : '▶ Play Campfire'}
              </button>

              {isPlayingSound && (
                <div className="flex items-center space-x-3 w-48">
                  <span className="text-xs text-slate-500">🔈</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(e.target.value)}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                  />
                  <span className="text-xs text-slate-500">🔊</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-600">
        <p className="mb-2">© {new Date().getFullYear()} CampCraft Adventure Systems. Made with React, Vite, and Tailwind.</p>
        <p>Your ultimate canvas for wilderness preparation.</p>
      </footer>
    </div>
  )
}

export default App
