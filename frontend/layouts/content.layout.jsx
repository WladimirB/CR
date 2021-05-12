/* eslint-disable import/extensions */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import RightBlock from './rightblock.layout.jsx';

function Content(props) {
  return (
    <Container className="mt-2">
      <Row>
        <Col sm={8}>
          { props.leftBlock }
        </Col>
        <Col sm={4}>
          <RightBlock />
        </Col>
      </Row>
    </Container>
  );
}

export default Content;
