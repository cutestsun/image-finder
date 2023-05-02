import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './js/refs';
import createMarkup from './js/createMarkup';
import fetchData from './js/api';
import { BASE_URL } from './js/api';

let inputValue = '';
let currentPage = 1;
const imgPerPage = 40;

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  inputValue = e.currentTarget.elements.searchQuery.value;
  try {
    const {
      data: { hits, totalHits },
    } = await fetchData(inputValue, imgPerPage, currentPage);
    if (!hits.length) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const galleryMarkup = createMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

    Notify.success(`"Hooray! We found ${totalHits} images."`);
    if (hits.length === 40) {
      refs.loadMoreBtn.hidden = false;
    }

    const lightbox = new SimpleLightbox('.photo-card a');
  } catch (error) {
    console.log(error);
  }
}
async function onLoadMoreBtnClick() {
  currentPage += 1;

  try {
    const {
      data: { hits, totalHits },
    } = await fetchData(inputValue, imgPerPage, currentPage);
    if (currentPage * imgPerPage >= totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.hidden = true;
    }

    const galleryMarkup = createMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    console.log(cardHeight);
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
}
