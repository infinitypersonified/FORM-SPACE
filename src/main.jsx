import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Menu, X, Plus, MoveUpRight } from 'lucide-react';
import './styles.css';

const projects = [
  { n: '01', title: 'House in the trees', type: 'RESIDENTIAL · 2025', place: 'LAGOS, NIGERIA', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90', className: 'project-one', desc: 'A quiet home built around the things that cannot be designed: shade, breeze, and time.' },
  { n: '02', title: 'The long weekend', type: 'HOSPITALITY · 2024', place: 'ACCRA, GHANA', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90', className: 'project-two', desc: 'A slower kind of retreat. Concrete, local stone and a courtyard that holds the day.' },
  { n: '03', title: 'Still / life', type: 'CULTURAL · 2024', place: 'ABUJA, NIGERIA', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90', className: 'project-three', desc: 'A study in proportion and pause, where every room opens into another possibility.' }
];

function App() {
  const [intro, setIntro] = useState(true);
  const [menu, setMenu] = useState(false);
  const [detail, setDetail] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 2450);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (intro) return undefined;
    const elements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [intro]);

  useEffect(() => {
    if (!detail) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setDetail(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [detail]);

  const movePointer = (event) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) setPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
  };

  const scrollTo = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {intro && (
        <div className="intro" aria-label="FORM / SPACE intro">
          <div className="intro-grid" />
          <div className="intro-center">
            <div className="intro-mark"><span>F</span><i /><span>S</span></div>
            <div className="intro-name">FORM <em>/</em> SPACE</div>
          </div>
          <div className="intro-bottom"><span>INDEPENDENT ARCHITECTURE STUDIO</span><span>EST. 2018 · LAGOS</span></div>
          <div className="intro-line" />
        </div>
      )}

      <div className={`site${intro ? '' : ' site--ready'}`}>
        <header className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
          <a className="wordmark" href="#top" aria-label="Form Space home">FORM<span>/</span>SPACE<small>ARCHITECTURE STUDIO</small></a>
          <div className="nav-mid"><button onClick={() => scrollTo('work')}>SELECTED WORK <span>03</span></button><button onClick={() => scrollTo('studio')}>STUDIO</button></div>
          <button className="nav-contact" onClick={() => scrollTo('contact')}>START A PROJECT <ArrowUpRight size={14} /></button>
          <button className="menu-button" onClick={() => setMenu((open) => !open)} aria-label="Toggle navigation" aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
        </header>

        {menu && <div className="menu-overlay"><span className="menu-index">NAVIGATION / 01—04</span><button onClick={() => scrollTo('work')}>Selected work <ArrowUpRight /></button><button onClick={() => scrollTo('studio')}>The studio <ArrowUpRight /></button><button onClick={() => scrollTo('approach')}>Our approach <ArrowUpRight /></button><button onClick={() => scrollTo('contact')}>Start a project <ArrowUpRight /></button><p>LAGOS · WORKING EVERYWHERE</p></div>}

        <main id="top">
          <section className="hero" ref={heroRef} onMouseMove={movePointer}>
            <div className="hero-photo" style={{ '--mx': `${pointer.x}%`, '--my': `${pointer.y}%` }}><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=95" alt="Sunlight entering a minimalist modern architectural interior" /><div className="photo-shade" /></div>
           
            <div className="hero-title-wrap"><p className="eyebrow reveal-delay">ARCHITECTURE / OBJECTS / ENVIRONMENTS</p><h1 className="hero-title"><span>Space to</span><span className="title-second">feel <i>something.</i></span></h1><div className="hero-bottom"><p>We make places that bring you<br />closer to what matters.</p><button className="circle-link" onClick={() => scrollTo('work')} aria-label="Explore selected work"><ArrowDownRight /></button></div></div>
          </section>

          <section className="manifesto" id="studio"><div className="manifesto-body" data-reveal><h2>Architecture is not<br />just what you <em>see.</em></h2><div className="manifesto-aside"><p>It is the morning light across a wall. The pause between one room and the next. The feeling that, for a moment, you are exactly where you should be.</p><a href="#approach" onClick={(event) => { event.preventDefault(); scrollTo('approach'); }}>A LITTLE MORE ABOUT US <ArrowDownRight size={15} /></a></div></div></section>

          <section className="work" id="work"><div className="work-head" ><div><h2>Built to <em>belong.</em></h2></div><p>A small selection of places made with care,<br />for people who will make them their own.</p><span className="work-count">2024—2026<br />03 PROJECTS</span></div>
            <div className="project-list">{projects.map((project, index) => <article className={`project ${project.className}`} key={project.n} data-reveal style={{ '--delay': `${index * 120}ms` }}><button className="project-image" onClick={() => setDetail(project)} aria-label={`View ${project.title}`}><img src={project.image} alt={`${project.title} architecture project`} loading="lazy" /><span className="image-number">{project.n} / 03</span><span className="image-open"><MoveUpRight size={22} /></span><span className="image-caption">{project.place}</span></button><div className="project-info"><div><span className="project-type">{project.type}</span><h3>{project.title}</h3></div><button className="project-arrow" onClick={() => setDetail(project)} aria-label={`Open ${project.title}`}><ArrowUpRight /></button></div></article>)}</div>
            
          </section>

          <section className="approach" id="approach"><div className="approach-image" data-reveal><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=90" alt="Natural materials and light in a contemporary living space" loading="lazy" /><span>STUDY 04.1 — MATERIAL / LIGHT</span></div><div className="approach-content" data-reveal><span className="eyebrow">03 / OUR APPROACH</span><h2>Make room<br />for <em>life.</em></h2><p>We begin with listening. To the land, to the climate, to the everyday rituals that make a place personal. Then we remove the unnecessary until the essential has room to breathe.</p><div className="principles"><div><span>01</span><strong>Context before concept</strong><Plus size={15} /></div><div><span>02</span><strong>Materials with memory</strong><Plus size={15} /></div><div><span>03</span><strong>Space that gives back</strong><Plus size={15} /></div></div></div></section>

          <section className="contact" id="contact"><div className="contact-top"><span className="eyebrow">04 / THE NEXT CHAPTER</span><span>GOOD THINGS BEGIN WITH A CONVERSATION.</span></div><h2 data-reveal>Have a place<br />in <em>mind?</em></h2><a className="contact-cta" href="mailto:studio@formspace.example?subject=New%20project%20enquiry"><span>TELL US ABOUT IT</span><ArrowUpRight /></a><div className="contact-bottom"><div><span>FORM / SPACE</span><p>Independent by design.<br />Intentional by nature.</p></div><div><span>FIND US</span><p>Lagos, Nigeria<br />Working everywhere.</p></div><div><span>SAY HELLO</span><p><a href="mailto:studio@formspace.example">studio@formspace.example</a></p></div><div><span>FOLLOW THE WORK</span><p><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a></p></div></div><footer><span>© FORM / SPACE 2026</span><span>MADE WITH INTENTION, IN LAGOS.</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></footer></section>
        </main>
      </div>

      {detail && <div className="detail-backdrop" onClick={() => setDetail(null)} role="presentation"><div className="detail-modal" role="dialog" aria-modal="true" aria-label={detail.title} onClick={(event) => event.stopPropagation()}><button className="detail-close" onClick={() => setDetail(null)} aria-label="Close project"><X /></button><img src={detail.image} alt={detail.title} /><div className="detail-copy"><span>{detail.n} / SELECTED WORK — {detail.type}</span><h2>{detail.title}</h2><p>{detail.desc}</p><span className="detail-place">{detail.place}</span></div></div></div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
