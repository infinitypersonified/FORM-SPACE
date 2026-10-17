import { ArrowUpRight } from 'lucide-react'
import { studioNotes } from '../data/projects.js'

export default function Studio() {
  return (
    <section className="studio section-shell section-pad" id="studio">
      <div className="studio__intro">
        
        <div className="studio__statement"><h2>Architecture is not just what we <em>make.</em></h2><p>It is what a place makes possible.</p></div>
      </div>
      <div className="studio__body">
        <div className="studio__image"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="A quiet architectural interior with daylight falling across natural surfaces" loading="lazy" /><span className="studio__image-caption">LIGHT IS A MATERIAL, TOO.</span></div>
        <div className="studio__copy"><span className="eyebrow">A little about us</span><p className="studio__lead">FORM / SPACE is an independent architecture and spatial design studio working across West Africa and beyond.</p><p>We bring architecture, landscape and interior thinking into one conversation. Our process is curious, collaborative and grounded in the everyday: how people arrive, gather, pause, work and grow.</p><p>We believe good design should be felt before it needs to be explained. It should belong to its place, age with grace and make daily life a little more generous.</p><a className="underlined-link" href="#contact">Tell us what you're imagining <ArrowUpRight size={15} /></a></div>
      </div>
    </section>
  )
}

export function Approach() {
  return (
    <section className="approach section-shell section-pad" id="approach">
      <div className="section-heading section-heading--approach"><div><span className="eyebrow">03 / Our point of view</span><h2>Less noise.<br /><em>More meaning.</em></h2></div><p>We keep returning to three principles. Not as rules, but as a way to stay honest about the work.</p></div>
      <div className="approach__list">{studioNotes.map((note) => <article className="approach__item" key={note.number}><span className="approach__number">{note.number}</span><h3>{note.title}</h3><p>{note.body}</p><span className="approach__cross" aria-hidden="true">+</span></article>)}</div>
    </section>
  )
}
