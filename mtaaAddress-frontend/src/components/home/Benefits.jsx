import { FaHome, FaTools, FaCity } from 'react-icons/fa'
import { motion } from 'framer-motion'

const benefits = [
  {
    icon: FaHome,
    color: 'from-green-400 to-green-600',
    title: 'Residents',
    points: [
      'Quick deliveries at your doorstep',
      'Emergency help finds you faster',
      'Clear identity with digital address',
    ],
  },
  {
    icon: FaTools,
    color: 'from-yellow-400 to-yellow-600',
    title: 'Service Providers',
    points: [
      'Locate customers precisely every time',
      'Reduce missed appointments and delays',
      'Optimize service routes and schedules',
    ],
  },
  {
    icon: FaCity,
    color: 'from-blue-400 to-blue-600',
    title: 'Local Government',
    points: [
      'Plan infrastructure with accurate data',
      'Maintain verified community records',
      'Empower neighborhoods digitally',
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
  hover: { scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.12)', borderColor: 'rgba(59,130,246,0.5)' },
}

export default function Benefits() {
  return (
    <section className="py-20 bg-white" aria-labelledby="benefits-title">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          id="benefits-title"
          className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-8 inline-block relative"
        >
          Benefits for Everyone
          <span className="block w-24 h-1 bg-indigo-400 rounded mt-2 mx-auto"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {benefits.map(({ icon: Icon, color, title, points }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
              variants={cardVariants}
              className="bg-indigo-50 rounded-xl p-8 shadow-lg border border-transparent cursor-default flex flex-col"
              role="group"
              aria-label={`Benefit category: ${title}`}
            >
              <div
                className={`mb-6 p-5 rounded-full bg-gradient-to-br ${color} text-white inline-flex items-center justify-center text-5xl`}
              >
                <Icon aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-semibold mb-6 text-indigo-800">{title}</h3>

              <ul className="list-disc list-inside text-left space-y-3 text-gray-700 flex-grow">
                {points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
