import React from 'react';
import './Main.css';
import MovieList from '../components/MovieList';
import Preloader from '../components/Preloader';
import Search from '../components/Search';

class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
        count: 0
    }

    componentDidMount() {
        fetch("http://omdbapi.com/?apikey=4eb9d7fd&s=matrix")
            .then(response => response.json())
            .then(data => this.setState({ movies: data.Search, loading: false, count: data.totalResults }))
    }

    searchMovies = (str, type='all', page) => {
        fetch(`http://www.omdbapi.com/?apikey=4eb9d7fd&s=${str}${type
            !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
            .then(response => response.json())
            .then(data => this.setState({ movies: data.Search, loading: false, count: data.totalResults }))
    }

    render() {
        const {movies, loading, count} = this.state;
        
        return (
            <div className="main">
                <div className="wrap">
                    <Search searchMovies={this.searchMovies} totalCount={count} />
                    {
                        loading ? <Preloader /> : <MovieList movies={movies} /> 
                   }                    
                </div>
            </div>
        )
    }
}

export default Main;