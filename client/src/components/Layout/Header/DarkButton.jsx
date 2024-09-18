import React, { useContext, useState } from "react";
import { LI } from "../../AbstractElements";
import CustomizerContext from "../../../Context/Customizer";
import { FaLightbulb } from "react-icons/fa";
// import { PiLightbulbDuotone } from "react-icons/fa";
import { PiLightbulbDuotone } from "react-icons/pi";


const DarkButton = () => {
  const { addMixBackgroundLayout } = useContext(CustomizerContext);
  const [moonlight, setMoonlight] = useState(false);

  const MoonlightToggle = (light) => {
    if (light) {
      addMixBackgroundLayout("light-only");
      document.body.classList.remove("dark-only");
      document.body.classList.add("light-only");
      setMoonlight(!light);
    } else {
      addMixBackgroundLayout("dark-only");
      document.body.classList.remove("light-only");
      document.body.classList.add("dark-only");
      setMoonlight(!light);
    }
  };
  return (
    <LI>
      <div className="mode" onClick={() => MoonlightToggle(moonlight)}>
        {moonlight ? (
            <PiLightbulbDuotone className=" text-white" stroke="white" color="white"/>
        ) : (
          <i className="fa fa-moon-o">mo</i>
        )}
      </div>
    </LI>
  );
};

export default DarkButton;
