import './css/main.css';
import './sass/simple-lightbox.scss';
import { refs } from "./js/refs"
import { Notify } from 'notiflix';
import API from './js/apiService';
import imageCardTemp from "./templates/imageCard.hbs";
import SimpleLightbox from "./js/simple-lightbox";

const apiService = new API();

refs.searchForm.addEventListener('submit', onInputSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryClick);

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
               Notify.info("Sorry, there are no images matching your search query. Please try again.")
            } else if (hits['hits'] === 0) {
               Notify.info("We're sorry, but you've reached the end of search results.")
            } else {
               renderImg(hits)
               onBtnShown();
               refs.input.value = "";
            }
         })
         .catch(error => {
            console.log(error)
         })
      }
   };
   
   function renderImg(hits) {
      const imageCard = imageCardTemp(hits);
      refs.gallery.insertAdjacentHTML("beforeend", imageCard);
      new SimpleLightbox('.card a', { /* options */ });
      console.log("~ imageCard", refs.gallery.length)
      console.log("~ hits", hits)
      console.log("~ hits['hits']", hits['hits'].length)
      console.log("~ hits['totalHits']", hits['totalHits'])
      console.log("~ refs.gallery.childElementCount", refs.gallery.childElementCount)
      
      setTimeout(() => {
         const { height: cardHeight } = document
         .querySelector('.gallery')
         .firstElementChild.getBoundingClientRect();
         
         window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
         });
         
      }, 1000);
   }
   
   function onBtnShown() {
      if (refs.gallery.hasChildNodes()) {
         refs.loadMoreBtn.classList.remove('visually-hidden')
      } else if (refs.gallery.childElementCount === hits['hits']) {
         refs.loadMoreBtn.classList.add('visually-hidden')
   } else {
      refs.loadMoreBtn.classList.add('visually-hidden')
}
};

function onLoadMore() {
   apiService.incrementPage();
   apiService.fetchHits().then(r => {
      renderImg(r)
   }).catch(error => {
      console.log(error)
   })
}

function onGalleryClick(e) {
   e.preventDefault();
   if (e.target.nodeName !== 'IMG') {
      return
   }
}

window.addEventListener('scroll', () => {
   const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

   if (scrollTop + clientHeight > scrollHeight - 10) {
      onLoadMore();
   }
})
