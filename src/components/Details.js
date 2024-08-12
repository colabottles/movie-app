import React from "react";

function Details({ selected, closeDetail }) {
    return (
        <section className="details">
            <article className="information">
                <h2>{selected.Title}</h2>
                <span>{selected.Year}</span>
                <p className="rating">
                    Rating: {selected.Rating}
                </p>
                <aside className="about">
                    <img src={selected.Poster} alt="" />
                    <p>{selected.Storyline}</p>
                </aside>
                <button
                    type="button"
                    className="close"
                    onClick={closeDetail}
                >
                    Close
                </button>
            </article>
        </section>
    );
}

export default Details