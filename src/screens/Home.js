import React from "react";
import LayoutProvider from "../components/LayoutProvider";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function Home(props) {
  return (
    <LayoutProvider header={Header} navbar={NavBar} {...props}>
      <div>Home</div>
    </LayoutProvider>
  );
}

export default Home;
