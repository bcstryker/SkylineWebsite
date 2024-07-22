import { ParallaxLayer } from '@react-spring/parallax';
import React, { useEffect, useRef } from 'react';
import HeroText from './AsLearners';
import './Landing.css';


const Landing: React.FC<{ parallax: any }> = ({ parallax }) => {

    return (
        <div className="mt-24">
            <HeroText />
            <div className="absolute right-64 top-96 w-[40vw]">
                <img src='road-to-knowledge.svg' />
            </div>
            <div className="absolute right-[25vw] top-32 w-[15vw]">
                <img
                    alt="tmp"
                    src={url("cloud")}
                    />
            </div>
            <div className="absolute left-[10vw] bottom-64 w-[18vw]">
                <img
                    alt="tmp"
                    src={url("cloud")}
                    />
            </div>
        </div>
    );
};

export default Landing;

const url = (name: string, wrap = false) =>
    `${wrap ? "url(" : ""}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;