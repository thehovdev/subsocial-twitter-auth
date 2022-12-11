export interface Tweet {
  id: string,
  text: string,
  status?: boolean,
}
export interface Tweets {
  items: Tweet[]
}