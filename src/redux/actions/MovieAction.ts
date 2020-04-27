// 各种action创建函数

import { IAction } from './ActionTypes';
import { Imovie, MovieService } from '../../services/MovieService';
import { ISearchCondition } from '../../services/CommonTypes';

export type SaveMoviesAction = IAction<
  'MOVIE_SAVE',
  {
    movies: Imovie[];
    total: number;
  }
>;

export function saveMoviesAction(
  movies: Imovie[],
  total: number
): SaveMoviesAction {
  return {
    type: 'MOVIE_SAVE',
    payload: {
      movies,
      total,
    },
  };
}

export type SetLoadingAction = IAction<'MOVIE_SETLOADING', boolean>;

export function setLoadingAction(isLoading: boolean): SetLoadingAction {
  return {
    type: 'MOVIE_SETLOADING',
    payload: isLoading,
  };
}

export type SetConditionAction = IAction<
  'MOVIE_SETCONDITION',
  ISearchCondition
>;

export function setConditionAction(
  condition: ISearchCondition
): SetConditionAction {
  return {
    type: 'MOVIE_SETCONDITION',
    payload: condition,
  };
}

export type DeleteAction = IAction<'MOVIE_DELETE', string>;

export function deleteAction(id: string): DeleteAction {
  return {
    type: 'MOVIE_DELETE',
    payload: id,
  };
}

// 改变热映、经典影片等
export function changeSwitchAction(
  type: 'isHot' | 'isComing' | 'isClassic',
  newVal: boolean,
  id: string
): MovieSwitchAction {
  return {
    type: 'MOVIE_SWITCH',
    payload: {
      type,
      newVal,
      id,
    },
  };
}

// 根据条件从服务器获取电影的数据
export function fetchMovies(condition: ISearchCondition) {
  return async (dispatch: any, getState: any) => {
    // 1、设置加载状态
    dispatch(setLoadingAction(true));
    // 2、设置条件
    dispatch(setConditionAction(condition));
    // 3、获取服务器数据
    const curCondition = getState().movie.condition;
    const resp = await MovieService.getMovies(curCondition);
    // 4、更改仓库的数据
    dispatch(saveMoviesAction(resp.data, resp.total));
    // 5、 关闭加载状态
    dispatch(setLoadingAction(false));
  };
}

// 删除电影数据
export function deleteMovie(id: string) {
  return async (dispatch: any) => {
    // 1、设置加载状态
    dispatch(setLoadingAction(true));
    // 2、 删除仓库数据
    await MovieService.delete(id);
    dispatch(deleteAction(id));
    // 3、 关闭加载状态
    dispatch(setLoadingAction(false));
  };
}

export type MovieSwitchAction = IAction<
  'MOVIE_SWITCH',
  {
    type: 'isHot' | 'isComing' | 'isClassic';
    newVal: boolean;
    id: string;
  }
>;

// 改变热映、经典影片等
export function changeSwitch(
  type: 'isHot' | 'isComing' | 'isClassic',
  newVal: boolean,
  id: string
) {
  return async (dispatch: any) => {
    dispatch(changeSwitchAction(type, newVal, id));
    await MovieService.edit(id, {
      [type]: newVal,
    });
  };
}

export type MovieActions =
  | SaveMoviesAction
  | SetLoadingAction
  | SetConditionAction
  | DeleteAction
  | MovieSwitchAction;
