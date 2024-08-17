import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './film-reel.svg';
import './App.css';
import Search from './components/Search';
import Details from './components/Details';
import Pagination from './components/Pagination';

function App() {
  const [state, setState] = useState({
    s: "search",
    // g: "genre",
    results: [],
    selected: {},
    totalPages: 0,
    searchResults: 0,
  });

  useEffect(() => {
    axiosInstance.get(`${apiURL}`)
      .then(({ data }) => {
        let results = data.data;

        console.log(results);

        setState((prevState) => {
          return {
            ...prevState,
            results: results,
            totalPages: data.totalPages * 25,
          };
        });
      }
      );
  }
    , []);

  const apiURL =
    "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies";

  // For demo purposes only to get the interface populated.
  const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvcGVuSnd0MCIsIm5hbWUiOiJPcGVuSldUWzBdIn0.49JQF4ICJeqxpiIZ9x748VVOHj6FElyRm1tNpFGqaUY` }
  });

  const searchInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const search = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axiosInstance.get(`${apiURL}?search=${state.s}`)
        .then(({ data }) => {
          let results = data.data;

          console.log(results);

          setState((prevState) => {
            return {
              ...prevState,
              results: results,
              searchResults: data.totalPages
            };
          });
        }
        );
    }
  };

  const openDetail = (id) => {
    axiosInstance(apiURL + "/" + id).then(({ data }) => {
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

        <span>
        { state.searchResults > 0 ?
          <p>Total count: {state.searchResults} of {state.totalPages}</p>:
          <p>{state.totalPages}</p>
        }
        </span>
        
        <section className="container">
          {state.results.map((e, key) => (
            <details className="item"
              key={key}
              onClick={() =>
                openDetail(e.id)
              }
            >
              <summary>
                <h2>
                  {e.title}
                </h2>

                <img
                  src={e.posterUrl}
                  alt={e.title}
                />
              </summary>
              <Details
                selected={state.selected}
                closeDetail={closeDetail}
              />
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