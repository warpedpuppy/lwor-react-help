import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      movies:[ {_id: 1, Title:'Iron Man 3', Description: " When tony Stark''s world is torn apart by formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.", ImagePath: 'https://4.bp.blogspot.com/-kJjr_c1_GJI/VTDc8wrDDgI/AAAAAAAACV4/x0-GAv2P5GQ/s1600/ironman3-logo.png', Genre: 'Action', Director: 'Shane Black'},
              {_id: 2, Title: 'Black Widow', Description: 'Natasha Romanoff cnfronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.', ImagePath: 'https://th.bing.com/th/id/R.9a7957b79db60ce42ad443f6466d80b3?rik=vtIMR2eNErZwOg&pid=ImgRaw&r=0', Genre: 'Adventure', Director: 'Cate Shortland' },
              {_id: 3, Title: 'Guardians of the Galaxy', Description: 'A group of intergalactic criminals must pull together to stop a fantical warrior with plans to purge the universe.', ImagePath: 'https://orig00.deviantart.net/6b34/f/2014/178/e/b/guardians_of_the_galaxy_folder_icon_by_87ashish-d7o7u7o.png', Genre: 'Comedy', Director: 'James Gunn'}
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
    
    
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
       {selectedMovie
       ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
      
      : movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} onMovieClick
        ={ (movie) => {this.setSelectedMovie(movie) }}/>

      ))


      }
       
      </div>
    );
  }
}

