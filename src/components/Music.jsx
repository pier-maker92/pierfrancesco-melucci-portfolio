import React, { useRef, useState, useEffect } from 'react'
import { ExternalLink, Music2, Play } from 'lucide-react'
import frontAlbum from '../assets/music/frontAlbum.jpg'

// Manual Update System for Spotify Statistics
const SPOTIFY_STATS = {
  lastUpdated: '2024-12-27', // Update this date when you refresh the numbers
  totalStreams: 756861,      // Update with current total streams
  monthlyListeners: 12061,   // Update with current monthly listeners

  // Individual track streams (optional - for future use)
  tracks: {
    'Game of Love': 385636,
    'Harder': 77281,
    'Nobody But Me': 73337,
    'Flower': 53827,
    'Let\'s Play': 50381
  }
}

// Helper function to format numbers
const formatStreams = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toString()
}

const Music = () => {
  // Mobile carousel active dot logic
  const [activeMusic, setActiveMusic] = useState(0)
  const musicCarouselRef = useRef(null)

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
      if (musicCarouselRef.current) {
        const scrollLeft = musicCarouselRef.current.scrollLeft
        const itemWidth = musicCarouselRef.current.firstChild?.firstChild?.offsetWidth || 1
        setActiveMusic(getActiveIndex(scrollLeft, itemWidth, 2))
      }
    }
    const node = musicCarouselRef.current
    if (node) node.addEventListener('scroll', handleScroll)
    return () => node && node.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="music" className="h-[calc(100vh-1rem)] lg:h-[calc(100vh-1rem)] relative overflow-hidden flex items-center mt-4 pt-20 lg:pt-0">
      {/* Gradient Background inspired by album colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/30 via-orange-300/20 to-blue-400/30 backdrop-blur-3xl"></div>

      {/* Mobile Background Album Photo */}
      <div className="lg:hidden absolute inset-0 z-0">
        <img
          src={frontAlbum}
          alt="Unword Album Cover"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-400/40 via-orange-300/30 to-blue-400/40"></div>
      </div>

      {/* Desktop Album Photo */}
      <div className="hidden lg:block absolute bottom-16 lg:bottom-20 left-4 lg:left-8 w-[65%] h-[60%] opacity-90 z-10">
        <img
          src={frontAlbum}
          alt="Unword Album Cover"
          className="w-full h-full object-cover rounded-3xl shadow-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full flex flex-col justify-center">

        {/* Mobile Title Section */}
        <div className="lg:hidden text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/90 rounded-full mb-4 shadow-lg">
            <Music2 className="h-6 w-6 md:h-7 md:w-7 text-orange-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-purple-800 bg-clip-text text-transparent mb-2 md:mb-3">
            Artistic Activity
          </h2>
          <p className="text-sm md:text-base bg-gradient-to-r from-red-500 via-orange-500 to-blue-500 bg-clip-text text-transparent">
            From classical foundations to contemporary fusion
          </p>
        </div>

        {/* Mobile Horizontal Carousel */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide" ref={musicCarouselRef}>

            {/* Mobile Musical Journey Card - First */}
            <div className="flex-none w-72 md:w-80 bg-white/85 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-xl border border-white/50 snap-start flex flex-col justify-center">
              <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent mb-2 md:mb-3">My Journey in Music</h3>
              <div className="prose prose-sm text-gray-700 leading-relaxed space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <p>
                  My musical journey began with classical piano studies at the conservatory, developing deep understanding of musical structure and technique.
                </p>
                <p>
                  After earning my conservatory diploma in 2014, I explored jazz music, performing at numerous concerts and gigs across Italy, learning to communicate emotion through spontaneous musical conversation.
                </p>
                <p>
                  This classical-jazz foundation led me to explore the intersection of acoustic and electronic sounds, incorporating elements of hip-hop, soul, and R&B into my musical vocabulary.
                </p>
                <p>
                  This evolution culminated in the formation of Unword, where traditional musicianship meets contemporary production, pushing the boundaries of genre while maintaining a deeply personal artistic vision.
                </p>
              </div>
            </div>

            {/* Mobile Unword Project Card - Second */}
            <div className="flex-none w-72 md:w-80 bg-gradient-to-br from-orange-500/90 via-red-500/90 to-blue-600/90 rounded-2xl p-3 md:p-4 text-white shadow-xl snap-start">
              <div className="flex flex-col mb-2 md:mb-3">
                <h3 className="text-lg md:text-xl font-bold mb-1.5">Unword</h3>
                <div className="text-left">
                  <p className="text-orange-100 text-sm font-semibold">
                    {formatStreams(SPOTIFY_STATS.totalStreams)}+ total streams
                  </p>
                  <p className="text-orange-200 text-xs">
                    {SPOTIFY_STATS.monthlyListeners.toLocaleString()} monthly listeners
                  </p>
                </div>
              </div>
              <p className="text-orange-100 mb-2 md:mb-3 text-xs md:text-sm">Hip Dozer Label • 2024</p>

              <p className="text-orange-100 mb-3 md:mb-4 leading-relaxed text-xs md:text-sm">
                Unword represents the culmination of my musical exploration. An 8-track debut album weaving intricate emotional narratives through jazz and hip-hop fusion.
              </p>

              {/* Spotify Player */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-3 mb-3 md:mb-4">
                <h4 className="text-sm md:text-base font-semibold mb-1.5 md:mb-2 flex items-center">
                  <Play className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Listen to Unword
                </h4>
                <iframe
                  src="https://open.spotify.com/embed/artist/0TOfKX2G0vTNKBi8INbutt?utm_source=generator&theme=0"
                  width="100%"
                  height="200"
                  frameBorder="0"
                  allowfullscreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-1.5 md:gap-2">
                <a
                  href="https://open.spotify.com/intl-it/artist/0TOfKX2G0vTNKBi8INbutt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg px-3 md:px-4 py-2 md:py-3 font-medium transition-colors duration-300 text-xs md:text-sm"
                >
                  <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Open in Spotify
                </a>
                <a
                  href="https://hipdozer.bandcamp.com/album/unword"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg px-3 md:px-4 py-2 md:py-3 font-medium transition-colors duration-300 text-xs md:text-sm"
                >
                  <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  View on Bandcamp
                </a>
              </div>
            </div>

          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {[0, 1].map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeMusic === index ? 'bg-orange-400 scale-125' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Hidden on Mobile */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Unword Project Card */}
          <div>
            <div className="bg-gradient-to-br from-orange-500/90 via-red-500/90 to-blue-600/90 rounded-2xl p-4 lg:p-6 text-white shadow-xl relative z-30">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <h3 className="text-lg lg:text-xl font-bold">Unword</h3>
                <div className="text-right">
                  <p className="text-orange-100 text-sm font-semibold">
                    {formatStreams(SPOTIFY_STATS.totalStreams)}+ total streams
                  </p>
                  <p className="text-orange-200 text-xs">
                    {SPOTIFY_STATS.monthlyListeners.toLocaleString()} monthly listeners
                  </p>
                </div>
              </div>
              <p className="text-orange-100 mb-3 lg:mb-4 text-xs lg:text-sm">Hip Dozer Label • 2024</p>

              <p className="text-orange-100 mb-4 lg:mb-5 leading-relaxed text-xs lg:text-sm">
                Unword represents the culmination of my musical exploration. It is an 8-track debut album that weaves intricate emotional narratives through the fusion of jazz sensibilities and hip-hop production. Created in collaboration with producer Alessio Volpe and vocalist Alessia Sciotto, the project features contributions from talented artists, pushing the boundaries of genre while maintaining a deeply personal artistic vision.
              </p>

              {/* Spotify Player */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4 mb-3 lg:mb-4">
                <h4 className="text-sm lg:text-base font-semibold mb-2 lg:mb-3 flex items-center">
                  <Play className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                  Listen to Unword
                </h4>
                <iframe
                  src="https://open.spotify.com/embed/artist/0TOfKX2G0vTNKBi8INbutt?utm_source=generator&theme=0"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allowfullscreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <a
                  href="https://open.spotify.com/intl-it/artist/0TOfKX2G0vTNKBi8INbutt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg px-4 py-3 font-medium transition-colors duration-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Spotify
                </a>
                <a
                  href="https://hipdozer.bandcamp.com/album/unword"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg px-4 py-3 font-medium transition-colors duration-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Bandcamp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Title and Musical Journey */}
          <div>
            {/* Title */}
            <div className="mb-6 lg:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white/90 rounded-full mb-4 lg:mb-5 shadow-lg">
                <Music2 className="h-6 w-6 lg:h-7 lg:w-7 text-orange-600" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-800 bg-clip-text text-transparent mb-2 lg:mb-3">
                Artistic Activity
              </h2>
              <p className="text-base lg:text-lg bg-gradient-to-r from-red-500 via-orange-500 to-blue-500 bg-clip-text text-transparent">
                From classical foundations to contemporary fusion
              </p>
            </div>

            {/* Musical Journey Card - positioned above the photo */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-xl border border-white/50 relative z-30">
              <h3 className="text-base lg:text-lg font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent mb-3 lg:mb-4">My Journey in Music</h3>
              <div className="prose prose-sm text-gray-700 leading-relaxed text-xs lg:text-sm">
                <p className="mb-4">
                  My musical journey began with classical piano studies at the conservatory, where I developed a deep understanding of musical structure and technique. This rigorous foundation provided me with the discipline and technical skills that would later prove invaluable in my artistic evolution.
                </p>
                <p className="mb-4">
                  After earning my conservatory diploma in 2014, I found myself drawn to the expressive freedom and improvisational nature of jazz. I spent years immersing myself in this genre, performing at numerous concerts and gigs across Italy, where I learned to communicate emotion through spontaneous musical conversation.
                </p>
                <p>
                  This classical-jazz foundation eventually led me to explore the intersection of acoustic and electronic sounds, incorporating elements of hip-hop, soul, and R&B into my musical vocabulary. This evolution culminated in the formation of Unword, where traditional musicianship meets contemporary production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Music