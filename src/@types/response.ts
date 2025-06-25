export default interface Response<T> {
  statusCode: number;
  content: T;
  dateTime: string;
}
