import { useCallback, useState } from 'react'
import Intro from './components/Intro.jsx'
import Header from './components/Header.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import Hero from './sections/Hero.jsx'
import Work from './sections/Work.jsx'
import Studio, { Approach } from './sections/Studio.jsx'
import Contact from './sections/Contact.jsx'
import { projects } from './data/projects.js'

export default function App() {
  const [ready, setReady] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const handleIntroComplete = useCallback(() => setReady(true), [])
  const handleCloseProject = useCallback(() => setSelectedProject(null), [])
  const handleNextProject = useCallback(() => {
    if (!selectedProject) return
    const index = projects.findIndex((project) => project.id === selectedProject.id)
    setSelectedProject(projects[(index + 1) % projects.length])
  }, [selectedProject])

  return (
    <>
      <Intro onComplete={handleIntroComplete} />
      <div className={`site${ready ? ' site--ready' : ''}`}>
        <Header />
        <main>
          <Hero ready={ready} />
          <Work onSelect={setSelectedProject} />
          <Studio />
          <Approach />
          <Contact />
        </main>
      </div>
      <ProjectModal project={selectedProject} onClose={handleCloseProject} onNext={handleNextProject} />
    </>
  )
}
