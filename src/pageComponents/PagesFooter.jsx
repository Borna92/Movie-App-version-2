import Pagination from '@mui/material/Pagination';
import { useContext } from 'react';
import { AppContext } from './Context';

function PagesFooter() {
  const { totalPages, setPage, page } = useContext(AppContext);
  function handleChange(event, value) {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <Pagination
      showFirstButton
      showLastButton
      variant="outlined"
      shape="rounded"
      size="large"
      count={totalPages}
      page={page}
      onChange={handleChange}
      className="d-flex justify-content-center py-3"
    />
  );
}
export default PagesFooter;
