import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export const AboutPageTemplate = ({ title, content, image }) => {
  return (
    <>
      <section
        className="hero is-large"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-body">
          <div className="container">
            <h3 className="title has-text-white">{title}</h3>
          </div>
        </div>
      </section>
      <div
        className="content container"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

const AboutPage = ({ data }) => {
  const { markdownRemark } = data;
  console.log(data);
  return (
    <Layout>
      <AboutPageTemplate
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image.publicURL}
      />
    </Layout>
  );
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          publicURL
        }
      }
    }
  }
`;
