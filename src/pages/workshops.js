import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";

export const Info = ({
  title,
  description,
  person,
  start,
  end,
  place,
  link,
}) => (
  <div className="box">
    <div className="columns">
      <div className="column" style={{ display: "flex", alignItems: "center" }}>
        <h1 className="subtitle">{title}</h1>
      </div>
      <div classname="column">
        <a
          class="button is-primary is-pulled-right"
          style={{ margin: "0.75em" }}
          href={link}
          target="_blank"
        >
          Anmelden
        </a>
      </div>
    </div>
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: description }}
    />
    <div className="columns is-centered">
      <div
        className="column is-one-third"
        style={{ display: "flex", alignItems: "center" }}
      >
        Präsentiert von:
        <b>{person}</b>
      </div>
      <div className="column is-one-third">
        Von <b>{start.toLocaleString()}</b> bis <b>{end.toLocaleString()}</b> in{" "}
        <b>{place}</b>
      </div>
    </div>
  </div>
);

const WorkshopsPage = ({ workshops }) => {
  return (
    <Layout>
      <div className="container" style={{ margin: "2em auto" }}>
        <h1 className="title">Anstehende Kurse</h1>
        {workshops
          .filter(({ start }) => new Date() < start)
          .map((i) => (
            <Info {...i} />
          ))}
        <h1 className="title">Vergangene Kurse</h1>
        {workshops
          .filter(({ start }) => new Date() > start)
          .map((i) => (
            <Info {...i} />
          ))}
      </div>
    </Layout>
  );
};

export default ({ data }) => (
  <WorkshopsPage
    workshops={data.allMarkdownRemark.edges
      .map(({ node }) => ({
        title: node.frontmatter.title,
        description: node.html,
        person: node.frontmatter.person,
        start: new Date(node.frontmatter.start),
        end: new Date(node.frontmatter.end),
        place: node.frontmatter.place,
        link: node.frontmatter.link,
      }))
      .sort((a, b) => a.start - b.start)}
  />
);

export const pageQuery = graphql`
  query WorkshopsPage {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/workshops/" } }) {
      edges {
        node {
          html
          frontmatter {
            title
            start
            end
            person
            place
            link
          }
        }
      }
    }
  }
`;
