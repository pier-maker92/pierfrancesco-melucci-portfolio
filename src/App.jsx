import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WorkExperience from './components/WorkExperience'
import Music from './components/Music'
import AcademicExperience from './components/AcademicExperience'
import Publications from './components/Publications'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      <Header />
      <div className="w-full md:ml-64 lg:w-[70vw] lg:ml-[calc(128px+15vw)]">
        <main>
          <Hero />
          <WorkExperience />
          <Publications />
          <AcademicExperience />
          <Music />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App 