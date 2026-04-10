"use client"
// components/globe-hero.tsx — REALISTIC BLUE GLOBE v3
// Precision orthographic globe with real continent outlines
// Deep blue oceans, realistic land colors, transparent background
// Seamlessly integrates with any page background

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { Verified, Globe, ArrowRight } from "lucide-react"

// Simplified continent polygons (lat/lng pairs) for real landmass rendering
const CONTINENTS: { name: string; color: string; paths: [number, number][][] }[] = [
  {
    name: "North America",
    color: "#4a8c5c", // Rich green
    paths: [
      [[-168,72],[-140,72],[-95,72],[-75,70],[-65,68],[-60,48],[-66,44],[-70,42],[-80,25],[-88,15],[-78,8],[-78,0],[-80,0],[-90,8],[-105,15],[-118,32],[-125,37],[-135,58],[-148,62],[-165,65],[-168,72]],
      [[-55,47],[-53,47],[-53,45],[-66,44],[-60,48],[-55,47]],
    ]
  },
  {
    name: "South America",
    color: "#5a9c6a",
    paths: [
      [[-78,12],[-62,12],[-50,0],[-35,-5],[-35,-10],[-40,-20],[-45,-25],[-50,-30],[-55,-35],[-68,-55],[-75,-50],[-80,-40],[-78,-30],[-75,-10],[-80,0],[-78,8],[-78,12]],
    ]
  },
  {
    name: "Europe",
    color: "#6aac7a",
    paths: [
      [[-10,36],[30,36],[32,42],[30,46],[20,50],[10,55],[5,60],[15,68],[28,72],[30,68],[25,60],[30,55],[25,50],[20,42],[28,40],[35,36],[28,36],[20,40],[10,43],[0,44],[-5,40],[-10,36]],
    ]
  },
  {
    name: "Africa",
    color: "#7abc8a",
    paths: [
      [[-18,15],[0,15],[15,15],[30,15],[42,12],[52,12],[52,0],[45,-10],[35,-18],[30,-25],[20,-35],[17,-35],[12,-28],[8,-20],[8,-5],[0,0],[-18,15]],
      [[28,36],[35,36],[37,22],[38,12],[42,12],[30,15],[15,15],[8,35],[15,38],[25,38],[28,36]],
    ]
  },
  {
    name: "Asia",
    color: "#5a9c6a",
    paths: [
      [[28,36],[35,36],[45,38],[55,40],[60,45],[65,42],[75,38],[80,28],[78,12],[68,24],[58,22],[52,12],[45,12],[38,12],[36,22],[30,28],[25,35],[28,36]],
      [[65,42],[75,52],[85,55],[95,55],[110,48],[120,52],[130,60],[140,68],[150,62],[155,58],[150,50],[145,44],[140,38],[132,34],[120,28],[110,20],[105,12],[100,5],[105,-2],[100,-5],[95,0],[85,8],[80,12],[78,12],[80,28],[75,38],[65,42]],
      [[78,72],[100,72],[120,72],[135,68],[148,62],[140,60],[130,60],[120,52],[110,48],[95,55],[85,55],[75,52],[65,55],[55,70],[62,72],[78,72]],
    ]
  },
  {
    name: "Australia",
    color: "#8acc9a",
    paths: [
      [[114,-22],[118,-20],[125,-14],[132,-12],[138,-15],[145,-18],[150,-22],[152,-28],[148,-38],[140,-38],[132,-35],[125,-34],[115,-34],[112,-28],[114,-22]],
    ]
  },
  {
    name: "Greenland",
    color: "#8acc9a",
    paths: [
      [[-55,76],[-20,76],[-18,72],[-25,62],[-45,60],[-55,65],[-62,70],[-55,76]],
    ]
  }
]

// Cities focused on internship hubs globally
const CITIES = [
  { name: "Bangalore", lat: 12.97, lng: 77.59, region: "India", type: "hub", internships: "2.5k+" },
  { name: "Mumbai", lat: 19.07, lng: 72.87, region: "India", type: "hub", internships: "2.1k+" },
  { name: "Delhi", lat: 28.61, lng: 77.2, region: "India", type: "hub", internships: "1.8k+" },
  { name: "San Francisco", lat: 37.77, lng: -122.41, region: "USA", type: "hub", internships: "3.2k+" },
  { name: "New York", lat: 40.71, lng: -74.0, region: "USA", type: "hub", internships: "2.8k+" },
  { name: "London", lat: 51.5, lng: -0.12, region: "Europe", type: "hub", internships: "2.2k+" },
  { name: "Berlin", lat: 52.52, lng: 13.4, region: "Europe", type: "hub", internships: "1.5k+" },
  { name: "Singapore", lat: 1.35, lng: 103.82, region: "SEA", type: "hub", internships: "1.9k+" },
  { name: "Tokyo", lat: 35.68, lng: 139.69, region: "East Asia", type: "hub", internships: "1.6k+" },
  { name: "Dubai", lat: 25.2, lng: 55.27, region: "Middle East", type: "hub", internships: "1.1k+" },
  { name: "Sydney", lat: -33.86, lng: 151.2, region: "Pacific", type: "hub", internships: "980+" },
  { name: "Toronto", lat: 43.65, lng: -79.38, region: "Canada", type: "hub", internships: "1.3k+" },
]

