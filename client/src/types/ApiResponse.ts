export type ApiSuccessfullResponse<TData> = {
  code: number;
  message: string;
  data: TData;
};
