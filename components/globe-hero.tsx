"use client"
// components/globe-hero.tsx — GLOBAL AUTHORITY v4
// Precision orthographic globe with real continent outlines (simplified GeoJSON paths)
// Fully responsive, maroon/cream editorial palette
// Explore Registry → /registry

import { useEffect, useRef, useState, useCallback } from "react"

// Simplified continent polygons (lat/lng pairs) for real landmass rendering
const CONTINENTS: { name: string; color: string; paths: [number, number][][] }[] = [
  {
    name: "North America",
    color: "#e8ddd0",
    paths: [
      [[-168,72],[-140,72],[-95,72],[-75,70],[-65,68],[-60,48],[-66,44],[-70,42],[-80,25],[-88,15],[-78,8],[-78,0],[-80,0],[-90,8],[-105,15],[-118,32],[-125,37],[-135,58],[-148,62],[-165,65],[-168,72]],
      [[-55,47],[-53,47],[-53,45],[-66,44],[-60,48],[-55,47]], // Newfoundland approx
    ]
  },
  {
    name: "South America",
    color: "#e8ddd0",
    paths: [
      [[-78,12],[-62,12],[-50,0],[-35,-5],[-35,-10],[-40,-20],[-45,-25],[-50,-30],[-55,-35],[-68,-55],[-75,-50],[-80,-40],[-78,-30],[-75,-10],[-80,0],[-78,8],[-78,12]],
    ]
  },
  {
    name: "Europe",
    color: "#e8ddd0",
    paths: [
      [[-10,36],[30,36],[32,42],[30,46],[20,50],[10,55],[5,60],[15,68],[28,72],[30,68],[25,60],[30,55],[25,50],[20,42],[28,40],[35,36],[28,36],[20,40],[10,43],[0,44],[-5,40],[-10,36]],
    ]
  },
  {
    name: "Africa",
    color: "#e8ddd0",
    paths: [
      [[-18,15],[0,15],[15,15],[30,15],[42,12],[52,12],[52,0],[45,-10],[35,-18],[30,-25],[20,-35],[17,-35],[12,-28],[8,-20],[8,-5],[0,0],[-18,15]],
      [[28,36],[35,36],[37,22],[38,12],[42,12],[30,15],[15,15],[8,35],[15,38],[25,38],[28,36]], // North Africa
    ]
  },
  {
    name: "Asia",
    color: "#e8ddd0",
    paths: [
      [[28,36],[35,36],[45,38],[55,40],[60,45],[65,42],[75,38],[80,28],[78,12],[68,24],[58,22],[52,12],[45,12],[38,12],[36,22],[30,28],[25,35],[28,36]],
      [[65,42],[75,52],[85,55],[95,55],[110,48],[120,52],[130,60],[140,68],[150,62],[155,58],[150,50],[145,44],[140,38],[132,34],[120,28],[110,20],[105,12],[100,5],[105,-2],[100,-5],[95,0],[85,8],[80,12],[78,12],[80,28],[75,38],[65,42]],
      [[78,72],[100,72],[120,72],[135,68],[148,62],[140,60],[130,60],[120,52],[110,48],[95,55],[85,55],[75,52],[65,55],[55,70],[62,72],[78,72]], // Siberia
    ]
  },
  {
    name: "Australia",
    color: "#e8ddd0",
    paths: [
      [[114,-22],[118,-20],[125,-14],[132,-12],[138,-15],[145,-18],[150,-22],[152,-28],[148,-38],[140,-38],[132,-35],[125,-34],[115,-34],[112,-28],[114,-22]],
    ]
  },
  {
    name: "Greenland",
    color: "#e8ddd0",
    paths: [
      [[-55,76],[-20,76],[-18,72],[-25,62],[-45,60],[-55,65],[-62,70],[-55,76]],
    ]
  }
]

