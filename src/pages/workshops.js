import React from "react";
import Layout from "../components/Layout";
import Workshop, { Info } from "../components/workshop";
import { graphql } from "gatsby";

class WorkshopsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shownEvents: props.data.markdownRemark.frontmatter.workshops.map(
        () => false
      )
    };
  }
  render() {
    return (
      <Layout>
        <div style={{ width: "70%", margin: "auto" }}>
          {this.props.data.markdownRemark.frontmatter.workshops.map((e, i) => (
            <div className="box">
              <div className="columns">
                <div className="column">
                  <h1 className="is-size-5-mobile is-size-4-tablet is-size-3-widescreen">
                    {e.title}
                  </h1>
                </div>
                <div className="column">
                  <button
                    className="button is-primary is-pulled-right"
                    onClick={() =>
                      this.setState({
                        shownEvents: this.props.data.markdownRemark.frontmatter.workshops.map(
                          ev => ev.title === e.title
                        )
                      })
                    }
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <Info
                end={e.end}
                start={e.start}
                person={e.person}
                place={e.place}
                description={e.description}
              />
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
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}

export default WorkshopsPage;

export const pageQuery = graphql`
  query WorkshopsPage {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
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
