import { Rocket, Lightbulb } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 bg-gradient-to-br from-primary/5 via-base-200/60 to-secondary/10 overflow-hidden">
      {/* Decorative blurred circles */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl -z-10"
        style={{ background: "#05DD9A22" }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl -z-10"
        style={{ background: "#02135822" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Mission Panel */}
        <div
          className="relative w-full bg-base-100/90 backdrop-blur-md p-10 md:p-14 rounded-3xl shadow-2xl flex flex-col items-start transition-all hover:scale-[1.02] hover:shadow-3xl"
          style={{ borderLeft: "8px solid #05DD9A" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span
              className="badge badge-lg text-lg px-6 py-3 shadow-lg uppercase tracking-wider"
              style={{
                background: "#05DD9A",
                color: "#021358",
                border: "none",
              }}
            >
              Mission
            </span>
            <Rocket style={{ color: "#05DD9A" }} size={36} strokeWidth={2.2} />
          </div>
          <h2
            className="text-4xl font-semibold mb-4 drop-shadow"
            style={{ color: "#05DD9A" }}
          >
            Our Driving Force
          </h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-4">
            We are on a journey to{" "}
            <span style={{ color: "#05DD9A" }} className="font-semibold">
              accelerate industrial decarbonization
            </span>{" "}
            and{" "}
            <span style={{ color: "#05DD9A" }} className="font-semibold">
              reduce methane and CO<sub>2</sub> emissions
            </span>
            .
          </p>
          <ul className="list-disc pl-5 space-y-2 text-lg text-neutral-700">
            <li>Create scalable, affordable green fuel alternatives</li>
            <li>Enable energy transition through innovation</li>
          </ul>
        </div>

        {/* Vision Panel */}
        <div
          className="relative w-full bg-base-100/90 backdrop-blur-md p-10 md:p-14 rounded-3xl shadow-2xl flex flex-col items-start transition-all hover:scale-[1.02] hover:shadow-3xl"
          style={{ borderLeft: "8px solid #021358" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span
              className="badge badge-lg text-lg px-6 py-3 shadow-lg uppercase tracking-wider"
              style={{
                background: "#021358",
                color: "#05DD9A",
                border: "none",
              }}
            >
              Vision
            </span>
            <Lightbulb style={{ color: "#021358" }} size={36} strokeWidth={2.2} />
          </div>
          <h2
            className="text-4xl font-semibold mb-4 drop-shadow"
            style={{ color: "#021358" }}
          >
            Future We Envision
          </h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-4">
            We dream of a world where{" "}
            <span style={{ color: "#021358" }} className="font-semibold">
              smart carbon capture
            </span>{" "}
            and{" "}
            <span style={{ color: "#021358" }} className="font-semibold">
              circular fuel systems
            </span>{" "}
            empower industries, reduce emissions, and create value from waste.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-lg text-neutral-700">
            <li>Lead the clean transition</li>
            <li>Empower communities and industries</li>
            <li>Build a sustainable, circular future</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
