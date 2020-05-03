import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";

export const Info = ({ end, start, person, description, place }) => (
  <div className="columns">
    <div className="column">
      {description}
      <br />
      Presented by: {person}
    </div>
    <div className="column">
      Von <b>{new Date(start).toLocaleString()}</b> bis{" "}
      <b>{new Date(end).toLocaleString()}</b> in <b>{place}</b>
    </div>
  </div>
);

const WorkshopsPage = ({ workshops }) => {
  return (
    <Layout>
      <div className="container" style={{ margin: "2em auto" }}>
        {workshops.map(
          ({ title, description, person, start, end, place, link }) => (
            <div className="box">
              <div className="columns">
                <div
                  className="column"
                  style={{ display: "flex", alignItems: "center" }}
                >
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
                  Von <b>{new Date(start).toLocaleString()}</b> bis{" "}
                  <b>{new Date(end).toLocaleString()}</b> in <b>{place}</b>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default ({ data }) => (
  <WorkshopsPage
    workshops={data.allMarkdownRemark.edges.map(({ node }) => ({
      title: node.frontmatter.title,
      description: node.html,
      person: node.frontmatter.person,
      start: node.frontmatter.start,
      end: node.frontmatter.end,
      place: node.frontmatter.place,
      link: node.frontmatter.link,
    }))}
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
