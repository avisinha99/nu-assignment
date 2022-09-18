export const fetchEquities = async () => {
  const url = "http://127.0.0.1:8000/api/equity/"
  return await fetch(url)
    .then((data) => data.json())
    .then((data) => data)
    .catch((error) => error)
}
