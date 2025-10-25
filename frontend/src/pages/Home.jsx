import React from "react";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/content/Content";
import ReadyStart from "../components/ReadyStart/Ready";
import WhyChoose from "../components/whyChoose/Whychoose";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Content />
      <WhyChoose />
      <ReadyStart />
    </>
  );
};

export default HomePage;
