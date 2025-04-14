import React from "react";
import { Tooltip } from "react-tooltip";

const GasInfo = ({ gas, color }) => (
  <>
    <span 
      data-tooltip-id="gas-tooltip"
      data-tooltip-content={
        gas === "CO₂" ? "Carbon dioxide (Major greenhouse gas)" :
        gas === "CH₄" ? "Methane (Potent greenhouse gas)" :
        "Nitrogen dioxide (Air pollutant)"
      }
      style={{ color, cursor: "pointer" }}
    >
      {gas}
    </span>
  </>
);

export default GasInfo;
