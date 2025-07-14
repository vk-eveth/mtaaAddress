import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="relative bg-gradient-to-r from-green-600 to-green-500 text-white py-20 px-6 text-center overflow-hidden">
      {/* Optional Wave SVG top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
        <svg
          className="relative block w-full h-[80px] md:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#22c55e"
            fillOpacity="0.6"
            d="M0,256L40,234.7C80,213,160,171,240,160C320,149,400,171,480,197.3C560,224,640,256,720,266.7C800,277,880,267,960,245.3C1040,224,1120,192,1200,165.3C1280,139,1360,117,1400,106.7L1440,96L1440,320L0,320Z"
          />
        </svg>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-8 drop-shadow-lg"
      >
        Get Your Mtaa Address Today!
      </motion.h2>

      <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
        <Link
          to="/register"
          className="bg-white text-green-700 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-green-100 transition"
        >
          Start Now
        </Link>
      </motion.div>

      {/* Optional Wave SVG bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none rotate-180">
        <svg
          className="relative block w-full h-[80px] md:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#22c55e"
            fillOpacity="0.6"
            d="M0,256L40,234.7C80,213,160,171,240,160C320,149,400,171,480,197.3C560,224,640,256,720,266.7C800,277,880,267,960,245.3C1040,224,1120,192,1200,165.3C1280,139,1360,117,1400,106.7L1440,96L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
