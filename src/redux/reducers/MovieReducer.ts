import { Imovie } from '../../services/MovieService';
import { ISearchCondition } from '../../services/CommonTypes';
import {
  MovieActions,
  SaveMoviesAction,
  SetConditionAction,
  SetLoadingAction,
  DeleteAction,
  MovieSwitchAction,
} from '../actions/MovieAction';
import { Reducer } from 'react';

// 类型演算
export type IMovieCondition = Required<ISearchCondition>;

// 描述电影列表的状态类型
export interface IMovieState {
  data: Imovie[]; // 电影数组
  condition: IMovieCondition; // 查询条件
  total: number; // 总数据量
  isLoading: boolean; // 是否正在加载数据
  totalPage: number; // 总页数
}

const defaultState: IMovieState = {
  data: [],
  condition: {
    page: 1,
    limit: 10,
    key: '',
  },
  total: 0,
  isLoading: false,
  totalPage: 0,
};

type MovieReducer<A> = Reducer<IMovieState, A>;

const saveMovie: MovieReducer<SaveMoviesAction> = function (state, action) {
  return {
    ...state,
    data: action.payload.movies,
    total: action.payload.total,
    totalPage: Math.ceil(action.payload.total / state.condition.limit),
  };
};

const setCondition: MovieReducer<SetConditionAction> = function (
  state,
  action
) {
  const newState = {
    ...state,
    condition: {
      ...state.condition,
      ...action.payload,
    },
  };
  newState.totalPage = Math.ceil(newState.total / newState.condition.limit);
  return newState;
};

const setLoading: MovieReducer<SetLoadingAction> = function (state, action) {
  return {
    ...state,
    isLoading: action.payload,
  };
};

const deleteMovie: MovieReducer<DeleteAction> = function (state, action) {
  return {
    ...state,
    data: state.data.filter((m) => m._id !== action.payload),
    total: state.total - 1,
    totalPage: Math.ceil((state.total - 1) / state.condition.limit),
  };
};

const changeSwitch: MovieReducer<MovieSwitchAction> = function (state, action) {
  // 1、根据id找到对象
  const movie = state.data.find((d) => d._id === action.payload.id);
  if (!movie) {
    return state;
  }
  // 2、对象克隆
  const newMovie = { ...movie };
  newMovie[action.payload.type] = action.payload.newVal;
  // 3、将对象重新放入数组
  const newData = state.data.map((d) => {
    if (d._id === action.payload.id) {
      return newMovie;
    }
    return d;
  });

  return {
    ...state,
    data: newData,
  };
};

export default function (
  state: IMovieState = defaultState,
  action: MovieActions
) {
  switch (action.type) {
    case 'MOVIE_SAVE':
      return saveMovie(state, action);
    case 'MOVIE_SETCONDITION':
      return setCondition(state, action);
    case 'MOVIE_SETLOADING':
      return setLoading(state, action);
    case 'MOVIE_DELETE':
      return deleteMovie(state, action);
    case 'MOVIE_SWITCH':
      return changeSwitch(state, action);
    default:
      return state;
  }
}
