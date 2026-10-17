import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Mark from './Mark.jsx'

const links = [
  { href: '#work', label: 'Selected work' },
  { href: '#studio', label: 'Studio' },
  { href: '#approach', label: 'Approach' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <Mark />
      <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Main navigation">
        {links.map((link, index) => <a key={link.href} href={link.href} onClick={close}><span className="site-nav__index">0{index + 1}</span>{link.label}</a>)}
        <a className="site-nav__contact" href="#contact" onClick={close}>Start a project <ArrowUpRight size={14} strokeWidth={1.5} /></a>
      </nav>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  )
}
