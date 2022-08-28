import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;

        return (
            <Container className="director-view">
              <Card className="border-0" style={{ color: "white", backgroundColor: "#222831" }}>
                <Card.Body>
                  <Card.Title>{director.Name}</Card.Title>
                  <Card.Text>
                    <span className="value">{director.Bio}</span>
                  </Card.Text>
                  <Card.Text>
                    <span className="label">Birth: </span>
                    <span className="value">{director.Birth}</span>
                  </Card.Text>
                  <Card.Text>
                    <span className="label">Death: </span>
                    <span className="value">{director.Death}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Button variant="outline-light" onClick={() => { onBackClick(); }}>Back</Button>
            </Container>
        );
    }
}

    DirectorView.propTypes = {
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
          }),
          onBackClick: PropTypes.func.isRequired
      };