import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        Built with 💡 by{" "}
        <a
          href="https://rciesielski3.github.io/portfolio/"
          className="underline"
        >
          Adateo
        </a>
      </p>
      <p>
        <a href="/privacy.html">Privacy policy</a>
      </p>
      <p>© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
