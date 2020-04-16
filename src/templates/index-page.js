import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Countdown from "../components/countdown";

const IndexPageTemplate = ({ tags, date, logo }) => (
  <section className="hero is-fullheight">
    <div className="hero-head">
      <Navbar />
    </div>
    <div className="hero-body">
      <div className="container has-text-centered ">
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
      }
    }
    imageSharp(original: { src: { regex: "/LOGO/" } }) {
      fluid(maxWidth: 1080) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;
