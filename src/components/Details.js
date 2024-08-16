import React from "react";

function Details({ selected, closeDetails }) {
    console.log(selected);
    return (
        <section className="details">
            <ul className="information">
                <li>{selected.title}</li>
                <li>{selected.datePublished}</li>
                <li className="rating">
                    Rating: {selected.rating}
                </li>
                <li>{selected.summary}</li>
            </ul>
        </section>
    );
}

export default Details