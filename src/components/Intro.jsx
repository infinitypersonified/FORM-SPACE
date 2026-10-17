import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../motion/useReducedMotion.js'

export default function Intro({ onComplete }) {
  const introRef = useRef(null)
  const svgRef = useRef(null)
  const wordRef = useRef(null)
  const metaRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem('form-space-intro-seen') } catch { return true }
  })

  useEffect(() => {
    if (!visible) {
      onComplete()
      return
    }
    if (reducedMotion) {
      finish()
      return
    }

    const root = introRef.current
    const lines = svgRef.current?.querySelectorAll('.plan-line')
    const context = gsap.context(() => {
      gsap.set(lines, {
        strokeDasharray: (_, target) => target.getTotalLength(),
        strokeDashoffset: (_, target) => target.getTotalLength(),
      })
      gsap.set(wordRef.current, { yPercent: 110, opacity: 0 })
      gsap.set(metaRef.current, { opacity: 0, y: 8 })
      const timeline = gsap.timeline({
        onComplete: () => {
          try { sessionStorage.setItem('form-space-intro-seen', '1') } catch {}
          onComplete()
          gsap.to(root, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete: () => setVisible(false),
          })
        },
      })
      timeline
        .to(lines, { strokeDashoffset: 0, duration: 1.15, stagger: 0.09, ease: 'power2.inOut' })
        .to(wordRef.current, { yPercent: 0, opacity: 1, duration: 0.62, ease: 'power3.out' }, '-=0.25')
        .to(metaRef.current, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }, '-=0.18')
    }, root)
    return () => context.revert()
  }, [visible, reducedMotion, onComplete])

  function finish() {
    try { sessionStorage.setItem('form-space-intro-seen', '1') } catch {}
    onComplete()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="intro" ref={introRef} role="presentation">
      <div className="intro__top"><span>INDEPENDENT ARCHITECTURE STUDIO</span><span>EST. 2018 / WEST AFRICA</span></div>
      <div className="intro__drawing" aria-hidden="true">
        <svg ref={svgRef} viewBox="0 0 460 350" fill="none">
          <path className="plan-line" d="M43 39H263V95H417V308H207V260H43V39Z" />
          <path className="plan-line" d="M43 103H154V39M154 103V198H207V260M154 198H96V308M263 39V157H337V95M263 157H417M337 157V228H417M207 228H337M263 228V308" />
          <path className="plan-line" d="M96 103V198M96 198H154M337 228V308M207 95H263M43 260H96" />
          <path className="plan-line plan-line--fine" d="M22 39H36M43 18V32M263 18V32M417 68V82M438 308H424M207 329V315M22 260H36" />
          <circle className="plan-line" cx="263" cy="157" r="6" />
        </svg>
      </div>
      <div className="intro__bottom">
        <div className="intro__word-clip"><p ref={wordRef}>FORM <i>/</i> SPACE</p></div>
        <div className="intro__meta" ref={metaRef}><span>SPACE, CONSIDERED.</span><span>01 — 04</span></div>
      </div>
      <button className="intro__skip" onClick={finish} type="button">Skip intro <span aria-hidden="true">↗</span></button>
    </div>
  )
}
