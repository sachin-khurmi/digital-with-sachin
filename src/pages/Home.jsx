import { Link } from 'react-router-dom'
import { contact, stats, services, process } from '../data/site'
import Icon from '../components/Icons'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-inner">
              {/* The brand name in the hero, so the page a visitor lands on for
                  "Digital With Sachin" says so above the fold — the H1 alone
                  never carried the name. */}
              <span className="eyebrow">Digital With Sachin</span>
              <h1>
                Digital Marketing
                <br />
                That Drives
                <span>Real Growth</span>
              </h1>
              <p className="lead">
                From Strategy to Execution, I help Businesses attract the right audience and grow
                online.
              </p>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Free Consultation
                </a>
              </div>
            </div>

            <div className="hero-media">
              <img src="/img/hero.png" alt="Sachin Khurmi, digital marketing consultant" />
            </div>
          </div>
        </div>

        <div className="stats-strip">
          <div className="container">
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat-icon">
                    <Icon name={s.icon} size={44} />
                  </span>
                  <div className="stat-text">
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center" style={{ marginBottom: '2.6rem' }}>
            <span className="eyebrow">Our Services</span>
            <h2>Solutions to Grow Your Business Online</h2>
            <p className="lead">
              Result-driven services built around what actually moves the needle for your business.
            </p>
          </div>

          <div className="grid grid-3">
            {services.map((s) => (
              <article className="card" key={s.slug}>
                {s.badge && <span className="badge">{s.badge}</span>}
                <div className="card-icon">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <Link className="card-link" to="/services">
                  Explore &rarr;
                </Link>
              </article>
            ))}
          </div>

          <div className="center" style={{ marginTop: '2.4rem' }}>
            <Link className="btn btn-ghost" to="/services">
              View All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="center" style={{ marginBottom: '2.4rem' }}>
            <span className="eyebrow">Our Process</span>
            <h2>A Simple Process That Delivers Results</h2>
          </div>

          <div className="process">
            {process.map((p) => (
              <div className="step" key={p.num}>
                <div className="step-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
