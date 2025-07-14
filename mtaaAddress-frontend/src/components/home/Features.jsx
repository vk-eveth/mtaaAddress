// src/components/Features.jsx
import { motion } from 'framer-motion'
import { FaMapMarkedAlt, FaQrcode, FaThumbsUp, FaLandmark, FaWifi, FaMapPin } from 'react-icons/fa'

const features = [
  {
    icon: FaMapPin,
    color: 'from-green-400 to-green-600',
    title: 'GPS Accuracy',
    desc: 'Pinpoint your mtaa precisely using GPS.',
  },
  {
    icon: FaMapMarkedAlt,
    color: 'from-indigo-400 to-indigo-600',
    title: 'Map Preview',
    desc: 'Visualize your digital address directly on the map.',
  },
  {
    icon: FaLandmark,
    color: 'from-yellow-400 to-yellow-600',
    title: 'Landmark Friendly',
    desc: 'Use known shops or spots to improve understanding.',
  },
  {
    icon: FaQrcode,
    color: 'from-blue-400 to-blue-600',
    title: 'QR Code Sharing',
    desc: 'Share your mtaa with one tap via QR or WhatsApp.',
  },
  {
    icon: FaThumbsUp,
    color: 'from-pink-400 to-pink-600',
    title: 'Verified Status',
    desc: 'Track address approval by community or admins.',
  },
  {
    icon: FaWifi,
    color: 'from-purple-400 to-purple-600',
    title: 'Works Offline',
    desc: 'Once saved, your address is available anytime.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
  hover: { scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' },
}

const Features = () => {
  return (
    <section className="py-20 bg-indigo-50" aria-labelledby="features-title">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2
          id="features-title"
          className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-6 relative inline-block"
        >
          Powerful Features
          <span className="block w-20 h-1 bg-indigo-400 rounded mt-2 mx-auto"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {features.map(({ icon: Icon, color, title, desc }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
              variants={cardVariants}
              className="bg-white rounded-xl p-8 flex flex-col items-start text-left cursor-default"
              role="group"
              aria-label={`Feature: ${title}`}
            >
              <div
                className={`mb-6 p-5 rounded-full bg-gradient-to-br ${color} text-white inline-flex items-center justify-center text-5xl`}
              >
                <Icon aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-indigo-900">{title}</h3>
              <p className="text-gray-700 text-base md:text-lg">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
