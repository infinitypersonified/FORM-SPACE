import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects.js'

export default function Work({ onSelect }) {
  return (
    <section className="work section-shell section-pad" id="work">
      <div className="section-heading">
        <div><span className="eyebrow">01 / Selected work</span><h2>Made to <em>matter.</em></h2></div>
        <p>A small collection of places, each shaped by its own people, conditions and possibilities.</p>
      </div>
      <div className="work__grid">
        {projects.map((project, index) => (
          <button className={`project-card project-card--${index + 1}`} key={project.id} type="button" onClick={() => onSelect(project)} aria-label={`View ${project.title} project`}>
            <span className="project-card__image-wrap"><img src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project-card__view">View project <ArrowUpRight size={16} /></span><span className="project-card__index">{project.id}</span></span>
            <span className="project-card__info"><span><strong>{project.title}</strong><small>{project.type} / {project.location}</small></span><span className="project-card__year">{project.year}</span></span>
          </button>
        ))}
      </div>
      <div className="work__closing"><span>Every project begins with a better question.</span><a href="#contact">Have one for us? <ArrowUpRight size={15} /></a></div>
    </section>
  )
}
