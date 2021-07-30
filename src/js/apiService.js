import { Notify } from 'notiflix';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22670209-9efd588e2ff75ea334072990b';

export default class API {
   constructor() {
      this.page = 1;
      this.perPage = 39;
      this.value = "";
   }
   
   async fetchHits() {
      let params = `?key=${API_KEY}&q=${this.value}&page=${this.page}&per_page=${this.perPage}&image_type=photo&orientation=horizontal&safesearch=false`;
      const url = `${BASE_URL}/${params}`
      try {
         const response = await fetch(url)
         const hits = await response.json();

         this.incrementPage();
         
         return hits;
      } catch {
         Notify.failure("Something went wrong on a server. Try to repeat the request later.")
      }
   };

   incrementPage() {
      this.page += 1;
   }

   resetPage() {
      this.page = 1;
   }

   set query(newValue) {
      this.value = newValue;
   }

   get query() {
      return this.value;
   }

}
