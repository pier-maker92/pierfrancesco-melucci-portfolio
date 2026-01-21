import React, { useState, useEffect, useMemo } from 'react'
import { Calendar, MapPin } from 'lucide-react'
import sonyCslLogo from '../assets/companies/sony-csl-logo.jpg'
import translatedLogo from '../assets/companies/translated-logo.png'
import paboloLogo from '../assets/companies/pabolo-logo.png'
import musixmatchLogo from '../assets/companies/musixmatch-logo.png'

const WorkExperience = () => {
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
  const experiences = [
    {
      id: 1,
      title: "Research Assistant",
      company: "Sony CSL",
      location: "Tokyo, Japan",
      period: "July 2025 - Present",
      logo: sonyCslLogo,
      description: [
        "Conducted research in AI applied to the music field.",
        <span>Published preprint: <a href="https://arxiv.org/abs/2601.09520" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 font-medium border-b border-gray-300 hover:border-primary-500 transition-colors duration-200">Towards Realistic Synthetic Data for Automatic Drum Transcription</a></span>
      ]
    },
    {
      id: 2,
      title: "Research Scientist",
      company: "Translated",
      location: "Rome, Italy",
      period: "April 2024 - April 2025",
      logo: translatedLogo,
      description: [
        <span>Researched speech and multimodal AI within the <a href="https://www.meetween.eu/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 font-medium border-b border-gray-300 hover:border-primary-500 transition-colors duration-200">Meetween</a> project.</span>,
        <span>Co-developed the first release of <a href="https://huggingface.co/collections/meetween/speechlmm-v1-687671f454992bed468d59bf" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 font-medium border-b border-gray-300 hover:border-primary-500 transition-colors duration-200">SpeechLMM</a>, Multimodal-LLM for speech understanding and generation.</span>,
        <span><a href="https://api.wandb.ai/links/meetween/5ruw1tie" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 font-medium border-b border-gray-300 hover:border-primary-500 transition-colors duration-200">SpeechLMM training journal</a></span>
      ]
    },
    {
      id: 3,
      title: "AI Engineer",
      company: "Pabolo",
      location: "Karlsruhe, Germany",
      period: "June 2023 - November 2023",
      logo: paboloLogo,
      description: [
        "Training operations on diffusion models for video generation.",
        "Developed and optimized data pipelines for efficient handling and processing of large-scale datasets.",
      ]
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Musixmatch",
      location: "Bologna, Italy",
      period: "December 2020 - June 2023",
      logo: musixmatchLogo,
      description: [
        "Applied Natural Language Processing (NLP) and Music Information Retrieval (MIR) to music and lyrics.",
        "Developed neural network systems for automatic song structure detection from lyrics, deployed at scale for millions of songs."
      ]
    }
  ]

  // Calculate optimal height based on content
  const calculateOptimalHeight = useMemo(() => {
    const maxContentLength = Math.max(
      ...experiences.map(exp => {
        const titleLength = exp.title?.length || 0
        const companyLength = exp.company?.length || 0
        const descriptionLength = exp.description?.reduce((acc, desc) => acc + desc.length, 0) || 0
        return titleLength + companyLength + descriptionLength
      })
    )

    // Base height + dynamic height based on content
    const baseHeight = 375 // Reduced base height for more compact cards
    const contentFactor = Math.ceil(maxContentLength / 180) // 180 chars per height unit
    const dynamicHeight = baseHeight + (contentFactor * 32) // 32px per content unit (reduced from 35px)

    // Adjust for narrow screens
    const adjustedHeight = isNarrowScreen ? dynamicHeight + 80 : dynamicHeight // Reduced from +100 to +80

    const finalHeight = Math.min(adjustedHeight, 620) // Cap at 620px max (reduced from 650px)

    // Apply mobile-specific 10% reduction when in mobile mode (was 15%, increased by 5%)
    return isMobile ? Math.floor(finalHeight * 0.9) : finalHeight
  }, [isNarrowScreen])

  // Get responsive classes
  const getResponsiveClasses = () => {
    const fontSizeClass = isNarrowScreen ? 'text-xs' : 'text-sm'
    const titleSizeClass = isNarrowScreen ? 'text-base' : 'text-lg'
    const companySize = isNarrowScreen ? 'text-sm' : 'text-base'
    return { fontSizeClass, titleSizeClass, companySize }
  }

  const { fontSizeClass, titleSizeClass, companySize } = getResponsiveClasses()

  // Function to get company initials as fallback
  const getCompanyInitials = (companyName) => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  // Component for displaying company logo or initials
  const CompanyLogo = ({ exp }) => {
    const [logoError, setLogoError] = React.useState(false)

    // Determine size based on company and mobile state
    const isSonyCSL = exp.company === "Sony CSL"
    const isMusixmatch = exp.company === "Musixmatch"
    const isPabolo = exp.company === "Pabolo"

    const getMobileSize = () => {
      if (isSonyCSL) {
        return { container: "w-24 h-24", image: "w-21 h-21", text: "text-xl" }
      }
      if (isMusixmatch) {
        return { container: "w-14 h-14", image: "w-12 h-12", text: "text-sm" }
      }
      if (isPabolo) {
        return { container: "w-14 h-14", image: "w-13 h-13", text: "text-sm" }
      }
      return { container: "w-16 h-16", image: "w-14 h-14", text: "text-base" }
    }

    const getDesktopSize = () => {
      if (isSonyCSL) {
        return { container: "w-16 h-16", image: "w-14 h-14", text: "text-base" }
      }
      if (isMusixmatch) {
        return { container: "w-10 h-10", image: "w-8 h-8", text: "text-xs" }
      }
      if (isPabolo) {
        return { container: "w-10 h-10", image: "w-8 h-8", text: "text-xs" }
      }
      return { container: "w-12 h-12", image: "w-10 h-10", text: "text-sm" }
    }

    const desktopSize = getDesktopSize()
    const mobileSize = getMobileSize()

    if (exp.logo && !logoError) {
      return (
        <div className={`${isMobile ? mobileSize.container : desktopSize.container} rounded-lg overflow-hidden flex items-center justify-center bg-white`}>
          <img
            src={exp.logo}
            alt={`${exp.company} logo`}
            className={`${isMobile ? mobileSize.image : desktopSize.image} object-contain`}
            onError={() => setLogoError(true)}
          />
        </div>
      )
    }

    // Fallback to company initials
    return (
      <div className={`${isMobile ? mobileSize.container : desktopSize.container} bg-primary-100 rounded-lg flex items-center justify-center border border-primary-200`}>
        <span className={`${isMobile ? mobileSize.text : desktopSize.text} font-bold text-primary-700`}>
          {getCompanyInitials(exp.company)}
        </span>
      </div>
    )
  }

  // State for active experience index (mobile carousel)
  const [activeExperience, setActiveExperience] = useState(0)
  const expCarouselRef = React.useRef(null)

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
      if (expCarouselRef.current) {
        const scrollLeft = expCarouselRef.current.scrollLeft
        const itemWidth = expCarouselRef.current.firstChild?.firstChild?.offsetWidth || 1
        setActiveExperience(getActiveIndex(scrollLeft, itemWidth, experiences.length))
      }
    }
    const node = expCarouselRef.current
    if (node) node.addEventListener('scroll', handleScroll)
    return () => node && node.removeEventListener('scroll', handleScroll)
  }, [experiences.length])

  return (
    <section id="work" className="h-[calc(100vh-1rem)] flex items-center bg-white mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mobile: Horizontal swipe carousel */}
        <div className="lg:hidden">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Work Experience</h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2">
              My professional journey combining research, development, and education
            </p>
          </div>

          {/* Experience Carousel */}
          <div className="overflow-x-auto scrollbar-hide" ref={expCarouselRef}>
            <div className="flex space-x-6 px-4 pb-4">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="flex-shrink-0 w-[70vw]">
                  <div className="card border-l-4 border-l-blue-500" style={{ height: isMobile ? `${calculateOptimalHeight}px` : 'auto' }}>
                    {/* Mobile: Full-width layout */}
                    <div className="lg:hidden">
                      <div className="flex justify-center mb-4">
                        <CompanyLogo exp={exp} />
                      </div>
                      <div className="w-full">
                        <h3 className={`${titleSizeClass} font-semibold text-gray-900 mb-2 text-center`}>{exp.title}</h3>
                        <p className={`${companySize} text-primary-600 font-medium text-center mb-4`}>{exp.company}</p>
                        <div className={`flex flex-col items-center ${fontSizeClass} text-gray-500 mb-4 space-y-1`}>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {exp.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {exp.location}
                          </div>
                        </div>
                        <div className="w-full">
                          <ul className="space-y-3">
                            {exp.description.map((item, index) => (
                              <li key={index} className="text-gray-700 flex items-start">
                                <span className="flex-shrink-0 w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3"></span>
                                <span className={`${fontSizeClass} leading-relaxed break-words`}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Original layout */}
                    <div className="hidden lg:block">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <CompanyLogo exp={exp} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h3 className={`${titleSizeClass} font-semibold text-gray-900`}>{exp.title}</h3>
                              <p className={`${companySize} text-primary-600 font-medium`}>{exp.company}</p>
                            </div>
                            <div className={`mt-2 md:mt-0 flex flex-col md:items-end ${fontSizeClass} text-gray-500`}>
                              <div className="flex items-center mb-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                {exp.period}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {exp.location}
                              </div>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {exp.description.map((item, index) => (
                              <li key={index} className="text-gray-700 flex items-start">
                                <span className="flex-shrink-0 w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3"></span>
                                <span className={`${fontSizeClass} leading-relaxed break-words`}>{item}</span>
                              </li>
                            ))}
                          </ul>
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
            {experiences.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeExperience === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Desktop: Two-column layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <div className="flex flex-col justify-center">
              <div className="text-center lg:text-left">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Work Experience</h2>
                <p className="text-sm lg:text-base text-gray-600 mt-2 lg:mt-3">
                  My professional journey combining research, development, and education
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 -ml-6"></div>

            <div className="space-y-3 lg:space-y-4">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot for this experience - aligned with title */}
                  <div className="absolute left-0 top-8 w-3 h-3 bg-gray-400 rounded-full -ml-6 transform -translate-x-1/2 border-2 border-white shadow-sm"></div>

                  <div className="card border-r-4 border-r-blue-500 py-3 lg:py-4">
                    <div className="flex items-start space-x-3 lg:space-x-4">
                      <div className="flex-shrink-0">
                        <CompanyLogo exp={exp} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <div>
                            <h3 className="text-sm lg:text-base font-semibold text-gray-900">{exp.title}</h3>
                            <p className="text-xs lg:text-sm text-primary-600 font-medium">{exp.company}</p>
                          </div>
                          <div className="mt-1 md:mt-0 flex flex-col md:items-end text-xs text-gray-500">
                            <div className="flex items-center mb-0.5">
                              <Calendar className="h-3 w-3 mr-1" />
                              {exp.period}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                        <ul className="space-y-1 lg:space-y-1.5">
                          {exp.description.map((item, index) => (
                            <li key={index} className="text-xs lg:text-sm text-gray-700 flex items-start">
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-400 rounded-full mt-1.5 mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkExperience 