import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Workshop from "../components/Workshop";

const WorkshopsPage = ({ workshops }) => {
  return (
    <Layout>
      <div className="container" style={{ margin: "2em auto" }}>
        <h1 className="title">Anstehende Kurse</h1>
        {workshops
          .filter(({ start }) => new Date() < start)
          .map((i) => (
            <Workshop {...i} />
          ))}
        <h1 className="title">Vergangene Kurse</h1>
        {Object.entries(
          workshops
            .filter(({ start }) => new Date() > start)
            .reduce((prev, curr) => {
              const year = curr.start.getFullYear();
              if(prev[year]){
                return {...prev, [year]: [...prev[year], curr]}
              }
              return {...prev, [year]: [curr]}
            }, {})
          )
          .map(([k, i]) => <><h3 className="subtitle">{k}</h3>{i.map(w => <Workshop {...w} />)}</>)
          }
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
