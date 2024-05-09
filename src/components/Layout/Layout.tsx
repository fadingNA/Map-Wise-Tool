import React from "react";
import { LayoutProps } from "../../../type/type";
import Navbar from "../Navbar/Navbar";
//import Footer from "@/components/Footer/Footer";

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
