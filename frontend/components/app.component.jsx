/* eslint-disable import/extensions */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { Jumbotron, Container, Alert } from 'react-bootstrap';
import Header from '../layouts/header.layout.jsx';
import Footer from '../layouts/footer.layout.jsx';
import Content from '../layouts/content.layout.jsx';
import RegisterForm from './registerForm.component.jsx';
import LoginForm from './loginForm.component.jsx';
import BookList from './bookList.component.jsx';
import Book from './book.component.jsx';
import ReviewForm from './reviewForm.component.jsx';
import StoreContext from '../providers/context/storeContext';
import Dialog from './dialog.component.jsx';
import SearchForm from './searchForm.component.jsx';

function App() {
  return (
    <Container>
      <Header />
      <Jumbotron className="mb-0 pt-3">
        <Dialog />
        <h1 className="text-info text-center">Clonereads</h1>
        <hr />
        <Switch>
          <Route exact path="/">
            <Content leftBlock={<BookList />} />
          </Route>
          <Route path="/books/:bookId">
            <Content leftBlock={<Book bookid=":bookId" />} />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <StoreContext.Consumer>
              {({ context }) => (<LoginForm context={context} />)}
            </StoreContext.Consumer>
          </Route>
          <Route path="/book/:bookId/review">
            <Content leftBlock={<ReviewForm bookid=":bookId" />} />
          </Route>
          <Route path="/search/:search/:page">
            <Content leftBlock={<SearchForm getTitle=":search" page=":page" />} />
          </Route>
          <Route path="/search">
            <Content leftBlock={<SearchForm />} />
          </Route>
        </Switch>
      </Jumbotron>
      <Footer />
    </Container>
  );
}

export default App;
