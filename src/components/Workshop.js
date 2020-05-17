import React from "react";

const Workshop = ({
  title,
  description,
  person,
  start,
  end,
  place,
  link,
  linkText,
}) => (
  <div className="box" id={encodeURI(title)}>
    <div className="columns">
      <div className="column" style={{ display: "flex", alignItems: "center" }}>
        <h1 className="subtitle">{title}</h1>
      </div>
      <div classname="column">
        <a
          class="button is-primary is-pulled-right"
          style={{ margin: "0.75em" }}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText ? linkText : "Anmelden"}
        </a>
      </div>
    </div>
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: description }}
    />
    <div className="columns is-centered">
      {person && (
        <div
          className="column is-one-third"
          style={{ display: "flex", alignItems: "center" }}
        >
          Präsentiert von:
          <b>{person}</b>
        </div>
      )}
      {start && end && (
        <div className="column is-one-third">
          Von <b>{start.toLocaleString()}</b> bis <b>{end.toLocaleString()}</b>{" "}
          in <b>{place}</b>
        </div>
      )}
    </div>
  </div>
);

export default Workshop;
