/* eslint-disable react/sort-comp */
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import StoreContext from '../providers/context/storeContext';

function Dialog() {
  const { variant, message } = useContext(StoreContext).context;
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
}

export default Dialog;
