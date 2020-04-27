export interface IResponseError {
  err: string;
  data: null;
}

export interface IResponseData<T> {
  err: string;
  data: T;
}

export interface IResponsePageData<T> {
  err: string;
  total: number;
  data: T[];
}

export interface ISearchCondition {
  page?: number;
  limit?: number;
  key?: string;
}
