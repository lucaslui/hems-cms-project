export const makeApiUrl = (path: string): string | undefined => {
  return `${process.env.API_URL}${path}`
}
