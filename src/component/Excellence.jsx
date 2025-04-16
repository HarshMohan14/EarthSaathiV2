import React, { useState } from "react";
import { listOfAwards } from "../utils/award.js";
import Award from "./Award";
const Excellence = () => {
  const [awards, setAwards] = useState(listOfAwards);
  return (
    <div className="flex flex-col gap-6 justify-center items-center py-10">
      <h1 className="">
        Proven Excellence in Innovation
      </h1>
      <p>
        EarthSaathi has garnered industry recognition for our commitment to
        sustainability and innovation
      </p>
      <div className="flex flex-col lg:flex-row gap-6">
        {awards.map((elem) => (
          <Award key={elem.title} elem={elem} />
        ))}
      </div>
    </div>
  );
};

export default Excellence;
