import React, { Component, Dispatch } from 'react';
import MovieTable, { IMovieTableEvents } from '../../components/MovieTable';
import { connect } from 'react-redux';
import { IMovieState } from '../../redux/reducers/MovieReducer';
import {
  fetchMovies,
  changeSwitch,
  deleteMovie,
  setConditionAction,
} from '../../redux/actions/MovieAction';

function mapStateToProps(state: any): IMovieState {
  return state.movie;
}

function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents {
  return {
    onLoad() {
      dispatch(
        fetchMovies({
          page: 1,
          limit: 10,
          key: '',
        })
      );
    },
    onSwitchChange(type, newState, id) {
      dispatch(changeSwitch(type, newState, id));
    },
    async onDelete(id: string) {
      dispatch(deleteMovie(id));
    },
    onChange(newPage) {
      dispatch(
        fetchMovies({
          page: newPage,
        })
      );
    },
    onKeyChange(key) {
      dispatch(
        setConditionAction({
          key,
        })
      );
    },
    onSearch() {
      dispatch(
        fetchMovies({
          page: 1,
        })
      );
    },
  };
}

const MovieContainer = connect(mapStateToProps, mapDispatchToProps)(MovieTable);

export default class MovieList extends Component {
  render() {
    return (
      <div>
        <MovieContainer />
      </div>
    );
  }
}
