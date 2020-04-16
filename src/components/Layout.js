import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql, Link } from "gatsby";
import Navbar from "./Navbar";

import "./all.sass";

const TemplateWrapper = ({ children, isIndex }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/img/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/img/favicon-16x16.png"
          />
          <link rel="manifest" href="/img/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#1fafae"
          />
          <link rel="shortcut icon" href="/img/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="MHAW Vienna" />
          <meta name="application-name" content="MHAW Vienna" />
          <meta name="msapplication-TileColor" content="#1fafae" />
          <meta name="msapplication-config" content="/img/browserconfig.xml" />
          <meta name="theme-color" content="#1fafae" />
          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        {!isIndex && <Navbar />}
        {children}
        {!isIndex && (
          <div
            className="container has-text-centered has-text-primary"
            style={{ marginBottom: "0.5rem" }}
          >
            <Link to="/impressum">Impressum</Link>
          </div>
        )}
      </>
    )}
  />
);

export default TemplateWrapper;
