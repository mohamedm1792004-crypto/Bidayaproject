import React from "react";
import Collection from "./home/Collections";
import Contact from "./home/Contact";
import Testimonials from "./home/Testimonials";
import FeaturedPiece from "./home/FeaturedPriece";
import Story from "./home/Story";
import Hero from "./home/Hero";

function App() {
  return (
    <div>
      <Collection />
      <Contact />
      <Testimonials />
      <FeaturedPiece />
      <Story />
      <Hero />
    </div>
  );
}

export default App;