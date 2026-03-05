'use client'
// app/courses/[id]/page.tsx

import { useEffect, useState, useCallback } from 'react'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { courses, type Lesson } from '../course-data'
import {
  CheckCircle, Circle, ChevronRight, ChevronDown, ChevronLeft,
  BookOpen, Code, FileText, HelpCircle, Award, Download,
  Clock, Play, X, Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── Content renderer ────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-indigo-100/80">{part.slice(1, -1)}</code>
    return part
  })
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'code'
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) { codeLines.push(lines[i]); i++ }
      elements.push(
        <div key={`cb-${i}`} className="my-6 rounded-xl overflow-hidden border border-gray-800/60 shadow-lg">
          <div className="flex items-center bg-[#161b22] px-4 py-2.5 gap-2">
            <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ff5f57]"/><span className="w-3 h-3 rounded-full bg-[#febc2e]"/><span className="w-3 h-3 rounded-full bg-[#28c840]"/></div>
            <span className="text-[#8b949e] text-xs font-mono ml-1">{lang}</span>
          </div>
          <pre className="bg-[#0d1117] text-[#e6edf3] text-[13px] font-mono leading-[1.7] p-5 overflow-x-auto"><code>{codeLines.join('\n')}</code></pre>
        </div>
      )
      i++; continue
    }
    if (line.startsWith('|') && lines[i+1]?.match(/^\|[-| ]+\|/)) {
      const headers = line.split('|').slice(1,-1).map(h=>h.trim()); i+=2
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i].split('|').slice(1,-1).map(c=>c.trim())); i++ }
      elements.push(
        <div key={`tbl-${i}`} className="my-5 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm min-w-[400px]">
            <thead className="bg-indigo-50"><tr>{headers.map((h,j)=><th key={j} className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">{renderInline(h)}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100 bg-white">{rows.map((row,ri)=><tr key={ri} className="hover:bg-gray-50/60">{row.map((cell,ci)=><td key={ci} className="px-4 py-2.5 text-[13px] text-gray-700">{renderInline(cell)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ); continue
    }
    if (line.startsWith('## ')) elements.push(<h2 key={`h2-${i}`} className="text-[1.35rem] font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100 tracking-tight">{renderInline(line.slice(3))}</h2>)
    else if (line.startsWith('### ')) elements.push(<h3 key={`h3-${i}`} className="text-base font-semibold text-gray-800 mt-6 mb-2">{renderInline(line.slice(4))}</h3>)
    else if (line.startsWith('> ')) elements.push(<div key={`bq-${i}`} className="my-4 bg-indigo-50/70 border-l-[3px] border-indigo-400 rounded-r-xl px-4 py-3"><p className="text-[13.5px] text-indigo-800 leading-relaxed">{renderInline(line.slice(2))}</p></div>)
    else if (/^- [✅❌⚠️]/.test(line)) { const icon=line.slice(2,line.indexOf(' ',2)+1).trim(); const rest=line.slice(line.indexOf(' ',3)).trim(); elements.push(<div key={`chk-${i}`} className="flex items-start gap-2 my-1.5"><span className="text-base mt-0.5 flex-shrink-0">{icon}</span><p className="text-[13.5px] text-gray-700 leading-6">{renderInline(rest)}</p></div>) }
    else if (line.startsWith('- ')) elements.push(<div key={`li-${i}`} className="flex items-start gap-2.5 my-1.5"><span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"/><p className="text-[13.5px] text-gray-700 leading-6">{renderInline(line.slice(2))}</p></div>)
    else if (/^\d+\. /.test(line)) { const num=line.match(/^(\d+)\./)?.[1]??'1'; elements.push(<div key={`nl-${i}`} className="flex items-start gap-3 my-1.5"><span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0">{num}</span><p className="text-[13.5px] text-gray-700 leading-6">{renderInline(line.replace(/^\d+\. /,''))}</p></div>) }
    else if (line.trim()) elements.push(<p key={`p-${i}`} className="text-[14px] text-gray-700 leading-7 my-1">{renderInline(line)}</p>)
    else elements.push(<div key={`sp-${i}`} className="h-1"/>)
    i++
  }
  return <div className="space-y-0.5">{elements}</div>
}

function LessonTypeIcon({ type }: { type: Lesson['type'] }) {
  if (type==='video')    return <Play size={12} className="text-violet-500 flex-shrink-0"/>
  if (type==='exercise') return <Code size={12} className="text-amber-500 flex-shrink-0"/>
  if (type==='quiz')     return <HelpCircle size={12} className="text-rose-500 flex-shrink-0"/>
  return                        <FileText size={12} className="text-indigo-500 flex-shrink-0"/>
}

// ─── Certificate HTML builder (self-contained, print-safe) ───────────────────

function buildCertHTML(userName: string, courseTitle: string, date: string, certId: string) {
  const ticks = Array.from({length:12},(_,idx)=>{
    const a=(idx*30-90)*Math.PI/180
    return `<line x1="${(50+39*Math.cos(a)).toFixed(1)}" y1="${(50+39*Math.sin(a)).toFixed(1)}" x2="${(50+44*Math.cos(a)).toFixed(1)}" y2="${(50+44*Math.sin(a)).toFixed(1)}" stroke="#c8a951" stroke-width="1" opacity="0.55"/>`
  }).join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Certificate – ${userName}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:297mm;height:210mm;background:#fff;font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
@page{size:A4 landscape;margin:0}
.cert{position:relative;width:297mm;height:210mm;background:#fff;overflow:hidden}
.frame-a{position:absolute;inset:8mm;border:1px solid rgba(200,169,81,.5);pointer-events:none}
.frame-b{position:absolute;inset:11mm;border:1px solid rgba(200,169,81,.2);pointer-events:none}
.lp{position:absolute;left:0;top:0;bottom:0;width:38%;background:linear-gradient(160deg,#080618 0%,#1a1063 55%,#0f1a5c 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:12mm 9mm}
.rp{position:absolute;left:38%;right:0;top:0;bottom:0;background:#fff;display:flex;flex-direction:column;justify-content:center;padding:10mm 13mm 10mm 11mm}
.seal-outer{width:28mm;height:28mm;border-radius:50%;border:1.2px solid rgba(200,169,81,.75);display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:5mm}
.seal-inner{width:22mm;height:22mm;border-radius:50%;border:.6px solid rgba(200,169,81,.3);background:rgba(200,169,81,.08);display:flex;flex-direction:column;align-items:center;justify-content:center}
.si{font-family:'Playfair Display',serif;font-size:15pt;font-weight:700;color:#c8a951;line-height:1}
.st{font-size:4.5pt;font-weight:600;color:rgba(200,169,81,.8);letter-spacing:.12em;text-transform:uppercase}
.bn{font-size:6pt;font-weight:600;color:rgba(255,255,255,.4);letter-spacing:.22em;text-transform:uppercase;margin-bottom:1.5mm}
.bs{font-size:5.5pt;color:rgba(255,255,255,.22);letter-spacing:.12em}
.div{display:flex;align-items:center;gap:3mm;margin:5mm 0 4mm;opacity:.28}
.dl{height:.5px;width:12mm;background:#c8a951}.dd{width:2.5px;height:2.5px;border-radius:50%;background:#c8a951}
.cid{font-size:4.8pt;color:rgba(255,255,255,.18);letter-spacing:.08em}
.coh{display:flex;align-items:center;gap:3mm;margin-bottom:6mm}
.cl{height:.5px;flex:1;background:rgba(200,169,81,.35)}
.clabel{font-size:5.5pt;font-weight:600;color:#c8a951;letter-spacing:.28em;text-transform:uppercase;white-space:nowrap}
.ct{font-size:7pt;color:#9ca3af;letter-spacing:.14em;text-transform:uppercase;margin-bottom:2mm}
.name{font-family:'Playfair Display',serif;font-size:30pt;font-weight:700;color:#0a0820;line-height:1.05;letter-spacing:-.3px;margin-bottom:2.5mm}
.gb{display:flex;gap:1.5mm;margin-bottom:5mm}
.gbm{height:2.5px;width:14mm;border-radius:99px;background:#c8a951}
.gbs{height:2.5px;width:5mm;border-radius:99px;background:rgba(200,169,81,.35)}
.ctext{font-size:7pt;color:#9ca3af;letter-spacing:.12em;text-transform:uppercase;margin-bottom:2.5mm}
.ctitle{font-family:'Playfair Display',serif;font-size:15pt;font-weight:600;color:#1a1063;line-height:1.25;margin-bottom:8mm}
.br{display:flex;align-items:flex-end;justify-content:space-between}
.sig-t{font-family:'Playfair Display',serif;font-style:italic;font-size:14pt;color:#1a1063;opacity:.85;margin-bottom:1.5mm;line-height:1}
.sig-l{height:.5px;width:28mm;background:#d1d5db;margin-bottom:1.5mm}
.sig-lb{font-size:5.5pt;color:#9ca3af;letter-spacing:.18em;text-transform:uppercase}
.dl2{font-size:5.5pt;color:#9ca3af;letter-spacing:.16em;text-transform:uppercase;margin-bottom:1mm;text-align:right}
.dv{font-size:8.5pt;font-weight:600;color:#1a1063;margin-bottom:2mm;text-align:right}
.vb{display:flex;align-items:center;justify-content:flex-end;gap:4px}
.vd{width:5px;height:5px;border-radius:50%;background:#10b981}
.vt{font-size:5.5pt;font-weight:600;color:#059669;letter-spacing:.08em}
</style></head><body>
<div class="cert">
  <div class="frame-a"></div><div class="frame-b"></div>
  <svg style="position:absolute;top:5.5mm;left:5.5mm" width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M1 17L1 1L17 1" stroke="#c8a951" stroke-width="1.2" opacity=".85"/><circle cx="1" cy="1" r="1.8" fill="#c8a951" opacity=".9"/></svg>
  <svg style="position:absolute;top:5.5mm;right:5.5mm;transform:rotate(90deg)" width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M1 17L1 1L17 1" stroke="#c8a951" stroke-width="1.2" opacity=".85"/><circle cx="1" cy="1" r="1.8" fill="#c8a951" opacity=".9"/></svg>
  <svg style="position:absolute;bottom:5.5mm;left:5.5mm;transform:rotate(-90deg)" width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M1 17L1 1L17 1" stroke="#c8a951" stroke-width="1.2" opacity=".85"/><circle cx="1" cy="1" r="1.8" fill="#c8a951" opacity=".9"/></svg>
  <svg style="position:absolute;bottom:5.5mm;right:5.5mm;transform:rotate(180deg)" width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M1 17L1 1L17 1" stroke="#c8a951" stroke-width="1.2" opacity=".85"/><circle cx="1" cy="1" r="1.8" fill="#c8a951" opacity=".9"/></svg>
  <div class="lp">
    <svg style="position:absolute;inset:0;width:100%;height:100%;opacity:.055"><defs><pattern id="dp" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r=".7" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#dp)"/></svg>
    <div style="position:absolute;top:15%;left:50%;transform:translateX(-50%);width:55%;padding-bottom:55%;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 70%)"></div>
    <div class="seal-outer">
      <svg style="position:absolute;inset:-1px;width:calc(100% + 2px);height:calc(100% + 2px)" viewBox="0 0 100 100">${ticks}</svg>
      <div class="seal-inner"><div class="st">INTERN</div><div class="si">IA</div><div class="st">ADDA</div></div>
    </div>
    <div class="bn">InternAdda Academy</div>
    <div class="bs">MSME · Govt. of India</div>
    <div class="div"><div class="dl"></div><div class="dd"></div><div class="dl"></div></div>
    <div class="cid">CERT ID: ${certId}</div>
  </div>
  <div class="rp">
    <div class="coh"><div class="cl"></div><div class="clabel">Certificate of Completion</div><div class="cl"></div></div>
    <div class="ct">This certifies that</div>
    <div class="name">${userName}</div>
    <div class="gb"><div class="gbm"></div><div class="gbs"></div></div>
    <div class="ctext">has successfully completed</div>
    <div class="ctitle">${courseTitle}</div>
    <div class="br">
      <div><div class="sig-t">InternAdda</div><div class="sig-l"></div><div class="sig-lb">Authorised Signatory</div></div>
      <div><div class="dl2">Issue Date</div><div class="dv">${date}</div><div class="vb"><div class="vd"></div><div class="vt">Digitally Verified</div></div></div>
    </div>
  </div>
</div>
</body></html>`
}

// ─── Certificate Modal ────────────────────────────────────────────────────────

function CertificateModal({ course, userName, onClose }: { course: any; userName: string; onClose: () => void }) {
  const date   = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })
  const certId = 'IA-' + [...(userName+course.title)].reduce((a,c)=>(a*31+c.charCodeAt(0))&0xffffff,0).toString(16).toUpperCase().padStart(6,'0')

  const handleDownload = () => {
    const html = buildCertHTML(userName, course.title, date, certId)
    const w = window.open('','_blank','width=1100,height=820')
    if (!w) return
    w.document.write(html)
    w.document.close()
    setTimeout(() => { w.focus(); w.print() }, 1400)
  }

  const handleLinkedIn = () => {
    const text = `🎓 Just completed "${course.title}" on InternAdda Academy! Proud to add this to my profile.\n#InternAdda #Learning #Certificate`
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.internadda.com/courses')}&summary=${encodeURIComponent(text)}`,'_blank')
  }

  // Preview cert inline using the same visual language as the print version
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale:0.86, y:40, opacity:0 }} animate={{ scale:1, y:0, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
        transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
        className="w-full max-w-3xl"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Visual preview ── */}
        <div style={{ position:'relative', width:'100%', aspectRatio:'297/210', background:'#fff', overflow:'hidden', boxShadow:'0 40px 100px rgba(0,0,0,0.6)' }}>

          {/* Frames */}
          <div style={{ position:'absolute', inset:'2.7%', border:'1px solid rgba(200,169,81,.45)', pointerEvents:'none', zIndex:10 }}/>
          <div style={{ position:'absolute', inset:'3.7%', border:'1px solid rgba(200,169,81,.18)', pointerEvents:'none', zIndex:10 }}/>

          {/* Corners */}
          {([['1.8%','1.8%','0'],['1.8%','auto','90'],['auto','1.8%','-90'],['auto','auto','180']] as [string,string,string][]).map(([t,l,rot],idx)=>(
            <svg key={idx} style={{ position:'absolute', top:t==='auto'?'auto':'1.8%', bottom:t==='auto'?'1.8%':'auto', left:l==='auto'?'auto':'1.8%', right:l==='auto'?'1.8%':'auto', transform:`rotate(${rot}deg)`, zIndex:11, width:'3%' }} viewBox="0 0 18 18" fill="none">
              <path d="M1 17L1 1L17 1" stroke="#c8a951" strokeWidth="1.2" opacity=".85"/>
              <circle cx="1" cy="1" r="1.8" fill="#c8a951" opacity=".9"/>
            </svg>
          ))}

          {/* Left panel */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'38%', background:'linear-gradient(160deg,#080618 0%,#1a1063 55%,#0f1a5c 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'4% 6%' }}>
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.055 }}>
              <defs><pattern id="dp3" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r=".7" fill="white"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#dp3)"/>
            </svg>
            <div style={{ position:'absolute', top:'15%', left:'50%', transform:'translateX(-50%)', width:'55%', paddingBottom:'55%', borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 70%)' }}/>
            {/* Seal */}
            <svg viewBox="0 0 100 100" style={{ width:'30%', marginBottom:'6%' }}>
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c8a951" strokeWidth="1.2" opacity=".75"/>
              <circle cx="50" cy="50" r="38" fill="none" stroke="#c8a951" strokeWidth=".6" opacity=".35"/>
              <circle cx="50" cy="50" r="30" fill="rgba(200,169,81,.1)"/>
              {Array.from({length:12},(_,idx)=>{const a=(idx*30-90)*Math.PI/180;return<line key={idx} x1={50+39*Math.cos(a)} y1={50+39*Math.sin(a)} x2={50+44*Math.cos(a)} y2={50+44*Math.sin(a)} stroke="#c8a951" strokeWidth="1" opacity=".55"/>})}
              <text x="50" y="42" textAnchor="middle" fontFamily="serif" fontSize="6.5" fill="#c8a951" fontWeight="600" letterSpacing="2">INTERN</text>
              <text x="50" y="56" textAnchor="middle" fontFamily="serif" fontSize="16" fill="#c8a951" fontWeight="700">IA</text>
              <text x="50" y="67" textAnchor="middle" fontFamily="serif" fontSize="6.5" fill="#c8a951" fontWeight="600" letterSpacing="2">ADDA</text>
            </svg>
            <p style={{ fontSize:'.55em', fontWeight:600, color:'rgba(255,255,255,.4)', letterSpacing:'.22em', textTransform:'uppercase', marginBottom:'1.5%' }}>InternAdda Academy</p>
            <p style={{ fontSize:'.5em', color:'rgba(255,255,255,.22)', letterSpacing:'.12em' }}>MSME · Govt. of India</p>
            <div style={{ display:'flex', alignItems:'center', gap:'3%', margin:'5% 0 4%', opacity:.28 }}>
              <div style={{ height:1, width:'18%', background:'#c8a951' }}/>
              <div style={{ width:4, height:4, borderRadius:'50%', background:'#c8a951' }}/>
              <div style={{ height:1, width:'18%', background:'#c8a951' }}/>
            </div>
            <p style={{ fontSize:'.45em', color:'rgba(255,255,255,.18)', letterSpacing:'.08em' }}>CERT ID: {certId}</p>
          </div>

          {/* Right panel */}
          <div style={{ position:'absolute', left:'38%', right:0, top:0, bottom:0, background:'#fff', display:'flex', flexDirection:'column', justifyContent:'center', padding:'4% 5% 4% 4%' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'2%', marginBottom:'4%' }}>
              <div style={{ height:.5, flex:1, background:'rgba(200,169,81,.35)' }}/>
              <span style={{ fontSize:'.52em', fontWeight:600, color:'#c8a951', letterSpacing:'.26em', textTransform:'uppercase', whiteSpace:'nowrap' }}>Certificate of Completion</span>
              <div style={{ height:.5, flex:1, background:'rgba(200,169,81,.35)' }}/>
            </div>
            <p style={{ fontSize:'.6em', color:'#9ca3af', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:'1.5%' }}>This certifies that</p>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'2.2em', fontWeight:700, color:'#0a0820', lineHeight:1.05, marginBottom:'2%' }}>{userName}</h2>
            <div style={{ display:'flex', gap:4, marginBottom:'4%' }}>
              <div style={{ height:2.5, width:'12%', borderRadius:99, background:'#c8a951' }}/>
              <div style={{ height:2.5, width:'4%', borderRadius:99, background:'rgba(200,169,81,.35)' }}/>
            </div>
            <p style={{ fontSize:'.6em', color:'#9ca3af', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'2%' }}>has successfully completed</p>
            <h3 style={{ fontFamily:'Georgia,serif', fontSize:'1.15em', fontWeight:600, color:'#1a1063', lineHeight:1.25, marginBottom:'6%' }}>{course.title}</h3>
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontFamily:'Georgia,serif', fontStyle:'italic', fontSize:'1.05em', color:'#1a1063', opacity:.85, marginBottom:'2%', lineHeight:1 }}>InternAdda</div>
                <div style={{ height:.5, width:'70%', background:'#d1d5db', marginBottom:'2%' }}/>
                <p style={{ fontSize:'.5em', color:'#9ca3af', letterSpacing:'.16em', textTransform:'uppercase' }}>Authorised Signatory</p>
              </div>
              <div style={{ textAlign:'right' }}>
                <p style={{ fontSize:'.5em', color:'#9ca3af', letterSpacing:'.16em', textTransform:'uppercase', marginBottom:'1.5%' }}>Issue Date</p>
                <p style={{ fontSize:'.7em', fontWeight:600, color:'#1a1063', marginBottom:'2%' }}>{date}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:4 }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:'#10b981' }}/>
                  <span style={{ fontSize:'.5em', fontWeight:600, color:'#059669', letterSpacing:'.08em' }}>Digitally Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <Button onClick={handleDownload} className="flex-1 bg-[#1a1063] hover:bg-indigo-900 text-white font-semibold rounded-xl h-11 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40">
            <Download size={15}/> Download / Print
          </Button>
          <button onClick={handleLinkedIn} className="h-11 px-4 bg-[#0077b5] hover:bg-[#006097] text-white rounded-xl flex items-center gap-2 text-sm font-semibold transition-colors shadow-lg">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            Share on LinkedIn
          </button>
          <button onClick={onClose} className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white border border-white/15 transition-colors">
            <X size={16}/>
          </button>
        </div>
        <p className="text-center text-white/25 text-[11px] mt-3 tracking-wide">Share your achievement and inspire others to learn 🎓</p>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CoursePage() {
  const params   = useParams()
  const router   = useRouter()
  const { user } = useAuth()

  const courseId   = parseInt(params?.id as string)
  const course     = courses.find(c => c.id === courseId)
  const allLessons = course?.modules.flatMap(m => m.lessons) ?? []
  const totalLessons = allLessons.length

  const [completedIds,    setCompletedIds]    = useState<Set<string>>(new Set())
  const [activeLessonId,  setActiveLessonId]  = useState(allLessons[0]?.id ?? '')
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(course?.modules.map(m=>m.id)??[]))
  const [showCert,        setShowCert]        = useState(false)
  const [sidebarOpen,     setSidebarOpen]     = useState(false)
  const [direction,       setDirection]       = useState(1)

  useEffect(() => {
    if (user === null) router.replace(`/auth/signin?callbackUrl=/courses/${courseId}`)
  }, [user, courseId, router])

  // Scroll to top of window on lesson change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [activeLessonId])

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><BookOpen size={24} className="text-gray-400"/></div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Course not found</h2>
        <p className="text-gray-500 text-sm mb-5">This course doesn't exist or has been removed.</p>
        <Link href="/courses"><Button className="bg-[#1a1063] text-white rounded-xl">Browse all courses</Button></Link>
      </div>
    </div>
  )

  if (!user) return null

  const activeLesson      = allLessons.find(l=>l.id===activeLessonId) ?? allLessons[0]
  const activeLessonIndex = allLessons.findIndex(l=>l.id===activeLessonId)
  const completedCount    = completedIds.size
  const progress          = Math.round((completedCount/totalLessons)*100)
  const allDone           = completedCount === totalLessons
  const userName          = (user as any)?.user_metadata?.full_name || 'Student'

  const markComplete = useCallback(() => {
    setCompletedIds(prev => new Set([...prev, activeLessonId]))
  }, [activeLessonId])

  const goNext = useCallback(() => {
    markComplete()
    if (activeLessonIndex < allLessons.length-1) { setDirection(1); setActiveLessonId(allLessons[activeLessonIndex+1].id) }
  }, [markComplete, activeLessonIndex, allLessons])

  const goPrev = useCallback(() => {
    if (activeLessonIndex > 0) { setDirection(-1); setActiveLessonId(allLessons[activeLessonIndex-1].id) }
  }, [activeLessonIndex, allLessons])

  const toggleModule = (id: string) => setExpandedModules(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n })

  const selectLesson = (id: string) => {
    const newIdx = allLessons.findIndex(l=>l.id===id)
    setDirection(newIdx >= activeLessonIndex ? 1 : -1)
    setActiveLessonId(id)
    setSidebarOpen(false)
  }

  // ── Sidebar ───────────────────────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{course.category}</p>
        <h2 className="text-sm font-semibold text-gray-900 leading-snug mb-3">{course.title}</h2>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><BookOpen size={11}/>{totalLessons} lessons</span>
          <span className="flex items-center gap-1"><Clock size={11}/>{course.duration}</span>
        </div>
        <div>
          <div className="flex justify-between text-[10px] font-medium mb-1">
            <span className="text-gray-400">{completedCount}/{totalLessons} completed</span>
            <span className="text-indigo-600 font-semibold">{progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-indigo-600 rounded-full" animate={{ width:`${progress}%` }} transition={{ duration:0.5, ease:'easeOut' }}/>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {course.modules.map((mod, mi) => {
          const isExp   = expandedModules.has(mod.id)
          const modDone = mod.lessons.filter(l=>completedIds.has(l.id)).length
          return (
            <div key={mod.id} className="border-b border-gray-100 last:border-0">
              <button onClick={()=>toggleModule(mod.id)} className="w-full flex items-start justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors text-left">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Module {mi+1}</p>
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{mod.title}</p>
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-shrink-0 ml-3">
                  <span className="text-[10px] text-gray-400">{modDone}/{mod.lessons.length}</span>
                  <ChevronDown size={13} className={`text-gray-400 transition-transform flex-shrink-0 ${isExp?'rotate-180':''}`}/>
                </div>
              </button>
              <AnimatePresence>
                {isExp && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }} className="overflow-hidden">
                    {mod.lessons.map(lesson => {
                      const isDone   = completedIds.has(lesson.id)
                      const isActive = lesson.id === activeLessonId
                      return (
                        <button key={lesson.id} onClick={()=>selectLesson(lesson.id)}
                          className={`w-full flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0 text-left transition-all ${isActive?'bg-indigo-50 border-l-2 border-l-indigo-500':'hover:bg-gray-50/80'}`}
                        >
                          {isDone ? <CheckCircle size={14} className="text-emerald-500 flex-shrink-0"/> : <Circle size={14} className={`flex-shrink-0 ${isActive?'text-indigo-400':'text-gray-200'}`}/>}
                          <div className="min-w-0 flex-1">
                            <p className={`text-[12px] leading-snug truncate ${isActive?'font-semibold text-indigo-700':isDone?'text-gray-400 line-through':'text-gray-700'}`}>{lesson.title}</p>
                            <div className="flex items-center gap-1.5 mt-0.5"><LessonTypeIcon type={lesson.type}/><span className="text-[10px] text-gray-400">{lesson.duration}</span></div>
                          </div>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )

  // Lesson animation variants — slides from bottom on next, top on prev
  const lessonVariants = {
    enter:  (dir: number) => ({ opacity:0, y: dir>0 ? 32 : -32, scale:0.975 }),
    center: { opacity:1, y:0, scale:1 },
    exit:   (dir: number) => ({ opacity:0, y: dir>0 ? -22 : 22, scale:0.975 }),
  }

  return (
    <>
      {/* ── Slim distraction-free top bar ─────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/96 backdrop-blur-md border-b border-gray-200/80" style={{ boxShadow:'0 1px 16px rgba(0,0,0,0.07)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-14">

            {/* IA logo + back */}
            <Link href="/courses" className="flex items-center gap-1.5 flex-shrink-0 group">
              <div className="w-8 h-8 bg-[#1a1063] rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-800 transition-colors">
                <span className="text-white text-[10px] font-bold tracking-wide leading-none">IA</span>
              </div>
              <ChevronLeft size={13} className="text-gray-400 group-hover:text-gray-700 transition-colors"/>
            </Link>

            <div className="hidden sm:block w-px h-4 bg-gray-200 flex-shrink-0"/>

            {/* Course title — desktop only */}
            <p className="hidden sm:block text-xs font-semibold text-gray-600 truncate flex-shrink min-w-0 max-w-[260px] lg:max-w-[360px]">{course.title}</p>

            {/* Progress bar — fills space */}
            <div className="flex-1 flex items-center gap-2.5 min-w-0">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background:'linear-gradient(90deg,#818cf8,#1a1063)' }}
                  animate={{ width:`${progress}%` }}
                  transition={{ duration:0.55, ease:'easeOut' }}
                />
              </div>
              <span className="text-[11px] font-bold text-indigo-600 flex-shrink-0 tabular-nums w-8 text-right">{progress}%</span>
            </div>

            {/* Certificate — desktop badge */}
            {allDone && (
              <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:'spring', stiffness:280, damping:20 }}>
                <Button onClick={()=>setShowCert(true)} className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-xl px-3 h-8 items-center gap-1.5 flex-shrink-0 shadow-sm">
                  <Award size={12}/> Certificate
                </Button>
              </motion.div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={()=>setSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <Menu size={15}/>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer — slides from RIGHT, progress at top ────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm lg:hidden" onClick={()=>setSidebarOpen(false)}/>
            <motion.div
              initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
              transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
              className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header — dark navy, progress inside */}
              <div className="bg-[#1a1063] px-5 py-4 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/15 rounded-md flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">IA</span>
                    </div>
                    <span className="text-white/70 text-[10px] font-semibold tracking-widest uppercase">Course Contents</span>
                  </div>
                  <button onClick={()=>setSidebarOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <X size={14} className="text-white"/>
                  </button>
                </div>
                {/* Progress bar in drawer */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white/50 text-[10px]">{completedCount} of {totalLessons} done</span>
                    <span className="text-white text-[10px] font-bold">{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-white rounded-full" animate={{ width:`${progress}%` }} transition={{ duration:0.5 }}/>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden"><SidebarContent/></div>
              {allDone && (
                <div className="p-4 border-t border-gray-100 flex-shrink-0">
                  <Button onClick={()=>{ setSidebarOpen(false); setTimeout(()=>setShowCert(true),200) }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 flex items-center justify-center gap-2 font-semibold">
                    <Award size={15}/> Claim Your Certificate
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main layout ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">

          {/* Desktop sidebar */}
          <aside className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden sticky top-[4.5rem] max-h-[calc(100vh-5.5rem)]" style={{ boxShadow:'0 2px 16px rgba(0,0,0,0.06)' }}>
              <SidebarContent/>
            </div>
          </aside>

          {/* ── Lesson content ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeLessonId}
                custom={direction}
                variants={lessonVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration:0.38, ease:[0.22,1,0.36,1] }}
              >
                {/* Lesson header */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-5" style={{ boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <LessonTypeIcon type={activeLesson.type}/>
                      <span className="text-xs text-gray-500 capitalize">{activeLesson.type}</span>
                    </div>
                    <span className="text-gray-200 text-xs">·</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11}/>{activeLesson.duration}</span>
                    {completedIds.has(activeLessonId) && (
                      <span className="ml-auto flex items-center gap-1 text-xs text-emerald-600 font-medium"><CheckCircle size={13}/> Completed</span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{activeLesson.title}</h1>
                </div>

                {/* Lesson body */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-5" style={{ boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}>
                  <ContentRenderer content={activeLesson.content}/>
                  {activeLesson.codeExample && (
                    <div className="mt-8 rounded-2xl overflow-hidden border border-gray-800/50 shadow-lg">
                      <div className="flex items-center justify-between bg-indigo-600 px-5 py-2.5">
                        <div className="flex items-center gap-2"><Code size={14} className="text-indigo-200"/><span className="text-white text-xs font-semibold">Try it yourself</span></div>
                        <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-amber-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70"/></div>
                      </div>
                      <pre className="bg-[#0d1117] text-[#e6edf3] text-[13px] font-mono leading-[1.7] p-5 sm:p-6 overflow-x-auto"><code>{activeLesson.codeExample}</code></pre>
                    </div>
                  )}
                </div>

                {/* Nav footer */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-3" style={{ boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}>
                  <Button variant="outline" disabled={activeLessonIndex===0} onClick={goPrev} className="w-full sm:w-auto border-gray-200 text-gray-600 rounded-xl h-11 px-5 flex items-center justify-center gap-2 disabled:opacity-40">
                    <ChevronLeft size={15}/> Previous
                  </Button>
                  {!completedIds.has(activeLessonId) && (
                    <Button onClick={markComplete} variant="outline" className="w-full sm:flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl h-11 flex items-center justify-center gap-2">
                      <CheckCircle size={15}/> Mark as Complete
                    </Button>
                  )}
                  {activeLessonIndex < allLessons.length-1 ? (
                    <Button onClick={goNext} className="w-full sm:w-auto bg-[#1a1063] hover:bg-indigo-900 text-white rounded-xl h-11 px-6 flex items-center justify-center gap-2 shadow-sm shadow-indigo-900/20">
                      Next Lesson <ChevronRight size={15}/>
                    </Button>
                  ) : (
                    <Button onClick={()=>{ markComplete(); setTimeout(()=>setShowCert(true),200) }} className="w-full sm:w-auto flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 px-6 flex items-center justify-center gap-2">
                      <Award size={15}/> Finish & Get Certificate
                    </Button>
                  )}
                </div>

                {/* Completion banner */}
                {allDone && !showCert && (
                  <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                    className="mt-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0"><Award size={22} className="text-emerald-600"/></div>
                    <div className="text-center sm:text-left">
                      <p className="font-semibold text-emerald-800 text-sm">🎉 Course Complete!</p>
                      <p className="text-emerald-600 text-xs mt-0.5">You've finished all {totalLessons} lessons. Your certificate is ready!</p>
                    </div>
                    <Button onClick={()=>setShowCert(true)} className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-5 text-sm flex items-center gap-2 flex-shrink-0 shadow-sm">
                      <Award size={14}/> Claim Certificate
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Certificate modal */}
      <AnimatePresence>
        {showCert && <CertificateModal course={course} userName={userName} onClose={()=>setShowCert(false)}/>}
      </AnimatePresence>
    </>
  )
}
