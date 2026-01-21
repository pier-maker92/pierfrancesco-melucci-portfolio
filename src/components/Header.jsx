import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('About')

  useEffect(() => {
    const handleScroll = () => {
      // Update current section based on scroll position
      const sections = [
        { id: 'hero', name: 'About' },
        { id: 'work', name: 'Work Experience' },
        { id: 'publications', name: 'Publications' },
        { id: 'academic', name: 'Academic Experience' },
        { id: 'music', name: 'Music' }
      ]

      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i].name)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About', href: '#hero' },
    { name: 'Work Experience', href: '#work' },
    { name: 'Publications', href: '#publications' },
    { name: 'Academic Experience', href: '#academic' },
    { name: 'Music', href: '#music' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      // On mobile, center the section vertically
      const isMobile = window.innerWidth < 1024
      if (isMobile && (href === '#publications' || href === '#music')) {
        const elementTop = element.offsetTop
        const elementHeight = element.offsetHeight
        const windowHeight = window.innerHeight
        // Center the section vertically in the viewport
        const scrollPosition = elementTop - (windowHeight / 2) + (elementHeight / 2)

        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth'
        })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Vertical Sidebar */}
      <header className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 flex-col">
        <nav className="flex flex-col h-full py-8 px-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900">
              {currentSection === 'Academic Experience' ? '🎓 Experience' : currentSection}
            </h1>
          </div>

          <div className="flex flex-col space-y-2 flex-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${currentSection === item.name
                  ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Horizontal Header */}
      <header className="md:hidden fixed top-0 w-full z-50 bg-white shadow-md">
        <nav className="w-full px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                {currentSection === 'Academic Experience' ? 'Academic' : currentSection}
              </h1>
            </div>

            <div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>
    </>
  )
}

export default Header 