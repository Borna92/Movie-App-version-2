import { useContext, useState } from 'react';
import { AppContext } from './Context';

function SearchBar({ type }) {
  const [term, setTerm] = useState('');
  const { setSearchTerm } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(term);
    setTerm('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center align-items-center"
    >
      <input
        className="m-3 p-2 rounded search-input"
        type="text"
        placeholder={`Search ${type}`}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className="btn btn-primary">Search</button>
    </form>
  );
}
export default SearchBar;
