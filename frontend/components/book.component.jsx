import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container, Row, Col, Button, ButtonGroup,
} from 'react-bootstrap';
import { HOST, PORT, BOOK } from '../../config/uriparts';
import StoreContext from '../providers/context/storeContext';

function Book() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const [reviews, setReviewsCount] = useState(0);
  const { bookId } = useParams();
  const { setVariant, setMessage, cleanDialog } = useContext(StoreContext).context;

  useEffect(() => {
    fetch(`${HOST}:${PORT}${BOOK}/${bookId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setReviewsCount(result.reviews.length);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  function execAction(event) {
    const PROPERTY = event.target.dataset.action;
    if (PROPERTY == 'review') return;
    const data = { itemId: items._id, property: PROPERTY };
    const url = `${HOST}:${PORT}/${PROPERTY}/add`;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status >= 400) {
          setVariant('danger');
        } else {
          setVariant('success');
        }
        return response.text();
      })
      .then((result) => {
        setMessage(result);
        setTimeout(cleanDialog, 5000);
      }, (error) => {
        setVariant('danger');
        setMessage(error);
        setTimeout(cleanDialog, 5000);
      });
  }

  if (error) {
    return (
      <div>
        Ошибка:
        {error.message}
      </div>
    );
  } if (!isLoaded) {
    return <div>Загрузка...</div>;
  } if (isLoaded) {
    return (
      <Container fluid>
        <Row>
          <Col sm={4}>
            <h3>Item</h3>
            <img src="../img/bigtestimage.jpeg" alt="bigtestimage" className="d-inline-block w-75 mr-1" />
            <p>
              Price:
              {items.price}
            </p>
            <ButtonGroup aria-label="Basic example" data-id={items._id} onClick={execAction} vertical>
              <Button variant="secondary" data-action="basket" size="sm">Купить</Button>
              <Button variant="secondary" data-action="favorites" size="sm">Избранное</Button>
              <Link to={`/book/${bookId}/review`} className="btn btn-secondary btn-sm" data-action="review">Отзыв</Link>
            </ButtonGroup>
          </Col>
          <Col sm={8} className="text-center">
            <h3>
              Tittle:
              {items.title}
            </h3>
            <h4>Item Description</h4>
            <p>{items.description}</p>
            <p><Button variant="info" size="sm">MoreDescription</Button></p>
            <p>
              Release date:
              {items.releaseDate}
            </p>
            <p>
              Author:
              {items.authors}
            </p>
            <p>
              Rating:
              {items.rating}
            </p>
            <p>
              Reviews:
              {reviews}
            </p>
            <Button size="sm">Show Reviews</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Book;
