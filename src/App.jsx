import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pageComponents/Navbar';
import MovieDetails from './pageComponents/MovieDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Shows from './pageComponents/Shows';
import ShowDetails from './pageComponents/ShowDetails';
import { Movies } from './pageComponents/Movies';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/:id" element={<MovieDetails />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/shows/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
