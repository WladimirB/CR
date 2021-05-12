import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function Reviews(props) {
  function toggle() {
    const review = event.target.nextSibling;
    if (!review.hidden) {
      if (review.classList.contains('d-none')) {
        review.classList.remove('d-none');
        return;
      }
      review.hidden = true;
      return;
    }
    review.hidden = false;
  }

  return (
    <div>
      Reviews:
      {props.reviews.length}
      <Button variant="info" size="sm" className="ml-1" onClick={toggle}>More</Button>
      <ul className="d-none">
        {props.reviews.map((item) => (
          <li key={item}>
            Author:
            {item.author}
            {' '}
            Comment:
            {item.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
