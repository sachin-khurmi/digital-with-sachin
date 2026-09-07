import { Link } from 'react-router-dom'
import { contact, services } from '../data/site'
import Icon from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand" style={{ color: '#fff' }}>
              <span className="brand-mark">DS</span>
              Digital With Sachin
            </div>
            <p>
              Smart Strategies. Real Results. Helping businesses grow online with result-driven
              digital marketing.
            </p>
            <div className="socials">
              <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={18} />
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <Icon name="whatsapp" size={18} />
              </a>
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <Icon name="mail" size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/services">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact Info</h4>
            <ul>
              <li>{contact.address}</li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          Copyright &copy; {new Date().getFullYear()} Digital With Sachin | Powered by Sachin_Khurmi
        </div>
      </div>
    </footer>
  )
}
