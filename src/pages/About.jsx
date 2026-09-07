import { skills, values, stats } from '../data/site'
import Icon from '../components/Icons'
import CTA from '../components/CTA'

const valueIcons = ['shield', 'users', 'spark', 'globe']

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>Helping Businesses Grow Digitally with Smart Strategies</h1>
          <p className="lead">
            Digital With Sachin was built with a simple mission — to help businesses grow online
            through result-driven digital marketing strategies, creative solutions, and continuous
            support.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="eyebrow">My Story</span>
              <h2>From Passion to Purpose</h2>
              <p>
                My journey into digital marketing started with curiosity and a passion for helping
                businesses grow online.
              </p>
              <p>
                Over the years, I have worked on various projects, learned from real challenges, and
                constantly upgraded my skills to stay ahead in this dynamic digital world.
              </p>
              <p style={{ marginBottom: 0 }}>
                Today, my mission is simple — to help businesses of all sizes build a strong digital
                presence, connect with the right audience, and achieve measurable results.
              </p>
            </div>

            <div className="grid" style={{ gap: '1rem' }}>
              {stats.map((s) => (
                <div className="stat" key={s.label} style={{ textAlign: 'left', padding: '1.4rem 1.6rem' }}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '3rem' }}>
            <div>
              <span className="eyebrow">My Skills &amp; Expertise</span>
              <h2>What I Bring to the Table</h2>
              <p className="lead">
                A practical, hands-on skill set built across real client projects.
              </p>
            </div>
            <div>
              {skills.map((s) => (
                <div className="skill" key={s.name}>
                  <div className="skill-head">
                    <span>{s.name}</span>
                    <span>{s.value}%</span>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center" style={{ marginBottom: '2.4rem' }}>
            <span className="eyebrow">What I Believe In</span>
            <h2>Values That Guide Every Project</h2>
          </div>
          <div className="grid grid-4">
            {values.map((v, i) => (
              <article className="card" key={v.title}>
                <div className="card-icon">
                  <Icon name={valueIcons[i]} size={24} />
                </div>
                <h3>{v.title}</h3>
                <p style={{ marginBottom: 0 }}>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Let's Build Something Amazing Together!"
        text="Have a project in mind? Let's discuss how we can grow your business online."
      />
    </>
  )
}
