import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container, Alert,
} from 'react-bootstrap';
import ImageList from '../layouts/imageList.layout.jsx';

function BookList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsloaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/books')
      .then((res) => res.json())
      .then((result) => {
        setIsloaded(true);
        setItems(result);
      },
      (error) => {
        setIsloaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <Alert variant="danger">
        Ошибка:
        {error.message}
      </Alert>
    );
  } if (!isLoaded) {
    return <Alert variant="info">Загрузкa...</Alert>;
  }
  return (
    <Container>
      <h3 className="text-center text-info">BookList</h3>
      <ImageList items={items} />
    </Container>

  );
}

export default BookList;
