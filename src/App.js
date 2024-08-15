import React, { useState } from 'react';
import axios from 'axios';
import logo from './film-reel.svg';
import './App.css';
import Search from './components/Search';
import Details from './components/Details';
import Pagination from './components/Pagination';

function App() {
  const [state, setState] = useState({
    s: "search",
    results: [],
    selected: {},
  });

  const apiURL =
    "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/graphql/";

  const searchInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiURL + "&s=" + state.s).then(
        ({ data }) => {
          let results = data.Search;

          console.log(results);

          setState((prevState) => {
            return {
              ...prevState,
              results: results,
            };
          });
        }
      );
    }
  };

  const openDetail = (id) => {
    axios(apiURL + "&i=" + id).then(({ data }) => {
      let result = data;

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closeDetail = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <h1>
          <a href="/">React Movie App</a>
        </h1>
        <p className="Intro">
          Say goodbye to the endless scrolling and frustration of not finding the right movie. Our Movie App is designed to make movie discovery effortless and enjoyable. With advanced search capabilities and genre filters, you can quickly narrow down your options and find exactly what you're in the mood for. Plus, with our seamless pagination system, you can browse through hundreds of titles with ease, ensuring that you never miss out on a hidden gem. Each movie listing is packed with essential information, including runtime, ratings, and summaries, so you always know what you're getting into.
        </p>

        <Search
          searchInput={searchInput}
          search={search}
        />

        <section className="container">
        
          {state.results.map((e) => (
            <details className="item"
              key={e}
              onClick={() =>
                openDetail(e.apiURL)
              }
            >
              <summary>
                <img
                  src={e.Poster}
                  alt='movie poster'
                />
                <h2>
                  {e.Title}
                </h2>
              </summary>
            </details>
          ))}
        </section>

        {typeof state.selectedTitle !=
          "undefined" ? (
          <Details
            selected={state.selected}
            closeDetail={closeDetail}
          />
        ) : (
          false
        )}
        <Pagination />
      </main>
    </div>
  );
}

export default App;