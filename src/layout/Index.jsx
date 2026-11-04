import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import FestiveBanner from "../component/FestiveBanner";

function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <FestiveBanner />
      <Header />
      <div className="relative z-10 -mb-12 overflow-hidden rounded-b-[42px] bg-[#faf9f6]">
        <Outlet />
      </div>
      <div className="relative z-0">
        <Footer />
      </div>
    </div>
  );
}

export default Index;
