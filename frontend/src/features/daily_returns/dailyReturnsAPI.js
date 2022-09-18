export const fetchDailyReturns = async () => {
  const url = "http://127.0.0.1:8000/api/daily_returns/"
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error)
}
