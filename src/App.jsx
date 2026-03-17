import { useState, useRef } from 'react'
import { FaSpotify, FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaVolumeUp, FaVolumeMute, FaChevronDown, FaCode, FaServer, FaSearch } from 'react-icons/fa'

function App() {
  // Tracks if the user has clicked "Enter"
  const [entered, setEntered] = useState(false)

  // Volume State
  const [volume, setVolume] = useState(0.1) // Starts at 10%
  const [isMuted, setIsMuted] = useState(false) // Starts unmuted (duhhh)

  // Video Player Reference
  const videoRef = useRef(null)

  const handleEnter = () => {
    setEntered(true)
    // When the user clicks, unmute and play the video
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.1;
      videoRef.current.play().catch(e => console.log("Playback error:", e));
    }
  }

  // Volume Slider Handler
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)

    if (videoRef.current) {
      videoRef.current.volume = newVolume
      // If user slides to 0, gets treated as muted
      if (newVolume === 0) {
        setIsMuted(true)
        videoRef.current.muted = true
      } else {
        setIsMuted(false)
        videoRef.current.muted = false
      }
    }
  }

  // Mute Toggle Handler
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  return (
    <div className="min-h-screen w-full text-white font-sans overflow-x-hidden relative bg-black">

      {/* BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-0 brightness-50 scale-150"
      >
        <source src="/background.mp4" type="video/mp4"/>
      </video>

      {/* CLICK TO ENTER OVERLAY */}
      {!entered && (
        <div
          onClick={handleEnter}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-point"
        >
          <p className="text-xl tracking-[0.5em] animate-pulse text-gray-400 hover:text-white transition-colors">
            [ CLICK TO ENTER... ]
          </p>
        </div>
      )}

      {/* MAIN CONTENT */}
      {entered && (
        <main className="relative z-10 flex flex-col items-center w-full animate-fade-in">

          {/* Section 1: Profile */}
          <section className="min-h-screen flex flex-col items-center justify-center w-full p-4 relative">
            {/* The Glass Box */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-2xl max-w-md w-full text-center shadow-2xl">
              
              {/* Profile Picture */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white/20 shadow-lg hover:scale-110 hover:border-white transition duration-300 cursor-pointer"
                />
              </div>

              {/* Name */}
              <h1 className="text-3xl font-bold mb-2 tracking-wide text-white">Athanasios Davaris</h1>

              {/* Info Lines */}
              <div className="text-gray-300 text-sm mb-8 space-y-1 font-light">
                <p>Informatics & Telecommunications Student</p>
                <p>Full Stack Developer | Upcoming Software Architect - System Design</p>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center gap-6 text-2xl text-white">
                <a href="https://open.spotify.com/user/stopitoniichan?si=409be6ab41724436" target="_blank" className="hover:text-green-400 hover:scale-110 transition duration-300"><FaSpotify /></a>
                <a href="https://www.instagram.com/_.than0sss.__/" target="_blank" className="hover:text-pink-500 hover:scale-110 transition duration-300"><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/athanasios-davaris-8483a9338" target="_blank" className="hover:text-blue-500 hover:scale-110 transition duration-300"><FaLinkedin /></a>
                <a href="https://github.com/AthanasiosDavaris" target="_blank" className="hover:text-gray-400 hover:scale-110 transition duration-300"><FaGithub /></a>
                <a href="mailto:davthn08@gmail.com" className="hover:text-red-400 hover:scale-110 transition duration-300"><FaEnvelope/></a>
              </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 animate-bounce text-white/50 flex flex-col items-center">
              <span className="text-xs tracking-widest mb-2 uppercase">Scroll</span>
              <FaChevronDown size={20} />
            </div>
          </section>

          {/* Section 2: Skills */}
          <section className="w-full max-w-4xl p-4 mb-12">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2 tracking-wider">
                Skills & Technologies
              </h2>

              <div className="flex flex-wrap gap-3">
                {/* Skill Pills */}
                {['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'PHP', 'Python', 'Flask', 'Docker', 'Elasticsearch', 'Git', 'GitHub'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/5 rounded-full text-sm font-medium transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Projects */}
          <section className="w-full max-w-4xl p-4 mb-12">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2 tracking-wider">
                Featured Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Project 1 */} 
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                  <FaSearch className="text-3xl mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2">Search Engine</h3>
                  <p className="text-gray-400 text-sm mb-4">A full-stack search engine utilizing Docker for containerization and Elasticsearch for rapid, scalable data retrieval.</p>
                  <div className="flex gap-2 text-xs text-gray-300">
                    <span className="bg-black/50 px-2 py-1 rounded">Python</span>
                    <span className="bg-black/50 px-2 py-1 rounded">Flask</span>
                    <span className="bg-black/50 px-2 py-1 rounded">Docker</span>
                    <span className="bg-black/50 px-2 py-1 rounded">Elastic</span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                  <FaSearch className="text-3xl mb-4 text-green-400" />
                  <h3 className="text-xl font-semibold mb-2">Erasmus Platform</h3>
                  <p className="text-gray-400 text-sm mb-4">A full-stack university platform built to manage and facilitate the Erasmus student exchange program.</p>
                  <div className="flex gap-2 text-xs text-gray-300">
                    <span className="bg-black/50 px-2 py-1 rounded">PHP</span>
                    <span className="bg-black/50 px-2 py-1 rounded">HTML/CSS</span>
                    <span className="bg-black/50 px-2 py-1 rounded">JavaScript</span>
                    <span className="bg-black/50 px-2 py-1 rounded">API Calls</span>
                  </div>
                </div>

                {/* Project 3 */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                  <FaSearch className="text-3xl mb-4 text-pink-400" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Portfolio</h3>
                  <p className="text-gray-400 text-sm mb-4">This very website! A modern, responsive CV built with React, featuring glassmorphism UI and dynamic video backgrounds.</p>
                  <div className="flex gap-2 text-xs text-gray-300">
                    <span className="bg-black/50 px-2 py-1 rounded">React</span>
                    <span className="bg-black/50 px-2 py-1 rounded">Tailwind CSS</span>
                    <span className="bg-black/50 px-2 py-1 rounded">Vite</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 4: Languages & Education */}
          <section className="w-full max-w-4xl p-4 mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Education */}
              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2 tracking-wider">Education</h2>
                <h3 className="font-semibold text-lg">Studying Informatics & Telecommunications</h3>
                <p className="text-gray-400 text-sm mt-1">Currently studying and expanding my knowledge in software engineering, algorithms, and full-stack development.</p>
              </div>

              {/* Languages */}
              <div className="bg-black/40 backdrop-blur-md border border/white/10 p-8 rounded-2xl">
                <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2 tracking-wider">Languages</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Greek</span>
                    <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">Native</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">English</span>
                    <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">Fluent</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* VOLUME CONTROL (Fixed Bottom Right) */}
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-lg hover:bg-black/80 transition">

            <button onClick={toggleMute} className="text-white hover:text-gray-300 transition">
              {isMuted || volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
          
        </main>
      )}
    </div>
  )
}

export default App