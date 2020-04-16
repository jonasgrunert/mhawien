import React, { useEffect, useState } from "react";

function padNumber(num) {
  return `${num}`.length === 1 ? `0${num}` : `${num}`;
}

function calclDiff(date) {
  const diff = date - new Date();
  return [
    padNumber(Math.floor(diff / (1000 * 60 * 60 * 24))),
    padNumber(Math.floor((diff / (1000 * 60 * 60)) % 24)),
    padNumber(Math.floor((diff / (1000 * 60)) % 60)),
    padNumber(Math.floor((diff / 1000) % 60)),
  ];
}

export default ({ date }) => {
  const [diff, setDiff] = useState(calclDiff(date));
  useEffect(() => setInterval(() => setDiff(calclDiff(date)), 1000), []);
  return <h5 className="title is-1">{diff.join(":")}</h5>;
};
