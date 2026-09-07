import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from './Icons'

/** Resets scroll position whenever the route changes. */
export function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

/** Floating "back to top" button that fades in after scrolling. */
export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <Icon name="arrowUp" size={20} />
    </button>
  )
}
