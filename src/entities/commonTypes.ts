export interface SearchResult<T> {
  count: number;
  data: T[];
  errors: string[];
}
