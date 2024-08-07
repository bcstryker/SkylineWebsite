import { ParallaxLayer } from "@react-spring/parallax";
import React from "react";
import "../styles.css";
import SectionTitle from "../SectionTitle";

interface TrainingProps {
  parallax: any;
}

const Training: React.FC<TrainingProps> = ({ parallax }) => {
  return (
    <>
      <ParallaxLayer
        offset={-0.2}
        speed={1.1}
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "10%",
        }}
      >
        <SectionTitle title="Training" />
      </ParallaxLayer>

      <ParallaxLayer
        offset={-0.05}
        speed={0.9}
        onClick={() => parallax.current.scrollTo(2)}
        style={{
          display: "flex",
          padding: "0 10%",
        }}
      >
        <img className="w-[40%] ml-[10%]" alt="tmp" src={"online-learning.svg"} />
        <div className="accent-div w-96 left-32 top-48 h-fit">
          <p>
            We offer a wide range of training services to meet the needs of professionals in the
            networking and network automation industry.
          </p>
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.6}
        style={{
          display: "flex",
        }}
      >
        <div className="accent-div ml-96 h-fit w-96">
          <p>Our courses are designed to provide hands-on experience and practical knowledge to help you succeed in your career.</p>
        </div>
        <div className="absolute right-96 top-48">
          <img className="w-[30vw]" alt="tmp" src={"road-to-success.svg"} />
        </div>
      </ParallaxLayer>
    </>
  );
};

const url = (name: string, wrap = false) =>
  `${wrap ? "url(" : ""}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

export default Training;
