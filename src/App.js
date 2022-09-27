import React, { useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    if (!(sessionStorage.getItem("visited") === "true")) {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 1000); // 1 second
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <div className="App">
      <Main />
      <Header />
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
              value: "#fff",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 5,
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
            color: "#a4c1c2",
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
        }}
      />
    </div>
  );
}

export default App;
