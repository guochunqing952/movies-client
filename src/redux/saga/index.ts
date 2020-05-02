import movieTask from './MovieSaga';
import { all } from 'redux-saga/effects';

export default function* () {
  yield all([movieTask()]);
}
