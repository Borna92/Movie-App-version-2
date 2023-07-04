import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { AiFillYoutube } from 'react-icons/ai';

function MovieDetails() {
  const { id } = useParams();
  const API = `https://api.themoviedb.org/3/movie/${id}?&api_key=04c35731a5ee918f014970082a0088b1`;
  const IMGPATH = `https://image.tmdb.org/t/p/w1280`;
  const [data, setData] = useState([]);

  const {
    genres,
    homepage,
    title,
    vote_average,
    vote_count,
    status,
    tagline,
    overview,
    release_date,
    revenue,
    runtime,
    production_countries,
    poster_path,
  } = data;

  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = new Date(release_date).toLocaleDateString(
    'en-US',
    options
  );

  useEffect(() => {
    fetchData();
  }, [API]);

  function fetchData() {
    Axios.get(API)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="details-container d-flex flex-column align-items-center">
      <a href={homepage} target="_blank">
        <img src={IMGPATH + poster_path} alt={title} />
      </a>

      <div className="about-movie d-flex flex-column align-items-center">
        <h1>{title}</h1>
        <h6>
          {genres?.map((genre, index) => (
            <span key={index}>
              {genre.name}
              {index < genres.length - 1 && ', '}
            </span>
          ))}
        </h6>
        {vote_average && (
          <Rating
            name="read-only"
            value={vote_average}
            readOnly
            max={10}
            precision={0.1}
          />
        )}
        <h3>Score: {vote_average?.toFixed(2)}</h3>
        <h3>Votes: {vote_count?.toLocaleString()}</h3>
        <h4>{tagline}</h4>
        <h2>Overview</h2>
        <p>{overview}</p>

        <h3>
          Revenue:{' '}
          {revenue?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </h3>
        <h3>Released: {formattedDate}</h3>

        <h3>
          Filmed in:{' '}
          {production_countries?.map((country, index) => (
            <span key={index}>
              {country.name}
              {index < production_countries.length - 1 && ', '}
            </span>
          ))}
        </h3>
        <a
          href={`https://www.youtube.com/results?search_query=${title}+trailer`}
          className="fs-1 trailer-link"
          target="_blank"
        >
          Watch Trailer <AiFillYoutube className="youtube-logo" />
        </a>
      </div>
    </div>
  );
}
export default MovieDetails;
