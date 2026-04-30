'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const rvObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('on')
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    )

    document.querySelectorAll('.rv').forEach((el) => rvObs.observe(el))
    setTimeout(() => {
      document.querySelectorAll('#hero .rv').forEach((el) => el.classList.add('on'))
    }, 60)

    return () => rvObs.disconnect()
  }, [])

  return null
}
