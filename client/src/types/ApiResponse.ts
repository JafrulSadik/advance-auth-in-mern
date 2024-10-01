export type ApiSuccessfullResponse<TData> = {
  code: number;
  success: boolean;
  message: string;
  data: TData;
};

export type ApiErrorResponse = {
  success: boolean;
  code: number;
  message: string;
};
