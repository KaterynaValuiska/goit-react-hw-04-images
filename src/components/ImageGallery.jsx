import PropTypes from 'prop-types';
import './styles.css';
export const ImageGallery = ({ cards, onSelect }) => {
  return (
    <>
      <ul className="ImageGallery">
        {cards.map(({ tags, webformatURL, id, largeImageURL }) => (
          <li
            key={id}
            className="ImageGalleryItem"
            onClick={() => onSelect(largeImageURL)}
          >
            <img
              src={webformatURL}
              alt={tags}
              id={id}
              loading="lazy"
              className="ImageGalleryItem-image"
            />
          </li>
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ),
};
