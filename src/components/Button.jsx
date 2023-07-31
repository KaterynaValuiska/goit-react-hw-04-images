import { Link, animateScroll as scroll } from 'react-scroll';
import PropTypes from 'prop-types';
export const Button = ({ handleChangePage }) => {
  const scrollToTop = () => {
    scroll.scrollToBottom();
  };

  return (
    <div onClick={scrollToTop}>
      <Link to="loadMore" />
      <button
        type="button"
        id="loadMore"
        className="Button"
        onClick={handleChangePage}
      >
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};
