import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { Wrap } from "@chakra-ui/react";

function Landing() {
  return (
    <div>
      <Navbar navTitle="Test Organization" />
      <Wrap>{/* A bunch of ProjectCards */}</Wrap>
      <ProjectCard />
    </div>
  );
}

export default Landing;
