import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export const ImpressumTemplate = ({ title, content }) => {
  return (
    <section className="section container">
      <h3 className="title">{title}</h3>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
};

const Impressum = ({ data }) => {
  const { markdownRemark } = data;

  return (
    <Layout>
      <ImpressumTemplate
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
      />
    </Layout>
  );
};

export default Impressum;

export const ImpressumQuery = graphql`
  query ImpressumQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
