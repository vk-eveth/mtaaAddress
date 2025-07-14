import { motion } from "framer-motion";
import Lottie from "lottie-react";
import pplSay from "../../assets/pplSay.json"; // Assuming you have a Lottie animation for testimonials


const testimonials = [
  {
    name: "Amina, Resident",
    role: "Small Business Owner",
    feedback: "MtaaAddress made it so easy for customers to find my shop. Life-changing!",
  },
  {
    name: "Juma, Delivery Rider",
    role: "Courier",
    feedback: "Now I reach customers without asking for directions—saving me time and stress.",
  },
  {
    name: "Ms. Fatuma",
    role: "Community Leader",
    feedback: "This system helps us plan better and empower our community digitally.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" },
};

export default function Testimonials() {
  return (
    <section className="snap-start bg-indigo-50 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Placeholder for animation or image */}
        <div className="w-full md:w-1/2 hidden md:block">
          {/* Lottie animation or image can go here */}
          <Lottie
            animationData={pplSay}
            loop={true}
            className="w-full h-[300px] md:h-[400px]"
            aria-label="People saying good things about MtaaAddress"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-indigo-800 mb-10 text-center md:text-left">
            What People Are Saying 💬
          </h2>

          <motion.div
            className="grid gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {testimonials.map(({ name, role, feedback }, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white p-6 rounded-xl shadow-lg relative text-left"
              >
                <span className="absolute top-4 left-4 text-indigo-300 text-4xl select-none">“</span>
                <p className="text-gray-700 italic mb-6 ml-8 text-lg leading-relaxed">{feedback}</p>
                <h4 className="text-indigo-700 font-semibold">{name}</h4>
                <span className="text-sm text-gray-500">{role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
