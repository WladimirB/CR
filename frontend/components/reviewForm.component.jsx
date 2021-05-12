import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import {
  HOST, PORT, BOOK, REVIEWS,
} from '../../config/uriparts';
import StoreContext from '../providers/context/storeContext';

function ReviewForm() {
  const { bookId } = useParams();
  const { setVariant, setMessage, cleanDialog } = useContext(StoreContext).context;
  const [review, setReview] = useState('Perfect Book');
  const data = {
    itemId: bookId,
    comment: review,
  };

  function sendReview(event) {
    event.preventDefault();
    const url = `${HOST}:${PORT}${BOOK}/${bookId}${REVIEWS}`;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setVariant(response.ok);
        return response.json();
      })
      .then((result) => {
        setMessage(result.message);
        setTimeout(cleanDialog, 5000);
      }, (error) => {
        setVariant(false);
        setMessage(error);
        setTimeout(cleanDialog, 5000);
      });
  }

  return (
    <Form>
      <Form.Group>
        <Form.Control name="bookId" className="d-none" readOnly value={bookId} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="review"
          placeholder="Enter your review"
          onChange={(event) => setReview(event.target.value)}
        />
      </Form.Group>
      <Button variant="info" type="submit" onClick={sendReview}>
        Add review
      </Button>
    </Form>
  );
}

export default ReviewForm;