const CITIES = [
  { name: "Bangalore", lat: 12.97, lng: 77.59, region: "India", type: "hub" },
  { name: "Mumbai", lat: 19.07, lng: 72.87, region: "India", type: "hub" },
  { name: "Delhi", lat: 28.61, lng: 77.2, region: "India", type: "hub" },
  { name: "Hyderabad", lat: 17.38, lng: 78.48, region: "India", type: "city" },
  { name: "Pune", lat: 18.52, lng: 73.85, region: "India", type: "city" },
  { name: "San Francisco", lat: 37.77, lng: -122.41, region: "USA", type: "hub" },
  { name: "New York", lat: 40.71, lng: -74.0, region: "USA", type: "hub" },
  { name: "Austin", lat: 30.27, lng: -97.74, region: "USA", type: "city" },
  { name: "Seattle", lat: 47.61, lng: -122.33, region: "USA", type: "city" },
  { name: "London", lat: 51.5, lng: -0.12, region: "Europe", type: "hub" },
  { name: "Berlin", lat: 52.52, lng: 13.4, region: "Europe", type: "hub" },
  { name: "Paris", lat: 48.85, lng: 2.35, region: "Europe", type: "city" },
  { name: "Amsterdam", lat: 52.36, lng: 4.9, region: "Europe", type: "city" },
  { name: "Stockholm", lat: 59.33, lng: 18.06, region: "Europe", type: "city" },
  { name: "Singapore", lat: 1.35, lng: 103.82, region: "SEA", type: "hub" },
  { name: "Jakarta", lat: -6.2, lng: 106.8, region: "SEA", type: "city" },
  { name: "Bangkok", lat: 13.75, lng: 100.5, region: "SEA", type: "city" },
  { name: "Dubai", lat: 25.2, lng: 55.27, region: "Middle East", type: "hub" },
  { name: "Tel Aviv", lat: 32.08, lng: 34.78, region: "Middle East", type: "city" },
  { name: "Tokyo", lat: 35.68, lng: 139.69, region: "East Asia", type: "hub" },
  { name: "Seoul", lat: 37.56, lng: 126.97, region: "East Asia", type: "hub" },
  { name: "Beijing", lat: 39.9, lng: 116.4, region: "East Asia", type: "hub" },
  { name: "Sydney", lat: -33.86, lng: 151.2, region: "Pacific", type: "hub" },
  { name: "Nairobi", lat: -1.29, lng: 36.82, region: "Africa", type: "hub" },
  { name: "Lagos", lat: 6.52, lng: 3.37, region: "Africa", type: "hub" },
  { name: "São Paulo", lat: -23.55, lng: -46.63, region: "LatAm", type: "hub" },
  { name: "Mexico City", lat: 19.43, lng: -99.13, region: "LatAm", type: "city" },
  { name: "Cape Town", lat: -33.92, lng: 18.42, region: "Africa", type: "city" },
]

const CX = 200, CY = 200, R = 168

function toRad(deg: number) { return (deg * Math.PI) / 180 }

function project(lat: number, lng: number, rotDeg: number) {
  const φ = toRad(lat)
  const λ = toRad(lng + rotDeg)
  const cosφ = Math.cos(φ)
  const cosλ = Math.cos(λ)
  const sinλ = Math.sin(λ)
  const sinφ = Math.sin(φ)
  const visible = cosφ * cosλ > -0.08
  const x = CX + R * cosφ * sinλ
  const y = CY - R * sinφ
  return { x, y, visible, depth: cosφ * cosλ }
}

function polygonToPath(coords: [number, number][], rotDeg: number): string | null {
  const pts = coords.map(([lng, lat]) => project(lat, lng, rotDeg))
  const visiblePts = pts.filter(p => p.visible)
  if (visiblePts.length < 3) return null
  // Use all points but clip to visible
  let d = ""
  let first = true
  for (const p of pts) {
    if (p.visible) {
      d += `${first ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)} `
      first = false
    } else if (!first) {
      first = true
    }
  }
  return d + "Z"
}

