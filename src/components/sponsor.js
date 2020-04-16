import React from "react";
import Img from "gatsby-image";

const Sponsor = ({ image, title, links, description }) => (
  <article className="media">
    <figure className="media-left">
      <p className="image is-64x64">
        <Img alt={`${title} Logo`} fixed={image} />
      </p>
    </figure>
    <div className="media-content">
      <h5 className="subtitle">{title}</h5>
      <div className="content">{description}</div>
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
