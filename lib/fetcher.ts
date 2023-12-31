import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    })
    .then((res) => res.data)
    .catch((err) => console.log('fetch error', err));

export default fetcher;