function buildGrid(rotDeg: number) {
  const meridians: string[] = []
  const parallels: string[] = []
  
  for (let lng = -180; lng < 180; lng += 20) {
    const pts: string[] = []
    for (let lat = -85; lat <= 85; lat += 3) {
      const { x, y, visible } = project(lat, lng, rotDeg)
      if (visible) pts.push(`${pts.length === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
      else if (pts.length) { meridians.push(pts.join(" ")); pts.length = 0 }
    }
    if (pts.length > 1) meridians.push(pts.join(" "))
  }

  for (const lat of [-60, -30, 0, 30, 60]) {
    let d = "", first = true
    for (let lng = -180; lng <= 180; lng += 2) {
      const { x, y, visible } = project(lat, lng, rotDeg)
      if (visible) { d += `${first ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`; first = false }
      else { first = true }
    }
    if (d) parallels.push(d)
  }
  
  return { meridians, parallels }
}

export function GlobeHero({ isOrg }: { isOrg?: boolean }) {
  const [rotation, setRotation] = useState(30)
  const [activeCityIdx, setActiveCityIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [rotationAtDrag, setRotationAtDrag] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const dragRef = useRef(false)
  const autoRotRef = useRef(true)

  useEffect(() => { setMounted(true) }, [])

  // Auto-rotate
  useEffect(() => {
    const animate = (ts: number) => {
      if (autoRotRef.current && !dragRef.current) {
        const dt = ts - lastTimeRef.current
        lastTimeRef.current = ts
        setRotation(r => (r + dt * 0.004) % 360)
      } else {
        lastTimeRef.current = ts
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  // City cycle
  useEffect(() => {
    const id = setInterval(() => {
      setActiveCityIdx(i => (i + 1) % CITIES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = true
    setIsDragging(true)
    setDragStart(e.clientX)
    setRotationAtDrag(rotation)
  }
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragStart
    setRotation((rotationAtDrag + dx * 0.4) % 360)
  }, [dragStart, rotationAtDrag])
  const handleMouseUp = () => { dragRef.current = false; setIsDragging(false) }

  const { meridians, parallels } = buildGrid(rotation)
  const projCities = CITIES.map((c, i) => ({ ...c, ...project(c.lat, c.lng, rotation), idx: i }))
    .filter(c => c.visible)
    .sort((a, b) => a.depth - b.depth)

  const activeCity = CITIES[activeCityIdx]
  const activeCityProj = project(activeCity.lat, activeCity.lng, rotation)

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  })

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(150deg, #faf7f2 0%, #f5f0e8 50%, #ede8de 100%)" }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#8b1a1a" }} />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(139,26,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,26,26,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Decorative pull-quote marks */}
      <div
        className="absolute top-28 left-6 text-[140px] leading-none select-none pointer-events-none"
        style={{ fontFamily: "Georgia, serif", color: "#8b1a1a", opacity: 0.05 }}
      >"</div>
      <div
        className="absolute bottom-20 right-6 text-[140px] leading-none select-none pointer-events-none"
        style={{ fontFamily: "Georgia, serif", color: "#8b1a1a", opacity: 0.05 }}
      >"</div>

      {/* Dateline */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center gap-6"
        style={{ top: 88 }}
      >
        <div className="h-px w-12" style={{ background: "#c9b99a" }} />
        <span
          className="text-[9px] tracking-[0.28em] uppercase"
          style={{ fontFamily: "'Times New Roman', serif", color: "#8b6a6a" }}
        >
          {today}
        </span>
        <div className="h-px w-12" style={{ background: "#c9b99a" }} />
      </div>

      {/* Main two-column layout */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-6 pt-16 pb-20">

        {/* ── LEFT: Editorial text ───────────────────────────────────────── */}
        <div className="flex-1 text-center lg:text-left max-w-[640px]">

          {/* Section kicker */}
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-5">
            <div className="h-px w-10" style={{ background: "#8b1a1a" }} />
            <span
              className="text-[9px] tracking-[0.3em] uppercase font-bold"
              style={{ fontFamily: "'Times New Roman', serif", color: "#8b1a1a" }}
            >
              {isOrg ? "Est. 2024 · Global Registry" : "The Founder Chronicle · 2026"}
            </span>
            <div className="h-px w-10" style={{ background: "#8b1a1a" }} />
          </div>

          {/* Main headline */}
          <h1
            className="leading-[0.95] tracking-tight mb-7"
            style={{
              fontFamily: "'Times New Roman', Georgia, 'Palatino Linotype', serif",
              fontSize: "clamp(44px, 6.5vw, 86px)",
              color: "#1a0a0a",
              fontWeight: 700,
            }}
          >
            {isOrg ? (
              <>
                Where Startups<br />
                <span style={{ color: "#8b1a1a", fontStyle: "italic" }}>Prove They Exist.</span>
              </>
            ) : (
              <>
                Stories That<br />
                <span style={{ color: "#8b1a1a", fontStyle: "italic" }}>Shape Founders.</span>
              </>
            )}
          </h1>

          {/* Ornamental divider */}
          <div className="flex items-center gap-4 justify-center lg:justify-start mb-7">
            <div className="h-px w-12" style={{ background: "#8b1a1a" }} />
            <div className="w-2 h-2 rotate-45" style={{ background: "#8b1a1a" }} />
            <div className="h-px w-12" style={{ background: "#8b1a1a" }} />
          </div>

          {/* Standfirst */}
          <p
            className="text-[17px] leading-[1.75] mb-9 max-w-[520px] mx-auto lg:mx-0"
            style={{ fontFamily: "'Times New Roman', Georgia, serif", color: "#3d2b2b" }}
          >
            {isOrg
              ? "The world's first independent startup registry. Every company is manually verified and assigned a permanent UpForge Registry Number — the global standard for startup identity and credibility."
              : "Deep research, verified data, and real lessons from the founders building India's next generation of unicorn companies. No PR. No fluff. Updated weekly."}
          </p>

          {/* Stats table — editorial style */}
          <div
            className="grid grid-cols-3 mb-9 border-t border-b"
            style={{ borderColor: "#c9b99a" }}
          >
            {[
              { n: "5,000+", l: "Verified Startups" },
              { n: "50+", l: "Countries" },
              { n: "UFRN™", l: "Global Standard" },
            ].map((s, i) => (
              <div
                key={s.l}
                className="py-5 text-center"
                style={{ borderRight: i < 2 ? "1px solid #c9b99a" : "none" }}
              >
                <div
                  className="text-[28px] font-bold leading-none mb-1"
                  style={{ fontFamily: "'Times New Roman', Georgia, serif", color: "#8b1a1a" }}
                >
                  {s.n}
                </div>
                <div
                  className="text-[9px] tracking-[0.16em] uppercase"
                  style={{ fontFamily: "'Times New Roman', serif", color: "#8b6a6a" }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="/registry"
              className="inline-flex items-center gap-2 px-8 py-4 text-[12px] font-bold tracking-wider uppercase transition-all hover:opacity-90 hover:-translate-y-px"
              style={{
                background: "#8b1a1a",
                color: "#faf7f2",
                fontFamily: "'Times New Roman', serif",
                letterSpacing: "0.07em",
                boxShadow: "0 4px 20px rgba(139,26,26,0.25)",
              }}
            >
              Explore Registry
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/submit"
              className="inline-flex items-center gap-2 px-8 py-4 text-[12px] font-bold tracking-wider uppercase transition-all hover:bg-[#8b1a1a] hover:text-[#faf7f2]"
              style={{
                background: "transparent",
                color: "#8b1a1a",
                fontFamily: "'Times New Roman', serif",
                border: "2px solid #8b1a1a",
                letterSpacing: "0.07em",
              }}
            >
              List Your Startup
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-5 mt-8 justify-center lg:justify-start flex-wrap">
            {["Harvard Business School", "IIM Ahmedabad", "Y Combinator Alumni", "Blume Ventures"].map(org => (
              <span
                key={org}
                className="text-[9px] font-semibold opacity-40 uppercase tracking-wider"
                style={{ fontFamily: "'Times New Roman', Georgia, serif", color: "#1a0a0a" }}
              >
                {org}
              </span>
            ))}
          </div>
          <div
            className="text-[8px] tracking-widest uppercase mt-2 text-center lg:text-left opacity-50"
            style={{ fontFamily: "'Times New Roman', serif", color: "#8b6a6a" }}
          >
            Cited by researchers worldwide
          </div>
        </div>

        {/* ── RIGHT: Precision Globe ─────────────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center relative select-none">

          {/* City label */}
          {mounted && activeCityProj.visible && (
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                left: `calc(50% + ${(activeCityProj.x - 200) * 1.1}px + 16px)`,
                top: `calc(50% + ${(activeCityProj.y - 200) * 1.1}px - 14px)`,
                transition: "left 0.7s ease, top 0.7s ease",
              }}
            >
              <div
                className="text-[11px] font-semibold px-3 py-1.5 whitespace-nowrap"
                style={{
                  background: "#faf7f2",
                  color: "#8b1a1a",
                  border: "1px solid #c9b99a",
                  fontFamily: "'Times New Roman', Georgia, serif",
                  boxShadow: "0 2px 12px rgba(139,26,26,0.12)",
                }}
              >
                {activeCity.name}
                <span
                  className="ml-2 font-normal"
                  style={{ color: "#8b6a6a" }}
                >
                  · {activeCity.region}
                </span>
              </div>
              {/* Connector dot */}
              <div
                className="w-1.5 h-1.5 rounded-full mx-auto -mt-0.5"
                style={{ background: "#8b1a1a" }}
              />
            </div>
          )}

          {/* Drag hint */}
          {mounted && (
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase opacity-40 pointer-events-none"
              style={{ fontFamily: "'Times New Roman', serif", color: "#8b6a6a" }}
            >
              Drag to rotate
            </div>
          )}

          <svg
            viewBox="0 0 400 400"
            className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            aria-label="Interactive globe showing startup locations"
          >
            <defs>
              <radialGradient id="globeBase" cx="36%" cy="30%" r="68%">
                <stop offset="0%" stopColor="#fdf9f4" />
                <stop offset="55%" stopColor="#f0e8dc" />
                <stop offset="100%" stopColor="#e5d8c8" />
              </radialGradient>
              <radialGradient id="globeOcean" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f5efe6" />
                <stop offset="100%" stopColor="#ede4d6" />
              </radialGradient>
              <radialGradient id="globeShade" cx="72%" cy="72%" r="50%">
                <stop offset="0%" stopColor="#3d1515" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#3d1515" stopOpacity="0" />
              </radialGradient>
              <clipPath id="globeClip">
                <circle cx={CX} cy={CY} r={R} />
              </clipPath>
              <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="globeShadow">
                <feDropShadow dx="14" dy="18" stdDeviation="24" floodColor="#3d1515" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* Drop shadow ellipse */}
            <ellipse cx="216" cy="378" rx="140" ry="10" fill="#3d1515" opacity="0.07" />

            {/* Ocean base */}
            <circle cx={CX} cy={CY} r={R} fill="url(#globeOcean)" filter="url(#globeShadow)" />

            <g clipPath="url(#globeClip)">
              {/* Continent fills */}
              {CONTINENTS.map(continent =>
                continent.paths.map((path, pi) => {
                  const d = polygonToPath(path, rotation)
                  if (!d) return null
                  return (
                    <path
                      key={`${continent.name}-${pi}`}
                      d={d}
                      fill={continent.color}
                      stroke="#c9b99a"
                      strokeWidth="0.5"
                      opacity="0.85"
                    />
                  )
                })
              )}

              {/* Grid lines */}
              {meridians.map((d, i) => (
                <path key={`m${i}`} d={d} stroke="#8b1a1a" strokeWidth="0.35" fill="none" opacity="0.12" />
              ))}
              {parallels.map((d, i) => (
                <path key={`p${i}`} d={d} stroke="#8b1a1a" strokeWidth="0.35" fill="none" opacity="0.12" />
              ))}

              {/* Equator */}
              {(() => {
                const p = parallels[parallels.length - 1] // equator approx
                return p ? <path d={p} stroke="#8b1a1a" strokeWidth="0.6" fill="none" opacity="0.2" strokeDasharray="3,3" /> : null
              })()}
            </g>

            {/* Shade overlay */}
            <circle cx={CX} cy={CY} r={R} fill="url(#globeShade)" />

            {/* City dots — rendered after shade */}
            {mounted && projCities.map(c => {
              const isActive = c.idx === activeCityIdx
              const isHub = c.type === "hub"
              return (
                <g key={c.name}>
                  {isActive && (
                    <circle cx={c.x} cy={c.y} fill="#8b1a1a" r="4" opacity="0.15">
                      <animate attributeName="r" values="4;14;4" dur="2.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.25;0;0.25" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {isActive && (
                    <circle cx={c.x} cy={c.y} fill="none" stroke="#8b1a1a" strokeWidth="1" r="7" opacity="0.4">
                      <animate attributeName="r" values="5;10;5" dur="2.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={isActive ? 5 : isHub ? 3 : 2}
                    fill={isActive ? "#8b1a1a" : isHub ? "#b04a2a" : "#c9836e"}
                    opacity={isActive ? 1 : isHub ? 0.75 : 0.55}
                    filter={isActive ? "url(#cityGlow)" : undefined}
                  />
                  {isHub && !isActive && (
                    <circle cx={c.x} cy={c.y} r="1.5" fill="#faf7f2" opacity="0.6" />
                  )}
                </g>
              )
            })}

            {/* Rim */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#8b1a1a" strokeWidth="1.2" opacity="0.2" />

            {/* Specular highlight */}
            <ellipse cx="152" cy="138" rx="50" ry="24" fill="white" opacity="0.2" transform="rotate(-38 152 138)" />
            <ellipse cx="145" cy="130" rx="22" ry="10" fill="white" opacity="0.15" transform="rotate(-38 145 130)" />
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[8px] tracking-[0.28em] uppercase"
          style={{ fontFamily: "'Times New Roman', serif", color: "#8b6a6a" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, #8b1a1a, transparent)",
            animation: "scrollPulse 2.2s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50% { opacity: 0.85; transform: scaleY(1.12); }
        }
      `}</style>
    </section>
  )
}
