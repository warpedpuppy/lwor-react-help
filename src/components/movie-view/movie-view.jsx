import React from 'react';

import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
        <Row className="main-view justify-content-md-center">
            <Col md={12} >

                <div className="movie-view" >
                    <Row>
                        <Col className="movie-col" md={6}>
                            <div className="movie-poster" ><img src={movie.ImagePath} crossOrigin="anonymous" className='movie-image' /></div>
                        </Col>


                        <Col className="movie-col" md={6}>
                            <Row >
                                <div className="movie-title">
                                    <span className="value">{movie.Title}</span>
                                </div>
                                <div className="movie-description">
                                    <span className="value">{movie.Description}</span>
                                </div>


                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <div className="movie-genre">
                                        <span className="value">{movie.Genre.Name}</span>
                                    </div>
                                </Link>
                            </Row>
                            <Row>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <div className="movie-director">
                                        <span className="value">Directed by {movie.Director.Name}</span>
                                    </div>
                                </Link>

                            </Row>
                            <Row className="back-row"><Col ><Button onClick={() => { onBackClick(); }} >Back</Button></Col></Row>


                        </Col>
                    </Row>

                </div>
                <Row><Col md={12}>  </Col></Row>
            </Col>

        </Row>

    )
}
}

