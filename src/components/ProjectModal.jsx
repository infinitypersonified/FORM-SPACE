import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react'

export default function ProjectModal({ project, onClose, onNext }) {
  useEffect(() => {
    if (!project) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button className="project-modal__backdrop" type="button" aria-label="Close project details" onClick={onClose} />
      <article className="project-modal__panel">
        <div className="project-modal__bar"><span>PROJECT FILE / {project.id}</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close"><X size={19} /></button></div>
        <div className="project-modal__image"><img src={project.image} alt={project.imageAlt} /></div>
        <div className="project-modal__content">
          <div className="project-modal__eyebrow">{project.type} <span>·</span> {project.location} <span>·</span> {project.year}</div>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className="project-modal__lead">{project.summary}</p>
          <div className="project-modal__details"><p>{project.detail}</p><dl><div><dt>Area</dt><dd>{project.size}</dd></div><div><dt>Materials</dt><dd>{project.materials}</dd></div><div><dt>Status</dt><dd>Completed</dd></div></dl></div>
          <div className="project-modal__footer"><button className="text-button" type="button" onClick={onClose}><ArrowLeft size={15} /> Back to work</button><button className="text-button" type="button" onClick={onNext}>Next project <ArrowUpRight size={15} /></button></div>
        </div>
      </article>
    </div>
  )
}
