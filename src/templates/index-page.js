import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Calendar from "react-big-calendar";
import moment from "moment";

import Layout from "../components/Layout";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("de");
const localizer = Calendar.momentLocalizer(moment);

export class IndexPageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shownEvents: props.events.map(() => false) };
  }
  render() {
    const { title, events, subtitle } = this.props;
    return (
      <div>
        <div
          className="full-width-image margin-top-0"
          style={{ backgroundColor: "#46f1a2", flexDirection: "column" }}
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
          <div
            className={`modal ${this.state.shownEvents[i] ? "is-active" : ""}`}
          >
            <div className="modal-background" />
            <div className="modal-content">
              <div className="box">
                <h1 className="is-size-5-mobile is-size-4-tablet is-size-3-widescreen">
                  {e.title}
                </h1>
                <div className="columns">
                  <div className="column">
                    {e.description}
                    <br />
                    Vernatwortlicher: {e.person}
                  </div>
                  <div className="column">
                    Von <b>{new Date(e.start).toLocaleString()}</b> bis{" "}
                    <b>{new Date(e.end).toLocaleString()}</b>
                    in <b>{e.place}</b>
                  </div>
                </div>
                <div className="notification is-warning">
                  Die Anmeldung wird erst zu einem späteren Zeitpunkt geöffnet
                </div>
              </div>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() =>
                this.setState({ shownEvents: events.map(() => false) })
              }
            />
          </div>
        ))}
        <section className="section section--gradient">
          <div className="container">
            <div className="section">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <div className="content">
                    <Calendar
                      events={events.map((e, i) => ({
                        ...e,
                        start: new Date(e.start),
                        end: new Date(e.end)
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
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        events={frontmatter.workshops}
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
