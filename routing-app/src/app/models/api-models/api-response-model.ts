export interface BasicApiResponseModel<T> {
    code: string;
    message?: string;
    payload: T;
  }