export default function Mark({ compact = false }) {
  return (
    <a className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} href="#top" aria-label="FORM / SPACE home">
      <span className="brand-mark__symbol" aria-hidden="true">
        <svg viewBox="0 0 38 38" fill="none">
          <path d="M4 34V4H34V34H4Z" />
          <path d="M4 13H25V34M13 4V25H34" />
          <path d="M13 13H25V25H13V13Z" />
        </svg>
      </span>
      <span className="brand-mark__type">FORM <i>/</i> SPACE</span>
    </a>
  )
}
