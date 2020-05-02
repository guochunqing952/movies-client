import React, { Component, Dispatch } from 'react';
import MovieTable, { IMovieTableEvents } from '../../components/MovieTable';
import { connect } from 'react-redux';
import { IMovieState } from '../../redux/reducers/MovieReducer';
import {
  fetchMovies,
  changeSwitch,
  setConditionAction,
  changeSwitchAction,
  deleteAction,
  deleteMovies,
} from '../../redux/actions/MovieAction';

function mapStateToProps(state: any): IMovieState {
  return state.movie;
}

function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents {
  return {
    onLoad() {
      dispatch(fetchMovies());
    },
    onSwitchChange(type, newState, id) {
      dispatch(changeSwitchAction(type, newState, id));
      dispatch(changeSwitch());
    },
    onDelete(id: string) {
      dispatch(deleteAction(id));
      dispatch(deleteMovies());
    },
    onChange(newPage) {
      dispatch(
        setConditionAction({
          page: newPage,
        })
      );
      dispatch(fetchMovies());
    },
    onKeyChange(key) {
      console.log(key);
      dispatch(
        setConditionAction({
          key,
        })
      );
    },
    onSearch() {
      dispatch(
        setConditionAction({
          page: 1,
        })
      );
      dispatch(fetchMovies());
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
