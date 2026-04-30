import { experienceData } from '@/data/portfolio'

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-tag rv">Experience</div>
        <h2 className="sec-h rv d1">
          Where I&rsquo;ve <span style={{ color: 'var(--accent)' }}>worked</span>
        </h2>
        <div className="exp-list">
          {experienceData.map((exp, i) => (
            <div className={`exp-item rv d${i + 1}`} key={exp.company}>
              <div className="exp-meta">
                <div className="exp-year">{exp.year}</div>
                <div className="exp-company">{exp.company}</div>
                <span className={`exp-badge ${exp.badgeType}`}>{exp.badge}</span>
              </div>
              <div>
                <div className="exp-role">{exp.role}</div>
                <div className="exp-desc">
                  <ul>
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
