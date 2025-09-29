import React from "react";
import "./styles/Header.css";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">WSIE</div>
        <Nav />
        <button className="btn btn-login" type="button">LOGIN</button>
      </div>
    </header>
  );
}
