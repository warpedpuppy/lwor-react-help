import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import './main-view.scss';

class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      user: null
    };
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


  getMovies(token) {
    axios.get('https://intense-ridge-76926.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
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
    let { movies } = this.props;
    let { user } = this.state;

    
   
    
  
    return(
      <Router>
        <Row className='main-view justify-content-md-center'>

        <Route exact path='/' render={() => {
                    if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;

                  return <MoviesList movies={movies}/>;
                }} />

    

        <Route path='/register' render={() => {
          if (user) {
          return <Redirect to='/' />
          }
         return <Col>
         <RegistrationView />
         </Col>
        }} />



            <Route path='/movies/:movieId' render={({ match, history }) => {
                if (!user) { 
                  return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                  );
                }
              
               if (movies.length === 0) {
                  return <div className='main-view' />;
               }
              return (
                 <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
              </Col>
              );
            }} />

            <Route path='/genre/:name' render={({ match, history }) => {
                 if (!user) { 
                   return (
                 <Col>
                   <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                 </Col>
               );
          }
                if (movies.length === 0) {
                return <div className='main-view' />;
        }
              
              return (
               <Col md={8}>
                <GenreView 
                genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} 
                movies={movies.filter(movie => movies.Genre.Name === match.params.name)}/>
              </Col>
              )
            }} />

       <Route path='/director/:name' render={({ match, history }) => {
         if (!user) {
          return (
              <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
          );
      }

      if (movies.length === 0) return <div className='main-view' />;

      return (
          <Col md={8}>
              <DirectorView
                  director={movies.find(m => m.Director.Name === match.params.name).Director}
                  onBackClick={() => history.goBack()}
                  movies={movies.filter(movie => movies.Director.Name === match.params.name)} />
          </Col>
      );
  }} />

        
<Route path= 'profile' render={({ history }) => {
         if (!user) {
           return (
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
             </Col>
           );
          }

        return (
             <Col md={8}>
               <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
             );
          }} />


        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { 
    movies: state.movies, 
 
  }
};

export default connect(mapStateToProps, { setMovies})(
  MainView
);


 
   
  
