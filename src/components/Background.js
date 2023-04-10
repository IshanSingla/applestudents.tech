import React, { useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Background() {
  const [width, setWidth] = React.useState(1000);
  const particlesInit = async (main) => {
    await loadFull(main);
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);
  // let width = window.innerWidth;
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 150,
          },
          color: {
            value: "#111",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.6,
            random: true,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: width<768 ? 3 : 5,
            random: false,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            random: false,
            straight: false,
            out_mode: "out",
          },
        },
        retina_detect: true,
        background: {
          color: "#e2eff0",
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover",
        },
      }}
    />
  );
}
