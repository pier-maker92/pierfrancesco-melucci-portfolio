import React, { useState, useEffect, useMemo } from 'react'
import { GraduationCap, Users, BookOpen } from 'lucide-react'
import sapienzaLogo from '../assets/institutions/sapienza-logo.png'
import bolognaBsLogo from '../assets/institutions/bologna-business-school-logo.png'
import torVergataLogo from '../assets/institutions/tor-vergata-logo.png'
import uniboLogo from '../assets/institutions/unibo-logo.png'
import frescobaldiLogo from '../assets/institutions/frescobaldi-logo.png'
import martiniLogo from '../assets/institutions/martini-logo.jpg'

const AcademicExperience = () => {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const aspectRatio = width / height
      setIsNarrowScreen(width < 400 || aspectRatio < 0.5)
      setIsMobile(width < 1024)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  const education = [
    {
      id: 1,
      degree: "National PhD in Artificial Intelligence",
      institution: "La Sapienza University of Rome",
      location: "Rome, Italy",
      period: "November 2023 - Present",
      description: "Research topics: XAI, Multimodal Large Language Models, Speech Understanding and Generation, Music Information Retrieval",
      advisor: "Prof. Paolo Merialdo",
      logo: sapienzaLogo
    },
    {
      id: 2,
      degree: "Master in Data Science - I level",
      institution: "Bologna Business School",
      location: "Bologna, Italy", 
      period: "October 2019 - October 2020",
      description: "",//"Thesis: Deep Learning Applications in Natural Language Processing",
      logo: bolognaBsLogo
    },
    {
      id: 3,
      degree: "Master in Sound Engineering - I level",
      institution: "Tor Vergata University of Rome",
      location: "Rome, Italy",
      period: "October 2016 - October 2019",
      description: "",//"Thesis: Beat Tracking algorithm",
      logo: torVergataLogo
    },
    {
      id: 4,
      degree: "Bachelor in Economics and Finance",
      institution: "Alma Mater Studiorum University of Bologna",
      location: "Bologna, Italy",
      period: "September 2011 - March 2015",
      description: "",//"Thesis: Financial Analysis of the Italian Stock Market",
      logo: uniboLogo
    },
    {
      id: 5,
      degree: "Specialisation in Jazz Music",
      institution: "Conservatorio di Musica G. Frescobaldi di Ferrara",
      location: "Ferrara, Italy",
      period: "September 2015 - June 2017",
      description: "", //"Thesis: Third Stream Jazz",
      logo: frescobaldiLogo
    },
    {
      id: 6,
      degree: "Conservatory Diploma",
      institution: "Conservatorio di Musica G.B. Martini di Bologna",
      location: "Bologna, Italy",
      period: "November 2005 - February 2014",
      logo: martiniLogo
    }
  ]

  // Calculate optimal height based on content
  const calculateOptimalHeight = useMemo(() => {
    const maxContentLength = Math.max(
      ...education.map(edu => {
        const degreeLength = edu.degree?.length || 0
        const institutionLength = edu.institution?.length || 0
        const descriptionLength = edu.description?.length || 0
        const advisorLength = edu.advisor?.length || 0
        const gpaLength = edu.gpa?.length || 0
        return degreeLength + institutionLength + descriptionLength + advisorLength + gpaLength
      })
    )
    
    // Base height + dynamic height based on content
    const baseHeight = 350 // Base for academic content
    const contentFactor = Math.ceil(maxContentLength / 160) // 160 chars per height unit
    const dynamicHeight = baseHeight + (contentFactor * 30) // 30px per content unit
    
    // Adjust for narrow screens
    const adjustedHeight = isNarrowScreen ? dynamicHeight + 80 : dynamicHeight
    
    const finalHeight = Math.min(adjustedHeight, 580) // Cap at 580px max
    
    // Apply mobile-specific 20% reduction when in mobile mode
    return isMobile ? Math.floor(finalHeight * 0.8) : finalHeight
  }, [isNarrowScreen])

  // Get responsive classes
  const getResponsiveClasses = () => {
    const fontSizeClass = isNarrowScreen ? 'text-xs' : 'text-sm'
    const titleSizeClass = isNarrowScreen ? 'text-base' : 'text-lg'
    const institutionSize = isNarrowScreen ? 'text-sm' : 'text-base'
    return { fontSizeClass, titleSizeClass, institutionSize }
  }

  const { fontSizeClass, titleSizeClass, institutionSize } = getResponsiveClasses()



  // Function to get institution initials as fallback
  const getInstitutionInitials = (institutionName) => {
    return institutionName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  // Component for displaying institution logo or initials
  const InstitutionLogo = ({ edu }) => {
    const [logoError, setLogoError] = React.useState(false)
    
    // Mobile logos are larger than desktop
    const desktopSize = { container: "w-12 h-12", image: "w-10 h-10", text: "text-sm" }
    const mobileSize = { container: "w-16 h-16", image: "w-14 h-14", text: "text-base" }

    if (edu.logo && !logoError) {
      return (
        <div className={`${isMobile ? mobileSize.container : desktopSize.container} rounded-lg overflow-hidden flex items-center justify-center bg-white`}>
          <img 
            src={edu.logo}
            alt={`${edu.institution} logo`}
            className={`${isMobile ? mobileSize.image : desktopSize.image} object-contain`}
            onError={() => setLogoError(true)}
          />
        </div>
      )
    }

    // Fallback to institution initials
    return (
      <div className={`${isMobile ? mobileSize.container : desktopSize.container} bg-primary-100 rounded-lg flex items-center justify-center border border-primary-200`}>
        <span className={`${isMobile ? mobileSize.text : desktopSize.text} font-bold text-primary-700`}>
          {getInstitutionInitials(edu.institution)}
        </span>
      </div>
    )
  }

  // State for active education index (mobile carousel)
  const [activeEducation, setActiveEducation] = useState(0)
  const eduCarouselRef = React.useRef(null)

  // Helper to get active index based on scroll position
  const getActiveIndex = (scrollLeft, itemWidth, itemCount) => {
    const center = scrollLeft + (window.innerWidth * 0.5)
    let minDist = Infinity
    let activeIdx = 0
    for (let i = 0; i < itemCount; i++) {
      const itemCenter = (i * itemWidth) + (itemWidth / 2)
      const dist = Math.abs(center - itemCenter)
      if (dist < minDist) {
        minDist = dist
        activeIdx = i
      }
    }
    return activeIdx
  }

  useEffect(() => {
    const handleScroll = () => {
      if (eduCarouselRef.current) {
        const scrollLeft = eduCarouselRef.current.scrollLeft
        const itemWidth = eduCarouselRef.current.firstChild?.firstChild?.offsetWidth || 1
        setActiveEducation(getActiveIndex(scrollLeft, itemWidth, education.length))
      }
    }
    const node = eduCarouselRef.current
    if (node) node.addEventListener('scroll', handleScroll)
    return () => node && node.removeEventListener('scroll', handleScroll)
  }, [education.length])

  return (
    <section id="academic" className="h-[calc(100vh-1rem)] flex items-center bg-white mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mobile: Horizontal swipe carousel */}
        <div className="lg:hidden">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Academic Experience</h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2">
              My educational journey and academic achievements
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 mr-3 text-primary-600" />
              Education
            </h3>
            
            {/* Education Carousel */}
            <div className="overflow-x-auto scrollbar-hide" ref={eduCarouselRef}>
              <div className="flex space-x-6 px-4 pb-4">
                {education.map((edu, index) => (
                  <div key={edu.id} className="flex-shrink-0 w-[70vw]">
                    <div className="card border-l-4 border-l-purple-500" style={{ height: isMobile ? `${calculateOptimalHeight}px` : 'auto' }}>
                      {/* Mobile: Full-width layout */}
                      <div className="lg:hidden">
                        <div className="flex justify-center mb-4">
                          <InstitutionLogo edu={edu} />
                        </div>
                        <div className="w-full">
                          <h4 className={`${titleSizeClass} font-semibold text-gray-900 mb-2 text-center`}>{edu.degree}</h4>
                          <p className={`${institutionSize} text-primary-600 font-medium text-center mb-1`}>{edu.institution}</p>
                          <p className={`${fontSizeClass} text-gray-600 text-center mb-2`}>{edu.location}</p>
                          <p className={`${fontSizeClass} text-gray-500 text-center mb-4`}>{edu.period}</p>
                          <div className="w-full">
                            <p className={`${fontSizeClass} text-gray-700 mb-3 leading-relaxed`}>{edu.description}</p>
                            {edu.advisor && (
                              <p className={`${fontSizeClass} text-gray-600 mb-1`}>Advisor: {edu.advisor}</p>
                            )}
                            {edu.gpa && (
                              <p className={`${fontSizeClass} text-gray-600`}>{edu.gpa}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Desktop: Original layout */}
                      <div className="hidden lg:block">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <InstitutionLogo edu={edu} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                              <div>
                                <h4 className={`${titleSizeClass} font-semibold text-gray-900`}>{edu.degree}</h4>
                                <p className={`${institutionSize} text-primary-600 font-medium`}>{edu.institution}</p>
                                <p className={`${fontSizeClass} text-gray-600`}>{edu.location}</p>
                              </div>
                              <div className="mt-2 md:mt-0 text-right">
                                <p className={`${fontSizeClass} text-gray-500`}>{edu.period}</p>
                              </div>
                            </div>
                            <p className={`${fontSizeClass} text-gray-700 mb-2`}>{edu.description}</p>
                            {edu.advisor && (
                              <p className={`${fontSizeClass} text-gray-600`}>Advisor: {edu.advisor}</p>
                            )}
                            {edu.gpa && (
                              <p className={`${fontSizeClass} text-gray-600`}>{edu.gpa}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Dot indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {education.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeEducation === index ? 'bg-purple-500 scale-125' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Two-column layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <div className="flex flex-col justify-center">
              <div className="text-center lg:text-left">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Academic Experience</h2>
                <p className="text-sm lg:text-base text-gray-600 mt-2 lg:mt-3">
                  My educational journey and academic achievements
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 -ml-6"></div>

            {/* Education */}
            <div className="mb-4 lg:mb-6">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center">
                <GraduationCap className="h-3 w-3 lg:h-4 lg:w-4 mr-2 text-primary-600" />
                Education
              </h3>
              <div className="space-y-3 lg:space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id} className="relative">
                    {/* Timeline dot for this education - aligned with title */}
                    <div className="absolute left-0 top-8 w-3 h-3 bg-gray-400 rounded-full -ml-6 transform -translate-x-1/2 border-2 border-white shadow-sm"></div>
                    
                    <div className="card border-r-4 border-r-purple-500 py-3 lg:py-4">
                      <div className="flex items-start space-x-3 lg:space-x-4">
                        <div className="flex-shrink-0">
                          <InstitutionLogo edu={edu} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <div>
                              <h4 className="text-sm lg:text-base font-semibold text-gray-900">{edu.degree}</h4>
                              <p className="text-xs lg:text-sm text-primary-600 font-medium">{edu.institution}</p>
                              <p className="text-xs text-gray-600">{edu.location}</p>
                            </div>
                            <div className="mt-1 md:mt-0 text-right">
                              <p className="text-xs text-gray-500">{edu.period}</p>
                            </div>
                          </div>
                          <p className="text-xs lg:text-sm text-gray-700 mb-1.5">{edu.description}</p>
                          {edu.advisor && (
                            <p className="text-xs text-gray-600">Advisor: {edu.advisor}</p>
                          )}
                          {edu.gpa && (
                            <p className="text-xs text-gray-600">{edu.gpa}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AcademicExperience 