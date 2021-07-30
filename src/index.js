import './css/main.css';
import { refs } from "./js/refs"
import { Notify } from 'notiflix';
import API from './js/apiService';
import imageCardTemp from "./templates/imageCard.hbs";

const apiService = new API();

refs.searchForm.addEventListener('submit', onInputSearch);
   
function onInputSearch(e) {
   e.preventDefault();

   apiService.resetPage();
   refs.gallery.innerHTML = "";
   apiService.query = refs.input.value;

   if (!apiService.query) {
      Notify.failure("Please, enter something...")
   } else {
      apiService.fetchHits(apiService.query)
         .then(hits => {
            if (hits['totalHits'] === 0) {
               Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            } else {
               const imageCard = imageCardTemp(hits);
               refs.gallery.insertAdjacentHTML("beforeend", imageCard);
            }
         })
         .catch(error => {
            console.log(error)
         })
   }
};

function onBtnShown() {
      if (gallery.children) {
      refs.loadMoreBtn.classList.remove('visually-hidden')
   } else {
      refs.loadMoreBtn.classList.add('visually-hidden')
   }
};