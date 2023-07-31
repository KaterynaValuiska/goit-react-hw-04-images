import { Searchbar } from './Searchbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const [total, setTotal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setStatus('pending');

    const API_KEY = '37154434-e108fb93a0dd643270de780f1';
    const perPage = 12;
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: inputValue,
      page: currentPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
    });
    fetch(`https://pixabay.com/api/?${searchParams}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Not found ${inputValue}`));
      })
      .then(data => {
        if (!data.total) {
          setStatus('rejected');
          toast.error(`Not found ${inputValue}`);
          return Promise.reject(new Error(`Not found ${inputValue}`));
        }
        setCards(prevState => [...prevState, ...data.hits]);
        setTotal(data.totalHits - currentPage * 12);
        setStatus('resolved');
      })
      .catch(error => {
        setStatus('rejected');
        setError(error);
        alert(`Not found ${inputValue}`);
        console.error(error);
      });
  }, [inputValue, currentPage]);

  const handleSelectFoto = largeImageURL => {
    toggleModal();
    setCard(largeImageURL);
  };
  const handleFormSubmit = inputValueS => {
    if (inputValue === inputValueS) {
      toast(`${inputValue} already found`);
      return;
    }
    setInputValue(inputValueS);
    setCards([]);
    setCurrentPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const nextPage = () => {
    return setCurrentPage(prevState => prevState + 1);
  };
  if (status === 'idle') {
    return (
      <div className="App">
        <Searchbar inputSubmit={handleFormSubmit} />
        <ToastContainer autoClose={3000} />;
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="App">
        <Searchbar inputSubmit={handleFormSubmit} />
        <Loader />
        <ToastContainer autoClose={3000} />;
      </div>
    );
  }
  if (status === 'rejected') {
    toast.error(error.message);
    return (
      <div className="App">
        <Searchbar inputSubmit={handleFormSubmit} />
        <ToastContainer autoClose={3000} />;
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div className="App">
        <Searchbar inputSubmit={handleFormSubmit} />
        <ImageGallery
          cards={cards}
          onSelect={handleSelectFoto}
          toggleModal={toggleModal}
        />
        {total >= 0 && <Button handleChangePage={nextPage} />}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={card} alt="" width={600} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />;
      </div>
    );
  }
};
