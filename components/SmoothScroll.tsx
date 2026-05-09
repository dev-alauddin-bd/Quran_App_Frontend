'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

export function SmoothScroll({ children, root = true }: { children: ReactNode, root?: boolean }) {
  return (
    <ReactLenis root={root} options={{ 
      lerp: 0.1, 
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    }}>
      {children}
    </ReactLenis>
  )
}
