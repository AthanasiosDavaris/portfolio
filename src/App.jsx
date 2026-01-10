import { useState, useRef } from 'react'
import { FaSpotify, FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

function App() {
  // Tracks if the user has clicked "Enter"
  const [entered, setEntered] = useState(false)

  // Volume State
  const [volume, setVolume] = useState(0.5) // Starts at 50%
  const [isMuted, setIsMuted] = useState(false) // Starts unmuted (duhhh)

  // Video Player Reference
  const videoRef = useRef(null)

  const handleEnter = () => {
    setEntered(true)
    // When the user clicks, unmute and play the video
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.5;
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
    <div className="min-h-screen text-white font-sans overflow-hidden relative">

      {/* BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 brightness-50 scale-150"
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
        <main className="absolute inset-0 flex items-center justify-center w-full h-full animate-fade-in">

          {/* The Glass Box */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-2xl max-w-md w-full text-center shadow-2xl mx-4">
            
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
              <p>Full Stack Developer</p>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 text-2xl">
              <a href="https://open.spotify.com/user/stopitoniichan?si=409be6ab41724436" target="_blank" className="hover:text-green-400 hover:scale-110 transition duration-300"><FaSpotify /></a>
              <a href="https://www.instagram.com/_.than0sss.__/" target="_blank" className="hover:text-pink-500 hover:scale-110 transition duration-300"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/athanasios-davaris-8483a9338" target="_blank" className="hover:text-blue-500 hover:scale-110 transition duration-300"><FaLinkedin /></a>
              <a href="https://github.com/AthanasiosDavaris" target="_blank" className="hover:text-gray-400 hover:scale-110 transition duration-300"><FaGithub /></a>
              <a href="mailto:davthn08@gmail.com" className="hover:text-red-400 hover:scale-110 transition duration-300"><FaEnvelope/></a>
            </div>
          </div>

          {/* VOLUME CONTROL (Bottom Right) */}
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