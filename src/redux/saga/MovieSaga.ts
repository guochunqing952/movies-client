import { takeEvery, select, call, put } from 'redux-saga/effects';
import {
  actionTypes,
  saveMoviesAction,
  setLoadingAction,
} from '../actions/MovieAction';
import { MovieService, Imovie } from '../../services/MovieService';

function* fetchMovies() {
  yield put(setLoadingAction(true));
  const condition = yield select((state) => state.movie.condition);
  const resp = yield call(MovieService.getMovies, condition);
  yield put(saveMoviesAction(resp.data, resp.total));
  yield put(setLoadingAction(false));
}

function* deleteMovie() {
  yield put(setLoadingAction(true));
  const id = yield select((state) => state.movie.id);
  yield call(MovieService.delete, id);
  yield put(setLoadingAction(false));
}

function* changeMovie() {
  const resp = yield select((state) => state.movie);
  const [data] = resp.data.filter((item: Imovie) => item._id === resp.id);
  yield call(MovieService.edit, resp.id, { [resp.type]: data[resp.type] });
}

export default function* () {
  yield takeEvery(actionTypes.fetchMovie, fetchMovies);
  yield takeEvery(actionTypes.deleteMovie, deleteMovie);
  yield takeEvery(actionTypes.changeMovie, changeMovie);
}
