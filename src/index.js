import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './js/refs';
import createMarkup from './js/createMarkup';
import fetchData from './js/api';
import { BASE_URL } from './js/api';
let lightbox = new SimpleLightbox('.photo-card a');

let inputValue = '';
let currentPage = 1;
const imgPerPage = 40;

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  inputValue = e.currentTarget.elements.searchQuery.value;

  fetchData(inputValue, imgPerPage, currentPage).then(
    ({ data: { hits, totalHits } }) => {
      if (!hits.length) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
      Notify.success(`"Hooray! We found ${totalHits} images."`);

      if (hits.length === 40) {
        setTimeout(() => (refs.loadMoreBtn.hidden = false), 1000);
      }
    }
  );
}

function onLoadMoreBtnClick() {
  currentPage += 1;

  fetchData(inputValue, imgPerPage, currentPage).then(
    ({ data: { hits, totalHits } }) => {
      if (currentPage * imgPerPage >= totalHits) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMoreBtn.hidden = true;
      }
      refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
      lightbox.refresh();

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      console.log(cardHeight);
      scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  );
}
