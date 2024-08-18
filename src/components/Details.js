import React from "react";

function Details({ selected, closeDetails }) {
  return (
    <section className="details">
      <ul className="information">
        <li className="dateRelease">
          <strong>Released:</strong> {selected.datePublished}
        </li>
        <li className="rating">
          <strong>Rating:</strong> {selected.rating}
        </li>
        <li className="summary">
          <strong>Summary:</strong> {selected.summary}
        </li>
      </ul>
    </section>
  );
}

export default Details