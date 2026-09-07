import { services, differentiators } from '../data/site'
import Icon from '../components/Icons'
import CTA from '../components/CTA'

const diffIcons = ['chart', 'spark', 'shield', 'rocket']

export default function Services() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Our Services</span>
          <h1>Digital Marketing Solutions That Drive Real Results</h1>
          <p className="lead">
            We help businesses grow online with result-driven digital marketing services. From
            strategy to execution, we take care of everything.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {differentiators.map((d, i) => (
              <article className="card" key={d.title}>
                <div className="card-icon">
                  <Icon name={diffIcons[i]} size={24} />
                </div>
                <h3>{d.title}</h3>
                <p style={{ marginBottom: 0 }}>{d.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          {services.map((s, i) => (
            <div className={`srow ${i % 2 ? 'flip' : ''}`} key={s.slug}>
              <div>
                <div className="srow-num">
                  {s.num} &mdash; {s.name}
                </div>
                <h2>{s.title}</h2>
                <p className="lead" style={{ marginBottom: '1.3rem' }}>
                  {s.long}
                </p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>
                      <span className="tick">
                        <Icon name="check" size={17} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="srow-media">
                <div className="card-icon">
                  <Icon name={s.icon} size={44} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA
        title="Ready to Take Your Business to the Next Level?"
        text="Let's build a digital strategy that drives real results. Get a free consultation and a customized plan for your business."
      />
    </>
  )
}
