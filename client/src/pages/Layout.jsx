import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
