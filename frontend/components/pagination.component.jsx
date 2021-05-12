import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Pagination(props) {
  const arr = [];
  for (let i = 0; i < props.pages; i++) {
    arr.push(i + 1);
  }
  const links = arr.map((item) => {
    if (item == props.currentPage) {
      return (
        <span
          className="d-inline-block ml-2 text-warning"
          key={item}
        >
          {item}
        </span>
      );
    }
    return (
      <Link
        className="d-inline-block ml-2 text-info"
        key={item}
        to={`/search/${props.title}/${item}`}
      >
        {item}
      </Link>
    );
  });
  return (
    <>
      <hr />
      <div className="row">
        { links }
      </div>
    </>
  );
}

export default Pagination;
