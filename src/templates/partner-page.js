import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Partner from "../components/Partner";

export const PartnerPageTemplate = ({ title, content, sponsors }) => {
  console.log(sponsors);
  return (
    <section className="section container">
      <h3 className="title">{title}</h3>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="columns is-multiline">
        {sponsors &&
          sponsors.map((s) => (
            <Partner
              image={s.logo.childImageSharp.fluid}
              title={s.title}
              link={s.link}
              description={s.description}
            />
          ))}
      </div>
    </section>
  );
};

const PartnerPage = ({ data }) => {
  const { markdownRemark } = data;
  return (
    <Layout>
      <PartnerPageTemplate
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        sponsors={markdownRemark.frontmatter.partners}
      />
    </Layout>
  );
};

export default PartnerPage;

export const PartnerPageQuery = graphql`
  query PartnerPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        partners {
          title
          logo {
            childImageSharp {
              fluid(maxWidth: 1080) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          description
          link
        }
      }
    }
  }
`;
