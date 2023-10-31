export interface Pagination {
  hasPrevious: boolean,
  hasNext: boolean,
  last: number,
  first: number,
  actual: number,
  pages: number[]
}
