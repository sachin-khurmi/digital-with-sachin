import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import CTA from '../components/CTA'

// Placeholder entries — replace the contents of this array with real client
// work (title, category, summary, tags and an optional live link).
const projects = [
  {
    title: 'Local Business SEO Growth',
    category: 'SEO',
    icon: 'search',
    text: 'Improved local search visibility and organic traffic for a service-based business.',
    tags: ['Local SEO', 'On-Page SEO', 'Reporting'],
  },
  {
    title: 'Social Media Brand Building',
    category: 'Social Media Marketing',
    icon: 'share',
    text: 'Built a consistent content system that grew engagement and community size.',
    tags: ['Content', 'Scheduling', 'Community'],
  },
  {
    title: 'Lead Generation Campaign',
    category: 'Meta Ads',
    icon: 'target',
    text: 'Facebook and Instagram campaigns focused on qualified lead volume.',
    tags: ['Lead Ads', 'Retargeting', 'A/B Testing'],
  },
  {
    title: 'Search Campaign Setup',
    category: 'Google Ads',
    icon: 'megaphone',
    text: 'High-intent search campaigns with full conversion tracking in place.',
    tags: ['Search Ads', 'Conversion Tracking'],
  },
  {
    title: 'Business Website Build',
    category: 'Website Development',
    icon: 'code',
    text: 'Fast, responsive WordPress website designed to convert visitors into enquiries.',
    tags: ['WordPress', 'Elementor', 'Speed'],
  },
  {
    title: 'Brand Creative Pack',
    category: 'Graphic Designing',
    icon: 'palette',
    text: 'Social creatives, ad visuals and marketing material built around one brand system.',
    tags: ['Creatives', 'Branding', 'Posters'],
  },
]

export default function Portfolio() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Portfolio</span>
          <h1>Work That Delivers Real Results</h1>
          <p className="lead">
            A look at the kind of projects we take on across SEO, paid ads, web development and
            design.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {projects.map((p) => (
              <article className="card pcard" key={p.title}>
                <div className="pcard-top">
                  <Icon name={p.icon} size={40} />
                </div>
                <div className="pcard-body">
                  <span className="eyebrow" style={{ marginBottom: '.2rem' }}>
                    {p.category}
                  </span>
                  <h3>{p.title}</h3>
                  <p style={{ marginBottom: 0 }}>{p.text}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="center" style={{ marginTop: '2.6rem' }}>
            <Link className="btn btn-ghost" to="/services">
              Explore Our Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
