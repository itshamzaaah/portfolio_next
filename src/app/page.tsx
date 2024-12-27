'use client'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
 import { Portfolio } from '@/components/portfolio'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Qualification } from '@/components/qualification'
import { useEffect } from 'react'



export default function Home() {
useEffect(()=>{
document.documentElement.classList.remove("dark")
document.documentElement.removeAttribute("dark-theme")
},[])
  return (
    <main>
      <Nav />
      <div className='px-2'>
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Qualification />
      <Contact />
      <Footer />
      </div>
    </main>
  )
}

