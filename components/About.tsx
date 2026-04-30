export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="sec-tag rv">About Me</div>
        <h2 className="sec-h rv d1">
          Passionate developer,<br />
          <span style={{ color: 'var(--accent)' }}>lifelong learner</span>
        </h2>
        <div className="about-grid">
          <div className="rv d2">
            <div className="about-quote">
              &ldquo;I don&rsquo;t just write code — I craft experiences that users love and developers respect.&rdquo;
            </div>
            <div className="about-tags">
              <span className="about-tag hl">Full-Stack Dev</span>
              <span className="about-tag hl">React</span>
              <span className="about-tag hl">Node.js</span>
              <span className="about-tag hl">PostgreSQL</span>
              <span className="about-tag">Golang</span>
              <span className="about-tag">Open Source</span>
              <span className="about-tag">Dhaka, BD 🇧🇩</span>
            </div>
          </div>
          <div className="about-right rv d3">
            <p>
              Hey! I&rsquo;m <strong>Rayhan Ahmed</strong>, a full-stack web developer based in
              Dhaka, Bangladesh. My journey with coding started when I discovered I could build
              anything in a browser — that feeling of creating something from nothing hooked me
              instantly.
            </p>
            <p>
              I specialize in building <strong>fast, scalable web applications</strong> using
              React, Next.js, and Node.js. I also work with <strong>Golang</strong> and{' '}
              <strong>PostgreSQL</strong> for robust backend systems. I love the intersection of
              clean engineering and thoughtful design — where every millisecond and pixel matters.
            </p>
            <p>
              Currently co-founding <strong>Foxmen Studio</strong>, a development agency where I
              lead system design, build scalable architectures, and deliver production-ready
              applications for real-world clients.
            </p>
            <p>
              Open to <strong>freelance projects</strong>, full-time roles, and interesting
              collaborations. Let&rsquo;s build something great together.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-fill btn-sm">Let&rsquo;s Talk</a>
              <a href="/Rayhan-CV.pdf" download className="btn btn-ghost btn-sm">Download CV</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
