import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import Mark from '../components/Mark.jsx'

export default function Contact() {
  return (
    <>
      <section className="contact section-shell" id="contact">
        <div className="contact__top"><span className="eyebrow">04 / The next thing</span><span className="contact__note">A good place starts<br />with a conversation.</span></div>
        <h2>Have a place<br />in <em>mind?</em></h2>
        <div className="contact__bottom"><p>New builds, thoughtful renovations, spatial ideas still finding their shape. We’d like to hear about it.</p><a className="contact__email" href="mailto:studio@formandspace.design">studio@formandspace.design <MoveUpRight size={19} /></a></div>
        <div className="contact__stamp" aria-hidden="true"><span>F</span><i>/</i><span>S</span></div>
      </section>
      <footer className="site-footer section-shell">
        <div className="site-footer__main"><Mark compact /><span>Architecture with a sense of place.</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></div>
        <div className="site-footer__meta"><span>© {new Date().getFullYear()} FORM / SPACE STUDIO</span><span>LAGOS, NIGERIA · WORKING EVERYWHERE</span><span>BUILT WITH INTENTION.</span></div>
      </footer>
    </>
  )
}
