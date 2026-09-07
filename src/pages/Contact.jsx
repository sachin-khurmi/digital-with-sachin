import { useState } from 'react'
import { contact } from '../data/site'
import Icon from '../components/Icons'

const highlights = [
  { icon: 'chat', title: 'Quick Response', text: 'We reply within 24 hours' },
  { icon: 'spark', title: 'Free Consultation', text: 'Get expert advice for your business' },
  { icon: 'target', title: 'Customized Strategy', text: 'Solutions tailored to your goals' },
]

const reasons = [
  { icon: 'users', title: 'Experienced Team', text: 'Skilled professionals with years of industry experience.' },
  { icon: 'chart', title: 'Result Driven', text: 'We focus on strategies that deliver real and measurable results.' },
  { icon: 'shield', title: 'Transparent Process', text: 'Clear communication and transparency at every step.' },
  { icon: 'rocket', title: 'Client Satisfaction', text: "Our clients' success is our top priority." },
]

const empty = { name: '', email: '', phone: '', subject: '', message: '' }

// Optional: set VITE_CONTACT_ENDPOINT (e.g. a Formspree URL) to receive
// submissions directly. Without it, the form opens the visitor's mail client.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'err', text: 'Please fill in your name, email and message.' })
      return
    }

    if (ENDPOINT) {
      setSending(true)
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Request failed')
        setForm(empty)
        setStatus({ type: 'ok', text: 'Thanks! Your message has been sent. We will be in touch shortly.' })
      } catch {
        setStatus({ type: 'err', text: 'Something went wrong. Please email or WhatsApp us instead.' })
      } finally {
        setSending(false)
      }
      return
    }

    const subject = form.subject || `New enquiry from ${form.name}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setStatus({ type: 'ok', text: 'Opening your mail app with the message ready to send.' })
  }

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Contact Us</span>
          <h1>Let&rsquo;s Build Something Amazing</h1>
          <p className="lead">
            Have a project in mind or want to grow your business online? We would love to hear from
            you. Get in touch with us today.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '54px' }}>
        <div className="container">
          <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
            {highlights.map((h) => (
              <article className="card" key={h.title}>
                <div className="card-icon">
                  <Icon name={h.icon} size={24} />
                </div>
                <h3>{h.title}</h3>
                <p style={{ marginBottom: 0 }}>{h.text}</p>
              </article>
            ))}
          </div>

          <div className="contact-grid">
            <div className="form-card">
              <h2 style={{ fontSize: '1.5rem' }}>Send us a Message</h2>
              <p style={{ color: 'var(--slate-500)', fontSize: '.95rem' }}>
                Fill out the form below and we will get back to you soon.
              </p>

              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-2" style={{ gap: '0 1rem' }}>
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" value={form.name} onChange={update} placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" value={form.phone} onChange={update} placeholder="+91 00000 00000" />
                  </div>
                  <div className="field">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" name="subject" value={form.subject} onChange={update} placeholder="How can we help?" />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={update} placeholder="Tell us about your project..." />
                </div>

                <button className="btn btn-primary" type="submit" disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message'}
                  {!sending && <Icon name="arrowRight" size={18} />}
                </button>

                {status && <p className={`form-note ${status.type}`}>{status.text}</p>}
              </form>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem' }}>Get In Touch</h2>
              <p style={{ color: 'var(--slate-500)', fontSize: '.95rem', marginBottom: '1.8rem' }}>
                We are here to help and answer any question you might have.
              </p>

              <div className="info-item">
                <div className="card-icon"><Icon name="phone" size={19} /></div>
                <div>
                  <h4>Phone</h4>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </div>
              </div>

              <div className="info-item">
                <div className="card-icon"><Icon name="mail" size={19} /></div>
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  <a href={`mailto:${contact.altEmail}`}>{contact.altEmail}</a>
                </div>
              </div>

              <div className="info-item">
                <div className="card-icon"><Icon name="pin" size={19} /></div>
                <div>
                  <h4>Location</h4>
                  <p>{contact.address}</p>
                  <p>{contact.location}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="card-icon"><Icon name="clock" size={19} /></div>
                <div>
                  <h4>Business Hours</h4>
                  {contact.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}: {h.time}
                    </p>
                  ))}
                </div>
              </div>

              <a className="btn btn-primary" href={contact.whatsapp} target="_blank" rel="noreferrer" style={{ marginTop: '.5rem' }}>
                <Icon name="whatsapp" size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="center" style={{ marginBottom: '2.4rem' }}>
            <span className="eyebrow">Why Work With Us?</span>
            <h2>Built Around Your Growth</h2>
          </div>
          <div className="grid grid-4">
            {reasons.map((r) => (
              <article className="card" key={r.title}>
                <div className="card-icon"><Icon name={r.icon} size={24} /></div>
                <h3>{r.title}</h3>
                <p style={{ marginBottom: 0 }}>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
