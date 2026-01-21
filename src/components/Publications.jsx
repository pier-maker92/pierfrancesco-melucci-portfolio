import React, { useEffect, useState, useRef } from 'react'
import { BookOpen, Calendar, Users, ExternalLink } from 'lucide-react'

const Publications = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activePublication, setActivePublication] = useState(0)
  const [activePatent, setActivePatent] = useState(0)
  const pubCarouselRef = useRef(null)
  const patentCarouselRef = useRef(null)
  const contentRef = useRef(null)
  const timelineRef = useRef(null)

  const publications = [
    {
      id: 1,
      title: 'Towards Realistic Synthetic Data for Automatic Drum Transcription',
      authors: 'P. Melucci, P. Merialdo, T. Akama',
      venue: 'arXiv',
      year: '2026',
      url: 'https://arxiv.org/abs/2601.09520',
      isPreprint: true
    },
    {
      id: 2,
      title: 'How to Connect Speech Foundation Models and Large Language Models?',
      authors: 'F. Verdini, P. Melucci, S. Perna, F. Cariaggi, et al',
      venue: 'Interspeech',
      year: '2025',
      url: 'https://arxiv.org/abs/2409.17044'
    },
    {
      id: 3,
      title: 'Exploiting Music Source Separation For Singing Voice Detection',
      authors: 'F. Bonzi, M. Mancusi, S. Del Deo, P. Melucci, M. S. Tavella, L. Parisi, E. Rodolà',
      venue: 'IEEE',
      year: '2023',
      url: 'https://ieeexplore.ieee.org/document/10285863'
    }
  ]

  const patents = [
    {
      id: 4,
      title:
        'Systems and Methods for Generating Content Containing Automatically Synchronized Video, Audio, and Text',
      authors: 'N. Chathong, D. Farinelli, D. S. Giliberto, P. Melucci, A. Menegazzo',
      month: 'September',
      year: '2024',
      url: 'https://patents.google.com/patent/US20240303888A1/en'
    },
    {
      id: 5,
      title: 'Systems and Methods for Artificial Intelligence Assistant Publishing',
      authors: 'M. S. Tavella, L. Parisi, M. Bracci, G. Costantino, F. Delfino, P. Melucci',
      month: 'December',
      year: '2023',
      url: 'https://patents.google.com/patent/US20230409870A1/en'
    },
    {
      id: 6,
      title: 'Method and system for analyizing, classifying, and node-ranking content in audio tracks',
      authors: 'L. Parisi, M. Paglia, A. Albano, P. Magnani, P. Melucci, M. S. Tavella',
      month: 'January',
      year: '2023',
      url: 'https://scholar.google.com/citations?view_op=view_citation&hl=it&user=Y3CbKMIAAAAJ&citation_for_view=Y3CbKMIAAAAJ:9yKSN-GCB0IC'
    }
  ]

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

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
      if (pubCarouselRef.current) {
        const scrollLeft = pubCarouselRef.current.scrollLeft
        const itemWidth = pubCarouselRef.current.firstChild?.firstChild?.offsetWidth || 1
        setActivePublication(getActiveIndex(scrollLeft, itemWidth, publications.length))
      }
    }
    const node = pubCarouselRef.current
    if (node) node.addEventListener('scroll', handleScroll)
    return () => node && node.removeEventListener('scroll', handleScroll)
  }, [publications.length])

  useEffect(() => {
    const handleScroll = () => {
      if (patentCarouselRef.current) {
        const scrollLeft = patentCarouselRef.current.scrollLeft
        const itemWidth = patentCarouselRef.current.firstChild?.firstChild?.offsetWidth || 1
        setActivePatent(getActiveIndex(scrollLeft, itemWidth, patents.length))
      }
    }
    const node = patentCarouselRef.current
    if (node) node.addEventListener('scroll', handleScroll)
    return () => node && node.removeEventListener('scroll', handleScroll)
  }, [patents.length])

  // Update timeline height based on content
  useEffect(() => {
    const updateTimelineHeight = () => {
      if (contentRef.current && timelineRef.current) {
        const contentHeight = contentRef.current.scrollHeight
        timelineRef.current.style.height = `${contentHeight}px`
      }
    }
    updateTimelineHeight()
    window.addEventListener('resize', updateTimelineHeight)
    return () => window.removeEventListener('resize', updateTimelineHeight)
  }, [publications.length, patents.length])

  const Card = ({ children, color, onClick, className = "" }) => (
    <div
      onClick={onClick}
      className={`card bg-white border-l-4 ${color} px-4 py-6 lg:py-3 cursor-pointer hover:shadow-lg transition relative h-full flex flex-col ${className}`}
    >
      <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-gray-400" />
      {children}
    </div>
  )

  return (
    <section id="publications" className="bg-gray-50 py-16 lg:py-16 min-h-screen lg:min-h-0 flex items-center lg:items-start pt-20 lg:pt-16">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8">

          {/* CONTENT */}
          <div className="col-span-8 relative overflow-y-scroll max-h-[600px] pr-2" style={{ scrollbarWidth: 'thin' }} ref={contentRef}>

            {/* TIMELINE LINE (own column) */}
            <div ref={timelineRef} className="absolute right-10 top-0 w-px bg-gray-300 z-0" />

            {/* PUBLICATIONS */}
            <div className="space-y-6">
              {publications.map(pub => (
                <div
                  key={pub.id}
                  className="grid grid-cols-[1fr_64px] items-start"
                >
                  {/* CARD */}
                  <div className="pr-2">
                    <Card
                      color="border-l-primary-500"
                      onClick={() => window.open(pub.url, '_blank')}
                    >
                      {pub.isPreprint && (
                        <span className="absolute bottom-3 right-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 z-10">
                          Preprint
                        </span>
                      )}
                      <h3 className="font-semibold leading-tight">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        <Users className="inline w-3 h-3 mr-1" />
                        {pub.authors}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <BookOpen className="inline w-3 h-3 mr-1" />
                        {pub.venue} · {pub.year}
                      </p>
                    </Card>
                  </div>

                  {/* DOT */}
                  <div className="flex justify-center pt-6">
                    <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow z-10" />
                  </div>
                </div>
              ))}
            </div>

            {/* PATENTS */}
            <div className="mt-10">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Patents
              </h3>

              <div className="space-y-6">
                {patents.map(pat => (
                  <div
                    key={pat.id}
                    className="grid grid-cols-[1fr_64px] items-start"
                  >
                    {/* CARD */}
                    <div className="pr-2">
                      <Card
                        color="border-l-green-500"
                        onClick={() => window.open(pat.url, '_blank')}
                      >
                        <h3 className="font-semibold leading-tight">
                          {pat.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">
                          <Users className="inline w-3 h-3 mr-1" />
                          {pat.authors}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          {pat.month} {pat.year}
                        </p>
                      </Card>
                    </div>

                    {/* DOT */}
                    <div className="flex justify-center pt-6">
                      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow z-10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TITLE COLUMN */}
          <div className="col-span-4 flex items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Publications
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Research contributions and intellectual property
              </p>
            </div>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="lg:hidden">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Publications
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2">
              Research contributions and intellectual property
            </p>
          </div>

          {/* Publications Row */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-4 px-4">
              Publications
            </h3>
            <div className="overflow-x-auto scrollbar-hide" ref={pubCarouselRef}>
              <div className="flex space-x-6 px-4 pb-4 items-stretch">
                {publications.map((pub) => (
                  <div key={pub.id} className="flex-shrink-0 w-[70vw] flex">
                    <Card
                      color="border-l-primary-500"
                      onClick={() => window.open(pub.url, '_blank')}
                    >
                      {pub.isPreprint && (
                        <span className="absolute bottom-3 right-8 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 z-10">
                          Preprint
                        </span>
                      )}
                      <h3 className="font-semibold leading-tight text-sm md:text-base flex-grow">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-4">
                        <Users className="inline w-3 h-3 mr-1" />
                        {pub.authors}
                      </p>
                      <p className="text-xs text-gray-500 mt-4">
                        <BookOpen className="inline w-3 h-3 mr-1" />
                        {pub.venue} · {pub.year}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            {/* Publications Dot indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {publications.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activePublication === index ? 'bg-primary-500 scale-125' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Patents Row */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 px-4">
              Patents
            </h3>
            <div className="overflow-x-auto scrollbar-hide" ref={patentCarouselRef}>
              <div className="flex space-x-6 px-4 pb-4 items-stretch">
                {patents.map((pat) => (
                  <div key={pat.id} className="flex-shrink-0 w-[70vw] flex">
                    <Card
                      color="border-l-green-500"
                      onClick={() => window.open(pat.url, '_blank')}
                    >
                      <h3 className="font-semibold leading-tight text-sm md:text-base flex-grow">
                        {pat.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-4">
                        <Users className="inline w-3 h-3 mr-1" />
                        {pat.authors}
                      </p>
                      <p className="text-xs text-gray-500 mt-4">
                        <Calendar className="inline w-3 h-3 mr-1" />
                        {pat.month} {pat.year}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            {/* Patents Dot indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {patents.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activePatent === index ? 'bg-green-500 scale-125' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Publications
