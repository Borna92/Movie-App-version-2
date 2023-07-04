import { useEffect, useContext } from 'react';
import Axios from 'axios';
import Card from './Card';
import SearchBar from './SearchBar';
import PagesFooter from './PagesFooter';
import { AppContext } from './Context';

export function Movies() {
  const {
    genre,
    page,
    setTotalPages,
    data,
    setData,
    searchTerm,
    isLoading,
    setIsLoading,
  } = useContext(AppContext);

  const APIURL = `https://api.themoviedb.org/3/${
    searchTerm === '' ? 'discover' : 'search'
  }/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}&query=${searchTerm}&with_genres=${genre}`;

  useEffect(() => {
    fetchData();
  }, [APIURL]);

  function fetchData() {
    Axios.get(APIURL)
      .then((resp) => {
        setTotalPages(resp.data.total_pages);
        setData(resp.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <div className="error-container">
        <h1>Loading...</h1>;
      </div>
    );
  }

  return (
    <>
      <SearchBar type="Movies" />
      {data.length === 0 ? (
        <div className="error-container">
          <h1>No Movies Found</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <Card page="/" />
          <PagesFooter />
        </>
      )}
    </>
  );
}