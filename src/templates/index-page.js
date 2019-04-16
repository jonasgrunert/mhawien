import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Calendar from "react-big-calendar";
import moment from "moment";

import Layout from "../components/Layout";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("de");
const localizer = Calendar.momentLocalizer(moment);

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  main
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{ backgroundColor: "#b5e4dc" }}
    >
      <div
        style={{
          display: "flex",
          height: "150px",
          lineHeight: "1",
          justifyContent: "space-around",
          alignItems: "left",
          flexDirection: "column"
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: "white",
            lineHeight: "1",
            padding: "0.25em"
          }}
        >
          {title}
        </h1>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <Calendar
                  events={[
                    {
                      title: "test",
                      start: new Date(2019, 4, 13, 10),
                      end: new Date(2019, 4, 13, 11)
                    }
                  ]}
                  localizer={localizer}
                  defaultDate={new Date(2019, 4, 13)}
                  defaultView="work_week"
                  views={["work_week"]}
                  onSelectEvent={() => console.log("Shit")}
                  culture="de"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
      }
    }
  }
`;
