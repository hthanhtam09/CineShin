import axios from 'axios';
// import axiosClient from './axiosClient';

// https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1
// https://ophim1.com/phim/${slug}
// https://ophim1.com/phim/ngoi-truong-xac-song
// https://ophim9.cc/_next/data/s4OlXy8jONoHVWAT5vg7b/tim-kiem.json?keyword=tet-o-lang

const BASE_URL = 'https://ophim1.com';

const fetcher = (path: string) =>
  axios
    .get(`${BASE_URL}/${path}`, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
    .then((res) => res.data)
    .catch((err) => console.log('fetch error', err));

export default fetcher;
