import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './Context';

function Card({ page }) {
  const { data } = useContext(AppContext);
  const IMGPATH = `https://image.tmdb.org/t/p/w1280`;

  return (
    <div className="movie-container">
      {data.map(({ id, title, name, vote_average, poster_path }) => (
        <Link to={`${page}${id}`} className="movie" key={id}>
          <img src={IMGPATH + poster_path} alt={title || name} />
          <div className="about p-3">
            <h2>{title || name}</h2>
            <h3
              className={`fw-bold score ${
                vote_average < 5 ? 'red' : vote_average < 8 ? 'yellow' : 'green'
              }`}
            >
              {vote_average.toFixed(1)}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default Card;
