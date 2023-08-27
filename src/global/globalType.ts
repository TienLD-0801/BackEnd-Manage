export type ResponseType<D> = {
  data?: D | D[];
  statusCode?: number;
  message?: string;
};
