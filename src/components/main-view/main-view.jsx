import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      movies:[ {_id: 1, Title:'Iron Man 3', Description: " When tony Stark''s world is torn apart by formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.", ImagePath: 'https://th.bing.com/th/id/R.5d1e5f8259313d7b3b83973d92632e59?rik=%2byeCQwRqvUq0%2bQ&pid=ImgRaw&r=0', Genre: 'Action', Director: 'Shane Black'},
              {_id: 2, Title: 'Black Widow', Description: 'Natasha Romanoff cnfronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.', ImagePath: 'https://th.bing.com/th/id/OIP.QvgVT6sUu51B1GDPyY-rpwHaKO?pid=ImgDet&rs=1', Genre: 'Adventure', Director: 'Cate Shortland' },
              {_id: 3, Title: 'Guardians of the Galaxy', Description: 'A group of intergalactic criminals must pull together to stop a fantical warrior with plans to purge the universe.', ImagePath: 'https://th.bing.com/th/id/R.e89d450ebca76f1f0f1064d225bc1ca7?rik=jmGkuvO5ixORww&pid=ImgRaw&r=0', Genre: 'Comedy', Director: 'James Gunn'}
    ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    
    if (selectedMovie) return <MovieView movie ={selectedMovie} />;
    
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
       {selectedMovie
       ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie =>
      {this,setSelectedMovie(newSelectedMovie); }}/>
      : movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} onMovieClick
        ={ (movie) => {this.setSelectedMovie(movie) }}/>

      ))


      }
       
      </div>
    );
  }
}

