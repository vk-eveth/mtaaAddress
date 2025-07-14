import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaLandmark, FaShareAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";

const steps = [
  {
    icon: FaMapMarkerAlt,
    title: "Pin Your Location on the Map",
    description:
      "Open the interactive map and place a marker exactly where you live or work. You can zoom, drag, and adjust to get the perfect spot.",
  },
  {
    icon: FaLandmark,
    title: "Add a Nearby Landmark",
    description:
      "Provide a landmark that people around you recognize — like a shop, school, or mosque. This helps others find your address easily.",
  },
  {
    icon: FaShareAlt,
    title: "Share Your Digital Address",
    description:
      "Once verified, share your unique digital address using a link, QR code, SMS, or WhatsApp. It's your new identity online.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-green-900 dark:via-green-700 dark:to-green-600 dark:text-white font-sans transition-colors duration-500">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <h1 className="text-5xl font-extrabold mb-12 text-center 
          text-green-800 dark:text-yellow-300 drop-shadow
          transition-colors duration-500"
        >
          How MtaaAddress Works
        </h1>

        <p className="max-w-3xl mx-auto text-center mb-16 text-lg 
          text-green-700 dark:text-yellow-100
          transition-colors duration-500"
        >
          Getting your digital address is simple and fast. Follow these easy steps and join thousands of others connecting their communities.
        </p>

        <div className="space-y-24">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.25 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-8"
            >
              <div className="flex flex-col items-center sm:items-start sm:w-24 flex-shrink-0">
                <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 text-3xl
                  text-green-700 bg-green-100 dark:text-yellow-300 dark:bg-yellow-900 drop-shadow-lg
                  transition-colors duration-500"
                >
                  <Icon aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold 
                  text-green-700 dark:text-yellow-300
                  transition-colors duration-500"
                >
                  {`Step ${index + 1}`}
                </span>
              </div>

              <div className="max-w-xl">
                <h2 className="text-3xl font-semibold mb-3
                  text-gray-900 dark:text-yellow-300 drop-shadow
                  transition-colors duration-500"
                >
                  {title}
                </h2>
                <p className="leading-relaxed 
                  text-gray-700 dark:text-yellow-100
                  transition-colors duration-500"
                >
                  {description}
                </p>
              </div>
            </motion.section>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            to="/user/create-address"
            className="inline-flex items-center gap-3 font-bold text-xl px-10 py-4 rounded-full shadow-lg
              bg-green-700 text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400
              dark:bg-yellow-300 dark:text-green-900 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400
              transition-colors duration-300"
          >
            Get Your Digital Address Now <FaArrowRight />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
