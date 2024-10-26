import React from "react";
import HeroText from "./AsLearners";
import "./Landing.css";

const Landing: React.FC<{ parallax: any }> = ({ parallax }) => {
  return (
    <div className="mt-24">
      <HeroText />
      <div className="absolute right-64 top-96 w-[40vw]">
        <img alt="road-to-knowledge" src="road-to-knowledge.svg" />
      </div>
    </div>
  );
};

export default Landing;
