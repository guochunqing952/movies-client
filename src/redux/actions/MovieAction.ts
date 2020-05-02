// 各种action创建函数

import { Action, ChangeType } from './ActionTypes';
import { Imovie } from '../../services/MovieService';
import { ISearchCondition } from '../../services/CommonTypes';

export const actionTypes = {
  movieSave: Symbol('MOVIE_SAVE'),
  movieSetLoading: Symbol('MOVIE_SETLOADING'),
  movieSetCondition: Symbol('MOVIE_SETCONDITION'),
  movieDelete: Symbol('MOVIE_DELETE'),
  movieSwitch: Symbol('MOVIE_SWITCH'),
  fetchMovie: Symbol('FETCH_MOVIE'),
  deleteMovie: Symbol('DELETE_MOVIE'),
  changeMovie: Symbol('CHANGE_MOVIE'),
};

export type SaveMoviesAction = Action<{
  movies: Imovie[];
  total: number;
}>;

export function saveMoviesAction(
  movies: Imovie[],
  total: number
): SaveMoviesAction {
  return {
    type: actionTypes.movieSave,
    payload: {
      movies,
      total,
    },
  };
}

export type SetLoadingAction = Action<boolean>;

export function setLoadingAction(isLoading: boolean): SetLoadingAction {
  return {
    type: actionTypes.movieSetLoading,
    payload: isLoading,
  };
}

export type SetConditionAction = Action<ISearchCondition>;

export function setConditionAction(
  condition: ISearchCondition
): SetConditionAction {
  return {
    type: actionTypes.movieSetCondition,
    payload: condition,
  };
}

export type DeleteAction = Action<string>;

export function deleteAction(id: string): DeleteAction {
  return {
    type: actionTypes.movieDelete,
    payload: id,
  };
}

export type MovieSwitchAction = Action<{
  type: ChangeType;
  newVal: boolean;
  id: string;
}>;
// 改变热映、经典影片等
export function changeSwitchAction(
  type: ChangeType,
  newVal: boolean,
  id: string
): MovieSwitchAction {
  return {
    type: actionTypes.movieSwitch,
    payload: {
      type,
      newVal,
      id,
    },
  };
}

export function fetchMovies() {
  return {
    type: actionTypes.fetchMovie,
  };
}

export function deleteMovies() {
  return {
    type: actionTypes.deleteMovie,
  };
}

export function changeSwitch() {
  return {
    type: actionTypes.changeMovie,
  };
}

export type MovieActions =
  | SaveMoviesAction
  | SetLoadingAction
  | SetConditionAction
  | DeleteAction
  | MovieSwitchAction;
