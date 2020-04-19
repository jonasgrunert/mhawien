import React, { useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import facebook from "../img/social/facebook.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LogoQuery {
          imageSharp(original: { src: { regex: "/LOGO/" } }) {
            fixed(height: 64) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
            }
          }
        }
      `}
      render={(data) => (
        <nav
          className="navbar is-transparent"
          role="navigation"
          aria-label="main-navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item" title="Logo">
                <Img fixed={data.imageSharp.fixed} alt="MHAW Vienna" />
              </Link>
              <button
                className={`navbar-burger burger ${open ? "is-active" : ""}`}
                data-target="navMenu"
                onClick={() => setOpen(!open)}
                style={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "transparent"
                }}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
            <div className={`navbar-menu ${open ? "is-active" : ""}`}>
              <div className="navbar-start has-text-centered">
                <Link className="navbar-item" to="/about">
                  Über uns
                </Link>
                <Link className="navbar-item" to="/info">
                  Weitere Informationen
                </Link>
              </div>
              <div className="navbar-end has-text-centered">
                <a
                  className="navbar-item"
                  href="https://www.facebook.com/mhaw.vienna/"
                >
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </nav>
      )}
    />
  );
};

export default Navbar;
