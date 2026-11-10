import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useReducedMotion, easeInOut } from 'framer-motion'
import { septicStages } from '../data/content.js'

// Pipe paths traced over the 1374x762 cutaway illustration.
const PIPES = [
  { stage: 0, d: 'M397 206 L397 246 Q395 266 368 270 L330 278' },
  { stage: 0, d: 'M286 283 L436 330' },
  { stage: 2, d: 'M626 374 L800 414' },
  { stage: 3, d: 'M836 384 Q880 352 905 356 L1198 432' },
  { stage: 3, d: 'M852 437 L1126 506' },
  { stage: 3, d: 'M808 441 Q770 456 764 478 L762 500 L1050 592' },
]
const SEEP = [[960, 400], [1060, 425], [920, 470], [1030, 495], [860, 535], [960, 560], [1080, 470], [1150, 450]]

// Front faces of the two tank chambers (TL, TR, BR, BL) in image pixels.
const CHAMBERS = [
  { tl: [448, 352], tr: [512, 362], br: [514, 446], bl: [450, 430] }, // inlet side
  { tl: [522, 364], tr: [592, 380], br: [593, 461], bl: [523, 447] }, // outlet side
]
const MAX_FILL = 0.86
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const waterPoly = (c, f) => {
  const l = lerp(c.bl, c.tl, f * MAX_FILL), r = lerp(c.br, c.tr, f * MAX_FILL)
  return [c.bl, c.br, r, l].map(p => p.join(',')).join(' ')
}
const surface = (c, f) => {
  const l = lerp(c.bl, c.tl, f * MAX_FILL), r = lerp(c.br, c.tr, f * MAX_FILL)
  return `M${l.join(' ')} L${r.join(' ')}`
}

export default function SepticScroll({ id = 'how-it-works', headingLevel = 'h2' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Spring-smoothed progress: the camera glides instead of tracking every wheel tick.
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6, restDelta: 0.0005 })

  // Each stage gets a "hold" zone so the camera rests while you read,
  // then eases to the next stage.
  const n = septicStages.length
  const kf = []
  const vals = { s: [], x: [], y: [] }
  septicStages.forEach((s, i) => {
    const a = i === 0 ? 0 : i / n + 0.05
    const b = i === n - 1 ? 1 : (i + 1) / n - 0.05
    const x = (50 - s.focus.x) * clampFactor(s.zoom, s.focus.x)
    const y = (50 - s.focus.y) * clampFactor(s.zoom, s.focus.y)
    kf.push(a, b); vals.s.push(s.zoom, s.zoom); vals.x.push(x, x); vals.y.push(y, y)
  })
  const opt = { ease: easeInOut }
  const scale = useTransform(p, kf, vals.s, opt)
  const tx = useTransform(p, kf, vals.x, opt)
  const ty = useTransform(p, kf, vals.y, opt)
  const transform = useTransform([scale, tx, ty], ([s, x, y]) => `scale(${s}) translate(${x}%, ${y}%)`)
  const bar = useTransform(p, [0, 1], ['0%', '100%'])

  // Tank fill: inlet chamber fills during stage 2, then spills over the baffle.
  const f1 = useTransform(p, [0.14, 0.3], [0, 1], { clamp: true, ease: easeInOut })
  const f2 = useTransform(p, [0.27, 0.4], [0, 1], { clamp: true, ease: easeInOut })
  const poly1 = useTransform(f1, f => waterPoly(CHAMBERS[0], f))
  const poly2 = useTransform(f2, f => waterPoly(CHAMBERS[1], f))
  const surf1 = useTransform(f1, f => surface(CHAMBERS[0], f))
  const surf2 = useTransform(f2, f => surface(CHAMBERS[1], f))
  const tankOpacity = useTransform(f1, [0, 0.05], [0, 1])
  const spill = useTransform(p, [0.26, 0.29, 0.38, 0.42], [0, 1, 1, 0])

  useMotionValueEvent(scrollYProgress, 'change', v => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))))

  const H = headingLevel
  const stage = septicStages[active]
  if (reduce) return <StaticVersion H={H} id={id} />

  return (
    <section className="sscroll" id={id} ref={ref} style={{ height: `${n * 95 + 40}vh` }} aria-labelledby={`${id}-title`}>
      <div className="sscroll__sticky">
        <div className="sscroll__layout">
          <div className="sscroll__copy">
            <p className="eyebrow">Inside your yard</p>
            <H id={`${id}-title`} className="sscroll__title">How a septic system works</H>
            <div className="sscroll__progress"><motion.span style={{ width: bar }} /></div>
            <ol className="sscroll__steps">
              {septicStages.map((s, i) => (
                <li key={s.n} className={i === active ? 'is-active' : i < active ? 'is-done' : ''}>
                  <span className="sscroll__num">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <div className="sscroll__body">
                      <p>{s.text}</p>
                      <p className="sscroll__tip">⚠ {s.tip}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="sscroll__hint" aria-hidden="true">Keep scrolling ↓</p>
          </div>

          <div className="sscroll__frame" aria-hidden="true">
            <motion.div className="sscroll__cam" style={{ transform }}>
              <img src="/images/how-a-septic-system-works.webp" alt="" width="1374" height="762" />
              <svg viewBox="0 0 1374 762" preserveAspectRatio="xMidYMid slice" className="sscroll__pipes">
                <defs>
                  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#8fdcff" stopOpacity=".55" />
                    <stop offset=".6" stopColor="#3a9fd6" stopOpacity=".5" />
                    <stop offset="1" stopColor="#5a4326" stopOpacity=".75" />
                  </linearGradient>
                </defs>
                <motion.g style={{ opacity: tankOpacity }}>
                  <motion.polygon points={poly1} fill="url(#water)" />
                  <motion.polygon points={poly2} fill="url(#water)" />
                  <motion.path d={surf1} className="tank-surface" />
                  <motion.path d={surf2} className="tank-surface" />
                </motion.g>
                <motion.path d="M512 372 Q518 368 522 376" className="tank-spill" style={{ opacity: spill }} />
                {PIPES.map((pp, i) => (
                  <g key={i} className={pp.stage <= active ? 'on' : ''}>
                    <path d={pp.d} className="pipe-glow" />
                    <path d={pp.d} className="pipe-flow" />
                  </g>
                ))}
                <g className={active >= 4 ? 'seep on' : 'seep'}>
                  {SEEP.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" style={{ animationDelay: `${i * 0.25}s` }} />)}
                </g>
              </svg>
            </motion.div>
            <div className="sscroll__badge" key={stage.n}>
              <span>{stage.n}</span>{stage.title}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Keep the zoomed image from sliding past its own edge.
function clampFactor(zoom, focus) {
  const max = (1 - 1 / zoom) / 2 * 100
  const want = Math.abs(50 - focus)
  return want === 0 ? 1 : Math.min(1, max / want)
}

function StaticVersion({ H, id }) {
  return (
    <section className="section" id={id}>
      <div className="container">
        <p className="eyebrow">Inside your yard</p>
        <H className="section__title">How a septic system works</H>
        <img className="rounded" src="/images/how-a-septic-system-works.webp" width="1374" height="762" loading="lazy"
          alt="Cutaway diagram of a septic system: house, main sewer line, two-chamber septic tank with baffles, distribution box and drain field trenches over soil layers" />
        <ol className="static-steps">
          {septicStages.map(s => <li key={s.n}><h3>{s.n}. {s.title}</h3><p>{s.text}</p></li>)}
        </ol>
      </div>
    </section>
  )
}
