import { useState, useRef } from 'react'
import { FaSpotify, FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa'

function App() {
  // Tracks if the user has clicked "Enter"
  const [entered, setEntered] = useState(false)

  // Video Player Reference
  const videoRef = useRef(null)

  const handleEnter = () => {
    setEntered(true)
    // When the user clicks, unmute and play the video
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.5; // 50%
      videoRef.current.play().catch(e => console.log("Playback error:", e));
    }
  }

  return (
    <div className="min-h-screen text-white font-sans overflow-hidden">
      {/* BACKGROUND VIDEO */}
      {/* It sits behind everything (-z-10) */}
      <video
        ref={videoRef}
        loop
        // Starts muted until the user interacts, due to browser policy
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 brightness-50 scale-150"
      >
        <source src="/background.mp4" type="video/mp4"/>
      </video>

      {/* CLICK TO ENTER OVERLAY */}
      {/* Only shows if !entered is true */}
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
      {/* Only shows if entered is true */}
      {entered && (
        <main className="flex items-center justify-center min-h-screen p-4 animate-fade-in">
          {/* The Glass Box */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-2xl max-w-md w-full text-center shadow-2xl">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-white/20 shadow-lg"
              />
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold mb-2 tracking-wide">Athanasios Davaris</h1>

            {/* Info Lines */}
            <div className="text-gray-300 text-sm mb-8 space-y-1 font-light">
              <p>Informatics & Telecommunications Student</p>
              <p>Full Stack Developer</p>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 text-2xl">
              <a href="#" target="_blank" className="hover:text-green-400 hover:scale-110 transition duration-300"><FaSpotify /></a>
              <a href="#" target="_blank" className="hover:text-pink-500 hover:scale-110 transition duration-300"><FaInstagram /></a>
              <a href="#" target="_blank" className="hover:text-blue-500 hover:scale-110 transition duration-300"><FaLinkedin /></a>
              <a href="#" target="_blank" className="hover:text-gray-400 hover:scale-110 transition duration-300"><FaGithub /></a>
              <a href="mailto:davthn08@gmail.com" className="hover:text-red-400 hover:scale-110 transition duration-300"><FaEnvelope/></a>
            </div>

          </div>
        </main>
      )}
    </div>
  )
}

export default App