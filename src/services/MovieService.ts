import axios from 'axios';
import {
  IResponseData,
  IResponseError,
  ISearchCondition,
  IResponsePageData,
} from './CommonTypes';

export interface Imovie {
  _id?: string;
  name: string;
  types: string[];
  areas: string[];
  timeLong: number;
  isHot: boolean;
  isComing: boolean;
  isClassic: boolean;
  description?: string;
  poster?: string;
}

export class MovieService {
  public static async add(
    movie: Imovie
  ): Promise<IResponseData<Imovie> | IResponseError> {
    const resp = await axios.post('/api/movie', movie);
    return resp.data;
  }

  public static async edit(
    id: string,
    movie: Partial<Imovie>
  ): Promise<IResponseData<true> | IResponseError> {
    const resp = await axios.put('/api/movie/' + id, movie);
    return resp.data;
  }

  public static async delete(
    id: string
  ): Promise<IResponseData<true> | IResponseError> {
    const resp = await axios.delete('/api/movie/' + id);
    return resp.data;
  }

  public static async getMovieById(
    id: string
  ): Promise<IResponseData<Imovie | null>> {
    const resp = await axios.get('/api/movie/' + id);
    return resp.data;
  }

  public static async getMovies(
    condition: ISearchCondition
  ): Promise<IResponsePageData<Imovie>> {
    const resp = await axios.get('/api/movie', {
      params: condition,
    });
    return resp.data;
  }
}
