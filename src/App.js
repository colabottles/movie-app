import logo from './film-reel.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          <a href="/">React Movie App</a>
        </h1>
        <p>
          Say goodbye to the endless scrolling and frustration of not finding the right movie. Our Movie App is designed to make movie discovery effortless and enjoyable. With advanced search capabilities and genre filters, you can quickly narrow down your options and find exactly what you're in the mood for. Plus, with our seamless pagination system, you can browse through hundreds of titles with ease, ensuring that you never miss out on a hidden gem. Each movie listing is packed with essential information, including runtime, ratings, and summaries, so you always know what you're getting into.
        </p>

        <form>
          <label for="site-search">Search the site:</label>
          <input type="search" id="site-search" name="site-search" />

          <button type="search">Search</button>
        </form>
      </header>
    </div>
  );
}

export default App;
