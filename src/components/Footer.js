import React from "react";
import { Link } from "gatsby";

import logo from "../img/MHAW_2019_LOGO.jpg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-text-black">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="Kaldi"
            style={{ width: "14em", height: "14em" }}
          />
        </div>
        <div className="content has-text-centered has-text-black">
          <div className="container has-text-black">
            <div className="columns">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item has-text-black">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item has-text-black" to="/info">
                        Weitere Informationen
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link
                        className="navbar-item has-text-black"
                        to="/impressum"
                      >
                        Impressum
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item has-text-black"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <a
                  title="facebook"
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
        </div>
      </footer>
    );
  }
};

export default Footer;
