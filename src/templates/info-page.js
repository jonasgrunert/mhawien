import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Sponsor from "../components/sponsor";

export const InfoPageTemplate = ({ title, content, sponsors }) => {
  return (
    <section className="section container">
      <h3 className="title">{title}</h3>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      {sponsors &&
        sponsors.map((s) => (
          <Sponsor
            image={s.logo.childImageSharp.fixed}
            title={s.title}
            links={s.links}
            description={s.description}
          />
        ))}
    </section>
  );
};

const InfoPage = ({ data }) => {
  const { markdownRemark } = data;
  return (
    <Layout>
      <InfoPageTemplate
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        sponsors={markdownRemark.frontmatter.sponsors}
      />
    </Layout>
  );
};

export default InfoPage;

export const InfoPageQuery = graphql`
  query InfoPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        sponsors {
          logo {
            childImageSharp {
              fixed(width: 64) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
          title
          description
          links
        }
      }
    }
  }
`;
