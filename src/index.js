import './css/main.css';
import { Notify } from 'notiflix';
import API from './js/apiService';
import imageCardTemp from "./templates/imageCard.hbs";

const galleryWrapper = document.querySelector('.gallery');
const input = document.querySelector('input')

const searchForm = document.querySelector('#search-form')
searchForm.addEventListener('submit', function onInputSearch(e) {
   e.preventDefault();

   let inputValue = e.target.elements.searchQuery.value.trim();

   API.fetchHits(inputValue)
      .then(hits => {
         renderFromSearch(hits);
      })
      .catch(error => {
         console.log(error)
         Notify.failure('Failure!')
      })
});

function renderFromSearch(hits) {
   if (hits.status === 404) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
   } else {
      renderHits(hits);
   }
};

function renderHits(hits) {
   const imageCard = imageCardTemp(hits);
   galleryWrapper.insertAdjacentHTML("beforeend", imageCard);
}