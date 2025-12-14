import { motion } from "framer-motion";
import { Leaf, Recycle, Factory, Users } from "lucide-react"; // Lucide icons for a green/nature vibe

const metrics = [
  {
    icon: <Leaf className="text-green-600" size={40} />,
    label: "Tons of Industrial CO₂ Captured by 2040",
    value: "1,500,000+",
    desc: "Cutting-edge carbon capture solutions for steel, cement, and refinery sectors stopping emissions at the source.",
    color: "from-green-200 to-green-400",
  },
  {
    icon: <Recycle className="text-green-700" size={40} />,
    label: "Tons of Biomass Diverted from Landfills",
    value: "1,000,000+",
    desc: "Transforming food and agri-waste into clean Bio-CNG fuel giving waste a second life and reducing methane emissions",
    color: "from-lime-200 to-green-300",
  },
  {
    icon: <Factory className="text-emerald-700" size={40} />,
    label: "Green Jobs Created by 2040",
    value: "100,000+",
    desc: "Empowering communities through clean energy projects, skill development, and rural entrepreneurship.",
    color: "from-emerald-200 to-emerald-400",
  },
  {
    icon: <Users className="text-green-800" size={40} />,
    label: "Bio-CNG & CO₂ Capture Systems Deployed Globally",
    value: "500+",
    desc: "Modular, scalable, and ready-to-integrate units driving decentralized clean energy access.",
    color: "from-green-100 to-green-300",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
      delay: i * 0.15,
    },
  }),
};

const RoadmapImpact = () => (
  <section className="relative w-full py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-white backdrop-blur-sm">
    {/* Clean Earth decorative elements - whitish blue */}
    <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl -z-10" />
    <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-100/15 rounded-full blur-3xl -z-10" />

    <div className="max-w-5xl mx-auto text-center mb-12">
      <h1 className="  text-[#01DC98] mb-4 drop-shadow">
      EarthSaathi' s Roadmap
      </h1>
      <h2 className=" text-[#0C1F5E]">
      🌍 Together, we’re capturing carbon, converting waste, and creating livelihoods—one innovation at a time.

      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          className={`card bg-white/90 backdrop-blur-md shadow-xl rounded-3xl p-8 flex flex-col items-center border border-blue-100/50 hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.4 }}
          custom={i}
          variants={cardVariants}
        >
          <div className="mb-4">{metric.icon}</div>
          <div className="  text-green-900 mb-2 font-bold text-2xl">{metric.value}</div>
          <div className="  text-green-800 font-semibold text-lg mb-1">{metric.label}</div>
          <div className="text-green-700 ">{metric.desc}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RoadmapImpact;
