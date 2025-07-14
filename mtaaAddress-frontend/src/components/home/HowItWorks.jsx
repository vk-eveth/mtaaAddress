// src/components/HowItWorks.jsx
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaSchool, FaQrcode } from 'react-icons/fa'

const steps = [
  {
    icon: FaMapMarkerAlt,
    iconColor: 'text-green-600',
    title: 'Pin Your Location',
    desc: 'Use the map to drop a pin at your home or business location.',
  },
  {
    icon: FaSchool,
    iconColor: 'text-yellow-500',
    title: 'Add a Nearby Landmark',
    desc: 'Describe a familiar place nearby like a shop, school, or market.',
  },
  {
    icon: FaQrcode,
    iconColor: 'text-blue-600',
    title: 'Get Your Digital Address',
    desc: 'We generate a sharable, unique digital code for you instantly.',
  },
]

export default function HowItWorks() {
  return (
    <section
      className="bg-gray-50 py-20 px-4 md:px-8"
      aria-labelledby="how-it-works-title"
      role="region"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          id="how-it-works-title"
          className="text-3xl md:text-4xl font-bold text-green-800 mb-16"
        >
          How MtaaAddress Works
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Optional: Horizontal connector line for md+ screens */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-1 bg-green-200 z-0"></div>

          {steps.map(({ icon: Icon, iconColor, title, desc }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="relative z-10 bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl hover:scale-[1.03] transition-transform cursor-default"
              role="group"
              aria-label={`Step ${index + 1}: ${title}`}
            >
              <div
                className={`mb-6 p-5 rounded-full bg-gray-100 dark:bg-gray-800 ${iconColor} inline-flex items-center justify-center text-5xl`}
              >
                <Icon aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-700 dark:text-gray-800 text-base md:text-lg max-w-xs">{desc}</p>
              <div className="mt-6 text-green-600 font-bold text-lg select-none">
                Step {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
