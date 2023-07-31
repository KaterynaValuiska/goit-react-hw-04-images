import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';
import './styles.css';
import { useState } from 'react';

export const Searchbar = ({ inputSubmit }) => {
  const [inputValueS, setInputValueS] = useState('');
  const handleChange = evt => {
    setInputValueS(evt.currentTarget.value.toLowerCase());
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    if (inputValueS.trim() === '') {
      toast.warn('Not found. Enter your request.');
      return;
    }
    inputSubmit(inputValueS);
    setInputValueS('');
  };
  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <BsSearch />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  inputSubmit: PropTypes.func.isRequired,
};
