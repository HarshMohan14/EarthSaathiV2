import { motion } from "framer-motion";
import { Leaf, Recycle, Factory, Users } from "lucide-react"; // Lucide icons for a green/nature vibe

const metrics = [
  {
    icon: <Leaf className="text-green-600" size={40} />,
    label: "Tons of Industrial CO2 captured by 2040",
    value: "1,200,000+",
    desc: "Atmospheric CO₂ captured and stored",
    color: "from-green-200 to-green-400",
  },
  {
    icon: <Recycle className="text-green-700" size={40} />,
    label: "Tons of Waste Biomass Recycled",
    value: "850,000+",
    desc: "Organic waste given a new life",
    color: "from-lime-200 to-green-300",
  },
  {
    icon: <Factory className="text-emerald-700" size={40} />,
    label: "Tons of Biochar Produced Annually",
    value: "75,000+",
    desc: "Biochar for soil & carbon storage",
    color: "from-emerald-200 to-emerald-400",
  },
  {
    icon: <Users className="text-green-800" size={40} />,
    label: "Jobs Created in Carbon Removal",
    value: "2,500+",
    desc: "Green jobs empowering communities",
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
  <section className="relative w-full py-20 px-4 md:px-8 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 overflow-hidden">
    {/* Decorative background leaves */}
    <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#01DC98] rounded-full blur-3xl -z-10" />
    <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl -z-10" />

    <div className="max-w-5xl mx-auto text-center mb-12">
      <h1 className="  text-[#01DC98] mb-4 drop-shadow">
      EarthSaathi' s Roadmap
      </h1>
      <h2 className=" text-[#0C1F5E]">
        Together, we’re building a greener future—one ton, one job, one innovation at a time.
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          className={`card bg-gradient-to-br ${metric.color} shadow-xl rounded-3xl p-8 flex flex-col items-center border-2 border-green-200/60 hover:scale-105 transition-transform duration-300`}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.4 }}
          custom={i}
          variants={cardVariants}
        >
          <div className="mb-4">{metric.icon}</div>
          <div className="  text-green-900 mb-2">{metric.value}</div>
          <div className="  text-green-800 mb-1">{metric.label}</div>
          <div className="text-green-700 ">{metric.desc}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RoadmapImpact;
