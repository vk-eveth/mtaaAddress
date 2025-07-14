// src/components/Hero.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import mtaaAnim from '../../assets/mtaaAnim.json';

export default function Hero() {
  return (
    <section
      className="snap-start relative bg-gradient-to-br from-green-900 via-green-700 to-green-600 text-white py-24 px-6 overflow-hidden"
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Left Content */}
        <div className="text-center md:text-left md:w-1/2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-2 text-sm uppercase tracking-wider font-semibold text-yellow-300"
          >
            New & Trusted
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
          >
            Get Your Digital <span className="text-yellow-300">Mtaa</span> Address 📍
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl mb-10 leading-relaxed text-white/90"
          >
            Empower your neighborhood with a verified digital address based on GPS and local landmarks.
          </motion.p>

          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-full text-lg font-bold shadow-xl transition"
              aria-label="Get Started"
            >
              📌 Start Now
            </Link>
          </motion.div>
        </div>

        {/* Right Animation */}
        <div className="mt-10 md:mt-0 md:w-1/2">
          <Lottie
            animationData={mtaaAnim}
            loop={true}
            className="w-full h-[300px] md:h-[400px]"
            aria-label="Local citizen using mobile to get address"
          />
        </div>
      </div>

      {/* Wave SVG Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[80px] md:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,256L40,234.7C80,213,160,171,240,160C320,149,400,171,480,197.3C560,224,640,256,720,266.7C800,277,880,267,960,245.3C1040,224,1120,192,1200,165.3C1280,139,1360,117,1400,106.7L1440,96L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}