import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      FavoriteMovies: []
    };
  }

  onAddFavorite = (movie) => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(
      ` https://intense-ridge-76926.herokuapp.com//users/${Username}/movies/${movie._id}`,
      {
        FavoriteMovies: this.state.FavoriteMovies
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies
        });
        console.log(response);
        alert("Movie Added");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card" key={movie._id}>
         <Card.Img variant="top" src={movie.ImagePath} style={{ padding: 10 }} crossOrigin='anonymous' />
       
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Subtitle>{movie.Genre.Name}</Card.Subtitle>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">{movie.Title}</Button>
            </Link>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="primary" value={movie._id} onClick={() => this.onAddFavorite(movie)}>Add to Favorite</Button>
        </Card.Footer>
       
      </Card>
    );
  }
}


MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string.isRequired,
			Death: PropTypes.string
		}),
		ImageURL: PropTypes.string,
		Featured: PropTypes.bool
	}).isRequired,
};

export default MovieCard;