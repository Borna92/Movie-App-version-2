import { useContext, useEffect, useState } from 'react';
import Card from './Card';
import Axios from 'axios';
import SearchBar from './SearchBar';
import PagesFooter from './PagesFooter';
import { AppContext } from './Context';

function Shows() {
  const {
    genre,
    page,
    setTotalPages,
    data,
    setData,
    searchTerm,
    setExpanded,
    setGenre,
    setPage,
    setSearchTerm,
  } = useContext(AppContext);

  const SHOWSAPI = `https://api.themoviedb.org/3/${
    searchTerm === '' ? 'discover' : 'search'
  }/tv?include_adult=false&language=en-US&sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}&query=${searchTerm}&with_genres=${genre}`;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [SHOWSAPI]);

  function fetchData() {
    Axios.get(SHOWSAPI)
      .then((resp) => {
        setTotalPages(resp.data.total_pages);
        setData(resp.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function reset() {
    setExpanded(false);
    setGenre('');
    setPage(1);
    setSearchTerm('');
  }

  if (isLoading) {
    return (
      <div className="error-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <SearchBar type="Shows" />
      {data.length === 0 ? (
        <div className="error-container">
          <h1>No Shows Found</h1>
          <button className="btn btn-primary" onClick={reset}>
            Go Back
          </button>
        </div>
      ) : (
        <>
          <Card page="/shows/" />
          <PagesFooter />
        </>
      )}
    </>
  );
}

export default Shows;
