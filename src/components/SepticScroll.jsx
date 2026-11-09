import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { septicStages } from '../data/content.js'

// Pipe paths traced over the 1374x762 cutaway illustration. Water "flows"
// along them as you scroll; each lights up when its stage is active.
const PIPES = [
  { stage: 0, d: 'M397 206 L397 246 Q395 266 368 270 L330 278' },
  { stage: 0, d: 'M286 283 L436 330' },
  { stage: 2, d: 'M626 374 L800 414' },
  { stage: 3, d: 'M836 384 Q880 352 905 356 L1198 432' },
  { stage: 3, d: 'M852 437 L1126 506' },
  { stage: 3, d: 'M808 441 Q770 456 764 478 L762 500 L1050 592' },
]
const SEEP = [[960, 400], [1060, 425], [920, 470], [1030, 495], [860, 535], [960, 560], [1080, 470], [1150, 450]]

export default function SepticScroll({ id = 'how-it-works', headingLevel = 'h2' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const n = septicStages.length
  const stops = septicStages.map((_, i) => (i + 0.5) / n)
  const kf = [0, ...stops, 1]
  const val = fn => [fn(septicStages[0]), ...septicStages.map(fn), fn(septicStages[n - 1])]
  const scale = useTransform(scrollYProgress, kf, val(s => s.zoom))
  const tx = useTransform(scrollYProgress, kf, val(s => (50 - s.focus.x) * clampFactor(s.zoom, s.focus.x)))
  const ty = useTransform(scrollYProgress, kf, val(s => (50 - s.focus.y) * clampFactor(s.zoom, s.focus.y)))
  const transform = useTransform([scale, tx, ty], ([s, x, y]) => `scale(${s}) translate(${x}%, ${y}%)`)
  const flow = useTransform(scrollYProgress, [0, 1], [0, -900])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', v => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))))

  const H = headingLevel
  const stage = septicStages[active]

  // Reduced motion / no-JS fallback: a plain illustrated list (also what crawlers read).
  if (reduce) return <StaticVersion H={H} id={id} />

  return (
    <section className="sscroll" id={id} ref={ref} style={{ height: `${n * 85 + 40}vh` }} aria-labelledby={`${id}-title`}>
      <div className="sscroll__sticky">
        <div className="container sscroll__layout">
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
                    <p>{s.text}</p>
                    <p className="sscroll__tip">⚠ {s.tip}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="sscroll__hint" aria-hidden="true">Keep scrolling ↓</p>
          </div>

          <div className="sscroll__frame" aria-hidden="true">
            <motion.div className="sscroll__cam" style={{ transform }}>
              <img src="/images/how-a-septic-system-works.webp" alt="" width="1374" height="762" />
              <svg viewBox="0 0 1374 762" className="sscroll__pipes">
                {PIPES.map((p, i) => (
                  <g key={i} className={p.stage <= active ? 'on' : ''}>
                    <path d={p.d} className="pipe-glow" />
                    <motion.path d={p.d} className="pipe-flow" style={{ strokeDashoffset: flow }} />
                  </g>
                ))}
                <g className={active >= 4 ? 'seep on' : 'seep'}>
                  {SEEP.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" style={{ animationDelay: `${i * 0.25}s` }} />)}
                </g>
              </svg>
            </motion.div>
            <div className="sscroll__badge">
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
