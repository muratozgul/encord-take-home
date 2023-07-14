export type TReduxError = { message: string }

export type TRequestStatus = {
  loading: boolean
  lastSuccess: number | null
  error: TReduxError | null
}
