import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Countdown from "../components/countdown";
import facebook from "../img/social/facebook.svg";

const IndexPageTemplate = ({ tags, date, logo, till, place }) => (
  <section className="hero is-fullheight">
    <div className="hero-head">
      <Navbar />
    </div>
    <div className="hero-body">
      <div className="container has-text-centered ">
        <h1 className="title">3. Mental Health Awareness Week Wien</h1>
        <h1 class="subtitle">
          {date.toLocaleDateString("de-AT")} bis{" "}
          {till.toLocaleDateString("de-AT")} | {place}
        </h1>
        <figure
          class="image"
          style={{
            width: "30%",
            margin: "auto",
            height: "auto",
            marginBottom: "3rem",
          }}
        >
          <Img fluid={logo} alt="Mental Health Awareness Week" />
        </figure>
        <Countdown date={date} />
        <div className="columns is-centered">
          <div className="tags are-large column">
            {tags &&
              tags.map((t) => (
                <span className="tag is-white has-text-primary">{t}</span>
              ))}
          </div>
        </div>
        <a
          className="button is-text"
          href="https://www.facebook.com/mhaw.vienna/"
        >
          <img
            src={facebook}
            alt="Facebook"
            style={{
              width: "1em",
              height: "1em",
              marginRight: "0.5em",
            }}
          />
          Nähere Informationen
        </a>
      </div>
    </div>
    <div className="hero-foot">
      <div
        className="container has-text-centered has-text-primary"
        style={{ marginBottom: "0.5rem" }}
      >
        <Link to="/impressum">Impressum</Link>
      </div>
    </div>
  </section>
);

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout isIndex>
      <IndexPageTemplate
        tags={frontmatter.tags}
        date={new Date(frontmatter.date)}
        logo={data.imageSharp.fluid}
        till={new Date(frontmatter.till)}
        place={frontmatter.place}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        tags
        date
        till
        place
      }
    }
    imageSharp(original: { src: { regex: "/LOGO/" } }) {
      fluid(maxWidth: 1080) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;
