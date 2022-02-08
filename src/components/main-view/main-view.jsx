import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


import './main-view.scss';
export class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      movies:[],
      selectedMovie: null,
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://intense-ridge-76926.herokuapp.com/', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies:response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
}  


  render() {
    const { movies, user } = this.state;
    
   
    
  
    return(
      <Router>
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
             if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
             );
            
           
             return 
               movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
               ))
          }} />
    
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
         return <Col>
         <RegistrationView />
         </Col>
        }} />



            <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              
               if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:name" render={({ match, history }) => {
                 if (!user) return 
                 <Col>
                   <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                 </Col>
               
                if (movies.length === 0) return <div className="main-view" />;
                 if ( !user ) 
                 return (
                   <Col>
                     <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                   </Col>
                 );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView Genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

       <Route path="/directors/:name" render={({ match, history }) => {
       if (movies.length === 0) return <div className="main-view" />;
       return <Col md={8}>
       <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
       </Col>
       }
    } />

        
          <Route  path="/users" render={({ history }) => {
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return (
              
              <Col>
                <ProfileView
               user = {this.state.user}
               movies = {movies}
                onBackClick={() => history.goBack()} />
              </Col>
              )
            }} />           



        </Row>
      </Router>
    );
  }
}



 
   
  
