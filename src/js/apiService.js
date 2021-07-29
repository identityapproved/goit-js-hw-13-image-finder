const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22670209-9efd588e2ff75ea334072990b';

let page = 1;
let perPage = 39;

function fetchHits(value) {
   let params = `?key=${API_KEY}&q=${value}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=false`;
   const url = `${BASE_URL}/${params}`
   
   return fetch(url)
      .then(r => r.json())
      .catch(e => console.log(error))
};

export default { fetchHits };
