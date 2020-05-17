import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Workshop from "../components/Workshop";

const VideosPage = ({ videos, title, content }) => {
  return (
    <Layout>
      <div className="container" style={{ margin: "2em auto" }}>
        <h1 className="title">{title}</h1>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {videos && videos.map((i) => <Workshop {...i} linkText="Link" />)}
      </div>
    </Layout>
  );
};

export default ({ data }) => (
  <VideosPage
    title={data.markdownRemark.frontmatter.title}
    content={data.markdownRemark.html}
    videos={data.markdownRemark.frontmatter.videos}
  />
);

export const pageQuery = graphql`
  query VideosPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        videos {
          title
          description
          link
        }
      }
    }
  }
`;
