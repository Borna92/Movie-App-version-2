import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import '../Details.css';
import Rating from '@mui/material/Rating';
import { AiFillYoutube } from 'react-icons/ai';

function ShowDetails() {
  const { id } = useParams();
  const API = `https://api.themoviedb.org/3/tv/${id}?&api_key=04c35731a5ee918f014970082a0088b1`;
  const IMGPATH = `https://image.tmdb.org/t/p/w1280`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    genres,
    homepage,
    name,
    vote_average,
    vote_count,
    status,
    tagline,
    overview,
    type,
    number_of_episodes,
    number_of_seasons,
    production_countries,
    poster_path,
  } = data;

  useEffect(() => {
    fetchData();
  }, [API]);

  function fetchData() {
    Axios.get(API)
      .then((resp) => {
        setData(resp.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (isLoading) {
    return (
      <div className="error-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="details-container d-flex flex-column align-items-center">
      <a href={homepage} target="_blank">
        <img src={IMGPATH + poster_path} alt={name} />
      </a>

      <div className="about-movie d-flex flex-column align-items-center">
        <h1>{name}</h1>
        <h5>
          {genres?.map((genre, index) => (
            <span key={index}>
              {genre.name}
              {index < genres.length - 1 && ', '}
            </span>
          ))}
        </h5>
        <p>{overview}</p>
        {vote_average && (
          <Rating
            name="read-only"
            value={vote_average}
            readOnly
            max={10}
            precision={0.5}
          />
        )}
        <h3>Score: {vote_average?.toFixed(2)}</h3>
        <h3>Votes: {vote_count?.toLocaleString()}</h3>
        <h4>{tagline}</h4>
        <h2>
          Number of episodes: <span>{number_of_episodes}</span>
        </h2>
        <h2>
          Number of seasons: <span>{number_of_seasons}</span>
        </h2>

        <h3>Type: {type}</h3>
        <h3>Status: {status}</h3>

        <h3>
          Filmed in:{' '}
          {production_countries?.map((country, index) => (
            <span key={index}>
              {country.name}
              {index < country.length - 1 && ', '}
            </span>
          ))}
        </h3>
        <a
          href={`https://www.youtube.com/results?search_query=${name}+trailer`}
          className="fs-1 trailer-link"
          target="_blank"
        >
          Watch Trailer <AiFillYoutube className="youtube-logo" />
        </a>
      </div>
    </div>
  );
}
export default ShowDetails;
