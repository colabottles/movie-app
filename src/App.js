import React, { useState } from 'react';
import logo from './film-reel.svg';
import './App.css';
import './components/Search';
import './components/Details';
import axios from 'axios';

function App() {
  const [state, setState] = useState({
    s: "sherlock",
    results: [],
    selected: {},
  });

  const apiURL = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";

  const searchInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiURL) + "&s=" + state.s).then(
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

  


  return (
    <main className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          <a href="/">React Movie App</a>
        </h1>
        <p className="Intro">
          Say goodbye to the endless scrolling and frustration of not finding the right movie. Our Movie App is designed to make movie discovery effortless and enjoyable. With advanced search capabilities and genre filters, you can quickly narrow down your options and find exactly what you're in the mood for. Plus, with our seamless pagination system, you can browse through hundreds of titles with ease, ensuring that you never miss out on a hidden gem. Each movie listing is packed with essential information, including runtime, ratings, and summaries, so you always know what you're getting into.
        </p>
      </header>
    </main>
  );
}

export default App;
