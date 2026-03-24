import React from "react";
import HeroSection from "../components/Home/HeroSection";
import FeaturedBooks from "../components/Home/FeaturedBooks";
import Categories from "../components/Home/Categories";
import Newsletter from "../components/Home/Newletter";
import FinalCTA from "../components/Home/FinalCTA";

const Home = () => {
  return (
    <main className="bg-white">
      <HeroSection />

      <FeaturedBooks />

      <Categories />

      <Newsletter />

      <FinalCTA />
    </main>
  );
};

export default Home;
