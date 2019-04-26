import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Calendar from "react-big-calendar";
import moment from "moment";

import Layout from "../components/Layout";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HTMLContent } from "../components/Content";

moment.locale("de");
const localizer = Calendar.momentLocalizer(moment);

export class IndexPageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shownEvents: props.events.map(() => false) };
  }
  render() {
    const { title, events, subtitle, content, image } = this.props;
    return (
      <div>
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundColor: "#46f1a2",
            flexDirection: "column",
            backgroundImage: `url(${!!image ? image.fluid.src : image})`,
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
                    <b>{new Date(e.end).toLocaleString()}</b> in{" "}
                    <b>{e.place}</b>
                  </div>
                </div>
                <form
                  name={e.title}
                  method="post"
                  data-netlify
                  data-netlify-honeypot="gender"
                  action="/success"
                >
                  <input type="hidden" name="form-name" value={e.title} />
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label class="label">Name</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input
                            type="text"
                            className="input"
                            placeholder="Vorname"
                            name="firstname"
                            required
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-user" />
                          </span>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control has-icons-left">
                          <input
                            type="text"
                            className="input"
                            placeholder="Nachname"
                            name="lastname"
                            required
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-user" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label class="label">E-Mail</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input
                            type="email"
                            className="input"
                            placeholder="E-Mail"
                            name="email"
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-envelope" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <input style={{ display: "none" }} name="gender" />
                  <div className="field is-horizontal">
                    <div className="field-label is-normal" />
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <button class="button is-primary" type="submit">
                            Anmelden
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
              <HTMLContent className="content" content={content} />
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
        title={frontmatter.title}
        content={data.markdownRemark.html}
        events={frontmatter.workshops ? frontmatter.workshops : []}
        subtitle={frontmatter.subtitle}
        image={data.imageSharp}
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
    imageSharp(id: { eq: "2c1db8af-7dab-5c4c-b0bf-8ed7ffcbc554" }) {
      fluid(maxHeight: 1000, quality: 100, cropFocus: NORTH) {
        ...GatsbyImageSharpFluid
      }
    }
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
