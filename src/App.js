import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { gql } from "@apollo/client";
import logo from './film-reel.svg';
import './App.css';
import Search from './components/Search';
import SearchByGenre from './components/SearchByGenre';
import Details from './components/Details';
import Pagination from './components/Pagination';

const GET_MOVIES = `
  query Movie {
  movies {
    nodes {
      id,
      title,
      posterUrl,
      rating,
      genres {
        id,
        title
      }
      summary
      mainActors
      duration
      directors
    }
  }
}
`;

function App() {
  const [state, setState] = useState({
    s: "search",
    g: "genre",
    results: [],
    selected: {},
    totalPages: 0,
    totalCount: 0,
    searchResults: 0,
    selectedGenre: "",
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
            totalPages: data.totalPages,
            totalCount: data.totalPages * 25,
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
    axiosInstance.get(`${apiURL}?search=${state.s}${state.selectedGenre && `&genre=${state.selectedGenre}`}`)
      .then(({ data }) => {
        let results = data.data;

        console.log(results);

        setState((prevState) => {
          return {
            ...prevState,
            results: results,
            searchResults: data.data.length,
            totalPages: data.totalPages,
          };
        });
      }
      );
  };

  const searchByGenre = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axiosInstance.get(`${apiURL}?genre=${state.s}`)
        .then(({ data }) => {
          let results = data.data;

          console.log(results);

          setState((prevState) => {
            return {
              ...prevState,
              results: results,
              searchResults: data.data.length,
            };
          });
        }
        );
    }
  };

  const handlePagination = (pageNumbers) => {
    axiosInstance.get(`${apiURL}?page=${pageNumbers}${state.s !== "search" && `&search=${state.s}`}`)
      .then(({ data }) => {
        let results = data.data;

        console.log(results);

        setState((prevState) => {
          return {
            ...prevState,
            results: results,
            searchResults: data.data.length,
            totalPages: data.totalPages,
          };
        });
      }
      );
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

        <section className="searchBar">
          <Search
            searchInput={searchInput}
            search={search}
          />

          {/* <SearchByGenre
            searchInput={searchInput}
            search={searchByGenre}
          /> */}

          <label htmlFor="select-genre">Filter by genre:</label>
          <select name="genres" id="genre-select" onChange={e => setState(prev => {
            e.preventDefault();
            return {
              ...prev,
              selectedGenre: e.target.value,
            }
          })}>
            <option value="">--Select a genre--</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Animation</option>
            <option value="biography">Biography</option>
            <option value="crime">Crime</option>
            <option value="comedy">Comedy</option>
            <option value="documentary">Documentary</option>
            <option value="drama">Drama</option>
            <option value="family">Family</option>
            <option value="history">History</option>
            <option value="horror">Horror</option>
            <option value="musical">Musical</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="short">Short</option>
            <option value="thriller">Thriller</option>
            <option value="war">War</option>
            <option value="western">Western</option>
          </select>
        </section>

        <span>
          {state.searchResults > 0 ?
            <p>Total count: {state.searchResults} of {state.totalCount}</p> :
            <p>Total count: {state.totalCount}</p>
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
        <Pagination handlePagination={handlePagination} totalPages={state.totalPages} />
      </main>
    </div>
  );
}

export default App;