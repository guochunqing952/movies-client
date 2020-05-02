import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/RootReducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootTask from './saga/index';

const sagaMid = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMid, logger));

sagaMid.run(rootTask);
console.log('saga任务已经启动');
