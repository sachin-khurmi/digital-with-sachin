import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-head" style={{ minHeight: '58vh', display: 'grid', placeItems: 'center' }}>
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>This Page Doesn&rsquo;t Seem to Exist</h1>
        <p className="lead">
          It looks like the link pointing here was faulty. Try heading back to the homepage.
        </p>
        <Link className="btn btn-primary" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  )
}
