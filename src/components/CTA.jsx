import { Link } from 'react-router-dom'
import { contact } from '../data/site'

export default function CTA({
  title = "Let's Take Your Business to the Next Level",
  text = "Have a project in mind? Let's discuss how we can grow your business online.",
}) {
  return (
    <section className="cta">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="cta-actions">
          <a className="btn btn-white" href={contact.whatsapp} target="_blank" rel="noreferrer">
            Get a Free Consultation
          </a>
          <Link className="btn btn-outline-white" to="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
