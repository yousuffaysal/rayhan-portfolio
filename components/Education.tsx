import { educationData } from '@/data/portfolio'

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <div className="sec-tag rv">Education</div>
        <h2 className="sec-h rv d1">
          Academic <span style={{ color: 'var(--accent)' }}>journey</span>
        </h2>
        <div className="edu-grid">
          {educationData.map((edu, i) => (
            <div className={`edu-card rv d${i + 1}`} key={edu.degree}>
              <div className="edu-year">{edu.year}</div>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-school">{edu.school}</div>
              <div className="edu-detail">{edu.detail}</div>
              {edu.pill && <span className="edu-pill">{edu.pill}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
