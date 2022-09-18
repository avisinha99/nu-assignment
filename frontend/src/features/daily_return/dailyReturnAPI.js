export const fetchTimeData = async (equity_id) => {
  const url = `http://127.0.0.1:8000/api/daily_returns/${equity_id}/`
  return await fetch(url)
    .then((response) => {
      if (response.status === 200) return response
      throw []
    })
    .then((data) => data.json())
    .catch((error) => error)
}
