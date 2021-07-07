import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import {Link} from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`, {id: this.props.match.params.id})
    .then(() => this.props.history.push("/"))
    .catch(err => console.log(err.response));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="movie-buttons-container">
          <div className="movie-button" onClick={this.saveMovie}>
            Save
          </div>
          <Link className="movie-button" to={`/update-movie/${this.props.match.params.id}`}>
            Edit
          </Link>
          <div className="movie-button" onClick={this.deleteMovie}>
            Delete
          </div>
        </div>
        {/* <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link to={`/update-movie/${this.props.match.params.id}`} className="edit-button" onClick={this.editMovie}>
          Edit
        </Link> */}
      </div>
    );
  }
}
