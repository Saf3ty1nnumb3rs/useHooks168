import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const App = () => {
  const [results, setResuts] = useState([]);
  const [query, setQuery] = useState('reacthooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
      // empty array limits execution to mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(`http://hn.algolia.com/api/v1/search?query=${query}`
        );
        setResuts(res.data.hits);
    } catch (err) {
      setError(err);
    }
      setLoading(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img src="https://icon.now.sh/react/c)c" alt="React logo" className="float-right h-12"/>
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form
        onSubmit={handleSearch}
        className="mb-2"  
      >
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button
          type="submit"
          onSubmit={(event) => handleSearch(event)}
          className="bg-orange rounded m-1 p-1"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-teal text-white p-1 rounded"
        >
          Clear
        </button>
      </form>
      {loading ?
        <div className="font-bold text-orange-dark">Loading Results...</div> :
        <ul className="list-reset leading-normal m-2">
          {results.map(result => (
            <li key={result.objectID}>
              <a className="text-indigo-dark hover:text-indigo-darkest"href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      }
      {error && <div className="error" style={{ color: 'red', fontWeight: 'bold' }}>{error.message}</div>}
    </div>
  );
};

export default App;