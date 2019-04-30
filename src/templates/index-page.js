import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Calendar from "react-big-calendar";
import moment from "moment";

import Layout from "../components/Layout";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HTMLContent } from "../components/Content";
import TitleImage from "../img/Titelbild MHAW 2019.jpg";
import Workshop from "../components/workshop";

moment.locale("de");
const localizer = Calendar.momentLocalizer(moment);

export class IndexPageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shownEvents: props.events.map(() => false) };
  }
  render() {
    const { title, events, subtitle, content } = this.props;
    return (
      <div>
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundColor: "#46f1a2",
            flexDirection: "column",
            backgroundImage: `url("${TitleImage}")`,
            backgroundPosition: "top"
          }}
        >
          <div
            style={{
              display: "flex",
              height: "750px",
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
            <h5
              className="has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-3-widescreen"
              style={{
                color: "white",
                lineHeight: "1",
                padding: "0.25em"
              }}
            >
              {subtitle}
            </h5>
          </div>
        </div>
        {events.map((e, i) => (
          <Workshop
            title={e.title}
            show={this.state.shownEvents[i]}
            description={e.description}
            place={e.place}
            person={e.person}
            end={e.end}
            start={e.start}
            close={() =>
              this.setState({
                shownEvents: this.state.shownEvents.map(() => false)
              })
            }
          />
        ))}
        <section className="section section--gradient">
          <div className="container">
            <div className="section">
              <HTMLContent className="content" content={content} />
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <div className="content">
                    <Calendar
                      events={events.map((e, i) => ({
                        ...e,
                        start: moment(e.start),
                        end: moment(e.end)
                      }))}
                      localizer={localizer}
                      defaultDate={new Date(2019, 4, 13)}
                      defaultView="work_week"
                      views={["work_week"]}
                      onSelectEvent={ev =>
                        this.setState({
                          shownEvents: events.map(e => e.title === ev.title)
                        })
                      }
                      culture="de"
                      tooltipAccessor={e => `${e.description}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  events: PropTypes.array
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        content={data.markdownRemark.html}
        events={frontmatter.workshops ? frontmatter.workshops : []}
        subtitle={frontmatter.subtitle}
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
      html
      frontmatter {
        title
        subtitle
        workshops {
          title
          description
          start
          end
          person
          place
        }
      }
    }
  }
`;