const CX = 200, CY = 200, R = 168

function toRad(deg: number) { return (deg * Math.PI) / 180 }

function project(lat: number, lng: number, rotDeg: number) {
  const φ = toRad(lat)
  const λ = toRad(lng + rotDeg)
  const cosφ = Math.cos(φ)
  const cosλ = Math.cos(λ)
  const sinλ = Math.sin(λ)
  const visible = cosφ * cosλ > -0.08
  const x = CX + R * cosφ * sinλ
  const y = CY - R * Math.sin(φ)
  return { x, y, visible, depth: cosφ * cosλ }
}

function polygonToPath(coords: [number, number][], rotDeg: number): string | null {
  const pts = coords.map(([lng, lat]) => project(lat, lng, rotDeg))
  if (pts.filter(p => p.visible).length < 3) return null
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

export function GlobeHero() {
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
        setRotation(r => (r + dt * 0.003) % 360)
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
    setRotation((rotationAtDrag + dx * 0.5) % 360)
  }, [dragStart, rotationAtDrag])
  const handleMouseUp = () => { dragRef.current = false; setIsDragging(false) }

  const { meridians, parallels } = buildGrid(rotation)
  const projCities = CITIES.map((c, i) => ({ ...c, ...project(c.lat, c.lng, rotation), idx: i }))
    .filter(c => c.visible)
    .sort((a, b) => a.depth - b.depth)

  const activeCity = CITIES[activeCityIdx]
  const activeCityProj = project(activeCity.lat, activeCity.lng, rotation)

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      
      {/* Globe container - NO BACKGROUND */}
      <div className="relative flex items-center justify-center select-none">
        
        {/* City label popup */}
        {mounted && activeCityProj.visible && (
          <div
            className="absolute z-20 pointer-events-none animate-in fade-in zoom-in duration-300"
            style={{
              left: `calc(50% + ${(activeCityProj.x - 200) * 0.85}px + 20px)`,
              top: `calc(50% + ${(activeCityProj.y - 200) * 0.85}px - 16px)`,
              transition: "left 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), top 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
            }}
          >
            <div className="relative">
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white/90 border-l border-t border-indigo-200" />
              <div className="text-[11px] font-semibold px-3 py-1.5 whitespace-nowrap bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-indigo-200">
                <span className="text-indigo-700">{activeCity.name}</span>
                <span className="ml-1.5 text-[9px] font-medium text-emerald-600">
                  {activeCity.internships}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Drag hint */}
        {mounted && (
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[8px] tracking-widest uppercase opacity-40 pointer-events-none whitespace-nowrap">
            Drag to rotate globe
          </div>
        )}

        <svg
          viewBox="0 0 400 400"
          className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px] drop-shadow-2xl"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          aria-label="Interactive globe showing internship locations worldwide"
        >
          <defs>
            {/* Deep blue ocean gradient */}
            <radialGradient id="oceanGradient" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1a6d8f" />
              <stop offset="40%" stopColor="#0e5a7a" />
              <stop offset="75%" stopColor="#0a4a6a" />
              <stop offset="100%" stopColor="#063b5a" />
            </radialGradient>
            
            {/* Atmosphere glow */}
            <radialGradient id="atmosphereGlow" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="rgba(100,180,220,0)" />
              <stop offset="95%" stopColor="rgba(100,180,220,0.15)" />
              <stop offset="100%" stopColor="rgba(100,180,220,0.3)" />
            </radialGradient>
            
            {/* Cloud layer gradient */}
            <radialGradient id="cloudLayer" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0)" />
              <stop offset="90%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
            </radialGradient>
            
            {/* Shadow on the dark side */}
            <radialGradient id="darkSide" cx="65%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
            </radialGradient>
            
            {/* Specular highlight */}
            <radialGradient id="specular" cx="30%" cy="25%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            <clipPath id="globeClip">
              <circle cx={CX} cy={CY} r={R} />
            </clipPath>
            
            <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="globeSoftShadow">
              <feDropShadow dx="4" dy="8" stdDeviation="12" floodColor="#0a4a6a" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Drop shadow beneath globe */}
          <ellipse cx="215" cy="378" rx="130" ry="10" fill="#0a4a6a" opacity="0.15" filter="blur(4px)" />

          {/* Ocean base */}
          <circle cx={CX} cy={CY} r={R} fill="url(#oceanGradient)" filter="url(#globeSoftShadow)" />

          <g clipPath="url(#globeClip)">
            {/* Atmosphere glow inside globe */}
            <circle cx={CX} cy={CY} r={R} fill="url(#atmosphereGlow)" />
            
            {/* Continent landmasses */}
            {CONTINENTS.map(continent =>
              continent.paths.map((path, pi) => {
                const d = polygonToPath(path, rotation)
                if (!d) return null
                return (
                  <path
                    key={`${continent.name}-${pi}`}
                    d={d}
                    fill={continent.color}
                    stroke="#3a7a4a"
                    strokeWidth="0.6"
                    strokeLinejoin="round"
                    opacity="0.92"
                  />
                )
              })
            )}

            {/* Subtle continent inner shadow/highlight */}
            {CONTINENTS.map(continent =>
              continent.paths.map((path, pi) => {
                const d = polygonToPath(path, rotation)
                if (!d) return null
                return (
                  <path
                    key={`${continent.name}-inner-${pi}`}
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                  />
                )
              })
            )}

            {/* Grid lines - subtle */}
            {meridians.map((d, i) => (
              <path key={`m${i}`} d={d} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" fill="none" />
            ))}
            {parallels.map((d, i) => (
              <path key={`p${i}`} d={d} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" fill="none" />
            ))}

            {/* Equator - slightly more visible */}
            {(() => {
              const p = parallels[parallels.length - 1]
              return p ? <path d={p} stroke="rgba(255,215,0,0.2)" strokeWidth="1" fill="none" strokeDasharray="4,4" /> : null
            })()}
            
            {/* Cloud wisps */}
            <ellipse cx="160" cy="140" rx="60" ry="15" fill="white" opacity="0.06" transform="rotate(-15 160 140)" />
            <ellipse cx="250" cy="280" rx="45" ry="10" fill="white" opacity="0.05" transform="rotate(25 250 280)" />
            <ellipse cx="120" cy="300" rx="35" ry="8" fill="white" opacity="0.04" transform="rotate(-30 120 300)" />
          </g>

          {/* Dark side shadow overlay */}
          <circle cx={CX} cy={CY} r={R} fill="url(#darkSide)" />
          
          {/* Cloud layer overlay */}
          <circle cx={CX} cy={CY} r={R} fill="url(#cloudLayer)" />

          {/* City dots */}
          {mounted && projCities.map(c => {
            const isActive = c.idx === activeCityIdx
            const isHub = c.type === "hub"
            return (
              <g key={c.name}>
                {/* Pulse ring for active city */}
                {isActive && (
                  <>
                    <circle cx={c.x} cy={c.y} fill="#ff6b4a" r="5" opacity="0.2">
                      <animate attributeName="r" values="4;16;4" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={c.x} cy={c.y} fill="none" stroke="#ff6b4a" strokeWidth="1.2" r="8" opacity="0.5">
                      <animate attributeName="r" values="6;12;6" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
                {/* Main city dot */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isActive ? 5 : isHub ? 3.5 : 2.5}
                  fill={isActive ? "#ff6b4a" : isHub ? "#ffaa66" : "#ffcc88"}
                  opacity={isActive ? 1 : isHub ? 0.9 : 0.75}
                  filter={isActive ? "url(#cityGlow)" : undefined}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.5"
                />
                {/* Inner highlight for hub cities */}
                {isHub && !isActive && (
                  <circle cx={c.x} cy={c.y} r="1.5" fill="rgba(255,255,255,0.7)" />
                )}
              </g>
            )
          })}

          {/* Globe rim/border */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(100,180,220,0.4)" strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r={R+1} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

          {/* Specular highlight (sun reflection) */}
          <ellipse cx="148" cy="132" rx="55" ry="28" fill="url(#specular)" transform="rotate(-35 148 132)" />
          <ellipse cx="140" cy="125" rx="20" ry="10" fill="rgba(255,255,255,0.12)" transform="rotate(-35 140 125)" />
        </svg>
      </div>

      {/* Bottom stats bar - clean and minimal */}
      <div className="flex flex-wrap items-center justify-center gap-5 mt-6 pt-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ffaa66] shadow-sm" />
          <span className="text-[9px] text-slate-500 font-medium">Major Hubs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ffcc88]" />
          <span className="text-[9px] text-slate-500 font-medium">Active Cities</span>
        </div>
        <div className="flex items-center gap-2">
          <Verified size={10} className="text-indigo-500" />
          <span className="text-[9px] text-slate-500 font-medium">Upforge Verified</span>
        </div>
      </div>

      {/* Small CTA */}
      <Link 
        href="/internships" 
        className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 transition-all hover:gap-2"
      >
        Explore internships worldwide <ArrowRight size={10} />
      </Link>
    </div>
  )
}
