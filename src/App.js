import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Basckground from "./components/Basckground";
import Event from "./pages/Event";
import Events from "./pages/Events";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    if (!(sessionStorage.getItem("visited") === "true")) {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 1000); // 1 second
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <BrowserRouter>
      <Basckground />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Events" element={<Events />} />
        <Route exact path="/Events/:id" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
