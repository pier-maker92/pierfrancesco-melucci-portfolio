import React from 'react'
import { Mail, Linkedin, Github, MapPin, GraduationCap } from 'lucide-react'
import profileImage from '../assets/profile.jpg'

const Hero = () => {
  const researchAreas = [
    "Multimodal LLM",
    "Speech and Audio Generation",
    "Explainable AI",
    "Diffusion Models"
  ]

  return (
    <section id="hero" className="h-screen flex items-center justify-center pt-20 md:pt-0 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center flex flex-col items-center justify-center h-full">
          <div className="mb-4 md:mb-3">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={profileImage}
                alt="Pierfrancesco Melucci"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3">
            Pierfrancesco Melucci
          </h1>

          <p className="text-base md:text-xl lg:text-2xl text-gray-600 mb-3 md:mb-4">
            PhD Student
          </p>

          <div className="flex items-center justify-center text-gray-600 mb-4 md:mb-5">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="text-xs md:text-sm lg:text-base">La Sapienza, University of Rome</span>
          </div>

          <p className="text-sm md:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto mb-4 md:mb-5 leading-relaxed px-4">
            Welcome to my academic homepage. I am a PhD student in AI at Sapienza University of Rome, with research interests in multimodality, multimodal LLMs, and audio understanding and generation for speech and music domains.
          </p>

          <div className="flex justify-center flex-wrap gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-5">
            <a href="mailto:pierfrancesco.melucci@gmail.com"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-300 text-xs md:text-sm">
              <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Email
            </a>
            <a href="https://www.linkedin.com/in/pierfrancesco-melucci-86856a12a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-300 text-xs md:text-sm">
              <Linkedin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              LinkedIn
            </a>
            <a href="https://github.com/pier-maker92"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-300 text-xs md:text-sm">
              <Github className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              GitHub
            </a>
            <a href="https://scholar.google.com/citations?user=Y3CbKMIAAAAJ&hl=it"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-300 text-xs md:text-sm">
              <GraduationCap className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Scholar
            </a>
          </div>

          {/* Research Areas */}
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3 font-medium">Research Areas</p>
            <div className="flex flex-wrap justify-center gap-1 md:gap-1.5">
              {researchAreas.map((area, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 md:px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium bg-white/70 border border-gray-200 text-gray-700 hover:bg-white hover:border-primary-200 transition-colors duration-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 