import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form, FormControl, Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
  HOST, PORT, BOOK, SEARCH,
} from '../../config/uriparts';
import StoreContext from '../providers/context/storeContext';
import ImageList from '../layouts/imageList.layout.jsx';
import Pagination from './pagination.component.jsx';

function SearchForm() {
  const page = useParams().page || 1;
  const { search } = useParams();
  const [searchItems, setSearchItems] = useState([]);
  const [pages, setPages] = useState(0);
  const [err, setErr] = useState(null);
  const [title, setTitle] = useState('');
  const { setVariant, setMessage, cleanDialog } = useContext(StoreContext).context;

  useEffect(() => {
    const getUrl = `${HOST}:${PORT}${BOOK}${SEARCH}/${search}/${page - 1}`;
    fetch(getUrl)
      .then((response) => response.json())
      .then((result) => {
        if (!result.message) {
          setSearchItems(result.books);
          setPages(result.totalPages);
        } else {
          setMessage(result.message);
          setSearchItems([]);
        }
        setTimeout(cleanDialog, 5000);
      }, (error) => {
        setErr(err);
        setVariant(false);
        setMessage(error);
        setTimeout(cleanDialog, 5000);
      });
  }, [page]);

  function load(event) {
    event.preventDefault();
    const url = `${HOST}:${PORT}${BOOK}${SEARCH}/${title}/${page-1}`;

    fetch(url)
      .then((response) => {
        setVariant(response.ok);
        return response.json();
      })
      .then((result) => {
        if (!result.message) {
          setMessage(`Результаты поиска:найдено ${result.totalItems} совпадений`);
          setSearchItems(result.books);
          setPages(result.totalPages);
        } else {
          setMessage(result.message);
          setSearchItems([]);
        }
        setTimeout(cleanDialog, 5000);
      }, (error) => {
        setErr(err);
        setVariant(false);
        setMessage(error);
        setTimeout(cleanDialog, 5000);
      });
  }

  return (
    <>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          onChange={(event) => { setTitle(event.target.value); }}
          className="mr-sm-2"
        />
        <Button variant="success" type="submit" onClick={load} size="sm">Search</Button>
      </Form>
      { searchItems.length > 0
        && <ImageList items={searchItems} /> }
      { pages > 1 && <Pagination title={title || search} pages={pages} currentPage={page} /> }
    </>
  );
}

export default SearchForm;
