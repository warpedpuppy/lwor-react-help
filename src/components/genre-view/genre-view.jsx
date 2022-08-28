import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
      const { genre, onBackClick, movies } = this.props;
 return (
  <Container className="genre-view">
      <Card bg="secondary" text="light" border="light" align="center">
          <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>
              <span className="value">{genre.Description}</span>
            </Card.Text>
          </Card.Body>
        </Card>
        <Button variant="outline-light" onClick={() => { onBackClick(); }}>Back</Button>
      </Container>
 )

}


}
GenreView.propTypes = {
  genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
};