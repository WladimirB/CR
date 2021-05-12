import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ImageList(props) {
  return (
    <Row>
      { props.items.map((item) => (
        <div key={item._id} className="d-flex flex-column justify-content-between ml-2" style={{ width: '100px' }}>
          <span className="d-block w-50">{item.title}</span>
          <Link to={`/books/${item._id}`} className="d-block w-25">
            <img src="../../img/testImage.jpeg" alt="testimage" />
          </Link>
        </div>
      )) }
    </Row>
  );
}

export default ImageList;
