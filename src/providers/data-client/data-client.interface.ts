export interface IDataClient {
  get<T>(api: string): Promise<T>;
}
