import React, {ReactNode} from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../styles/Layout.scss";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
