import React from "react";
import Img from "gatsby-image";

export default ({ image, title, link, description }) => (
  <div className="is-picture-wrapper column is-one-third">
    <figure className="image">
      <Img alt={title} fluid={image} />
    </figure>
    <div className="is-picture-content has-text-white">
      <h1 className="subtitle has-text-white">{title}</h1>
      <p>{description}</p>
      <a href={link}>Webseite</a>
    </div>
  </div>
);
