export const ease = [0.16, 1, 0.3, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.1 },
  }),
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease, delay: i * 0.1 },
  }),
}

export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease, delay: i * 0.1 },
  }),
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease, delay: i * 0.08 },
  }),
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const drawLine = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease } },
}
