import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../motion/useReducedMotion.js'

export default function Hero({ ready }) {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!ready || reducedMotion || !sectionRef.current) return
    const root = sectionRef.current
    const context = gsap.context(() => {
      gsap.fromTo('.hero__eyebrow, .hero__title-line, .hero__description, .hero__actions, .hero__side-note',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, ease: 'power3.out', delay: 0.12 },
      )
      gsap.fromTo('.hero__photo-frame', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.25, ease: 'power4.inOut', delay: 0.2 })
      gsap.fromTo('.hero__photo', { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'power2.out', delay: 0.2 })
    }, root)
    return () => context.revert()
  }, [ready, reducedMotion])

  return (
    <section className="hero section-shell" id="top" ref={sectionRef}>
      <div className="hero__topline"><span className="eyebrow hero__eyebrow">Architecture / Spatial design / Objects</span><span className="hero__coordinates">06° 27′ N&nbsp; / &nbsp;03° 24′ E</span></div>
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__title-wrap">
            <h1 className="hero__title">
              <span className="hero__title-line">Space for</span>
              <span className="hero__title-line hero__title-line--serif">the way <em>we</em></span>
              <span className="hero__title-line">live<span className="hero__period">.</span></span>
            </h1>
          </div>
          <p className="hero__description">We design places that feel inevitable. Quietly bold architecture, grounded in context and made for real life.</p>
          <div className="hero__actions"><a className="button button--dark" href="#work">Explore selected work <ArrowUpRight size={15} strokeWidth={1.5} /></a><a className="hero__text-link" href="#studio">Meet the studio <span>↗</span></a></div>
          <div className="hero__side-note"><span className="hero__side-rule" /><span>DESIGNING WITH<br />INTENTION SINCE 2018</span></div>
        </div>
        <div className="hero__visual">
          <div className="hero__photo-frame">
            <img className="hero__photo" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90" alt="Sunlit modern architecture with a sculptural concrete stair and warm natural materials" fetchPriority="high" />
            <div className="hero__photo-label"><span>FIG. 001</span><span>HOUSE IN THE FOLD / 2025</span></div>
          </div>
          <div className="hero__image-index">01 <span>/</span> 04</div>
        </div>
      </div>
      <a className="hero__scroll" href="#work"><span>Scroll to explore</span><ArrowDown size={15} strokeWidth={1.4} /></a>
      <div className="hero__bottomline"><span>INDEPENDENT BY DESIGN.</span><span>LAGOS · WORKING EVERYWHERE</span></div>
    </section>
  )
}
