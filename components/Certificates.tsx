import { certificatesData } from '@/data/portfolio'

export default function Certificates() {
  return (
    <section id="certificates">
      <div className="wrap">
        <div className="sec-tag rv">Credentials</div>
        <h2 className="sec-h rv d1">
          Certificates &amp; <span style={{ color: 'var(--accent)' }}>Recognition</span>
        </h2>
        <div className="cert-grid">
          {certificatesData.map((cert, i) => (
            <div className={`cert-card rv d${i + 1}`} key={cert.name}>
              <div className="cert-issuer-row">
                <div className="cert-icon" style={{ background: cert.iconBg }}>{cert.icon}</div>
                <div className="cert-issuer-name">{cert.issuer}</div>
              </div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-foot">
                <span>Issued {cert.year}</span>
                <a href={cert.verifyUrl} className="cert-verify">Verify ↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
