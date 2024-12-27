'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Portfolio', href: '#home' },  // Change this to '/' for home page
  { name: 'Qualification', href: '#qualification' },
  { name: 'Contact', href: '#contact' },
]

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Add no-scroll class to body when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      // Remove no-scroll class when menu is closed
      document.body.style.overflow = 'auto'
    }

    return () => {
      // Clean up by resetting the overflow style when the component unmounts or menu is closed
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 bg-gray-50 px-2">
      <div className='container mx-auto'>
        <div className="w-full">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="#home">
                <span className="text-xl font-semibold cursor-pointer">Portfolio</span>
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - full screen with centered items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-gray-50 flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-4 lg:space-y-6 h-[100vh]"
            initial={{ opacity: 0, x: '100%' }} // Starts off-screen
            animate={{ opacity: 1, x: 0 }}      // Moves to center
            exit={{ opacity: 0, x: '100%' }}    // Exits off-screen
            transition={{ duration: 0.5 }}      // Slow down the animation
          >
            <div className="absolute top-0 right-0 p-4 sm:p-6 lg:p-8">
              <button onClick={() => setIsOpen(false)} className="mt-2 ml-4 text-gray-600 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>

            {/* Centered mobile menu items */}
            <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-4 lg:space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-2xl text-gray-600 hover:text-gray-900 sm:text-3xl md:text-2xl lg:text-2xl"
                  onClick={() => setIsOpen(false)} // Close menu after clicking
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
