import { Link } from 'react-router-dom'
import { contact, stats, services, process } from '../data/site'
import Icon from '../components/Icons'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <h1>
              Digital Marketing That Drives
              <span>Real Growth</span>
            </h1>
            <p className="lead">
              From strategy to execution, I help businesses attract the right audience and grow
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
                <Icon name="arrowRight" size={18} />
              </a>
              <Link className="btn btn-ghost" to="/services">
                View Services
              </Link>
            </div>
          </div>

          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
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
