import React from "react";
import Img from "gatsby-image";

const Sponsor = ({ image, title, links, description }) => (
  <article className="media">
    {image && (
      <figure className="media-left">
        <p className="image is-64x64">
          <Img alt={`${title} Logo`} fixed={image} />
        </p>
      </figure>
    )}
    <div className="media-content">
      <h5 className="subtitle">{title}</h5>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: description
            .replace(/\n/g, "<br/>")
            .replace(/https:(\w|\/|-|\.)*/g, (t) => `<a href="${t}">${t}</a>`)
            .replace(
              /(\w|\/|-|\.)*@(\w|\/|-|\.)*/g,
              (t) => `<a href="mailto:${t}">${t}</a>`
            ),
        }}
      />
      <div className="buttons">
        {links.map((l) => (
          <a href={l} className="button is-text has-text-primary">
            {l}
          </a>
        ))}
      </div>
    </div>
  </article>
);

export default Sponsor;
