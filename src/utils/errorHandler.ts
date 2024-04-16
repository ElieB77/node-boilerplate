export interface ResponseError extends Error {
  statusCode?: number;
  data?: string | string[];
}

export const errorHandler: (
  statusCode: number,
  message: string,
  data?: string | string[]
) => ResponseError = (statusCode, message, data) => {
  const error: ResponseError = new Error(message);
  error.statusCode = statusCode;
  error.data = data;
  return error;
};
