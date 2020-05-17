import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Countdown from "../components/countdown";
import facebook from "../img/social/facebook.svg";

const IndexPageTemplate = ({ tags, date, logo, till, place, nextup }) => (
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
        {date < new Date() ? (
          <Countdown date={date} />
        ) : till > new Date() ? (
          <div>
            <h5 className="subtitle">
              Nächster Workshop:{" "}
              {new Date(nextup.start).toLocaleString("de-AT")}
            </h5>
            <Link to={`/workshops#${encodeURI(nextup.title)}`}>
              <h5 className="title">{nextup.title}</h5>
            </Link>
          </div>
        ) : (
          <h5 className="title">Die Woche ist leider schon vorbei</h5>
        )}
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
  const nextup = data.allMarkdownRemark.edges.sort(
    (a, b) =>
      new Date(a.node.frontmatter.start) - new Date(b.node.frontmatter.start)
  )[0].node.frontmatter;

  return (
    <Layout isIndex>
      <IndexPageTemplate
        tags={frontmatter.tags}
        date={new Date(frontmatter.date)}
        logo={data.imageSharp.fluid}
        till={new Date(frontmatter.till)}
        place={frontmatter.place}
        nextup={nextup}
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
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/workshops/" } }) {
      edges {
        node {
          frontmatter {
            title
            start
          }
        }
      }
    }
  }
`;
