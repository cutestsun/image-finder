import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './js/refs';

let lightbox = new SimpleLightbox('.photo-card a', {
  /* options */
});

const BASE_URL = 'https://pixabay.com/api/';
let inputValue = '';
let currentPage = 1;
const imgPerPage = 40;
refs.form.addEventListener('submit', onFormSubmit);

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  inputValue = e.currentTarget.elements.searchQuery.value;

  fetchData(inputValue).then(({ hits, totalHits }) => {
    createMarkup(hits);
    Notify.success(`"Hooray! We found ${totalHits} images."`);
  });

  refs.loadMoreBtn.hidden = false;
}

function onLoadMoreBtnClick() {
  currentPage += 1;

  fetchData(inputValue).then(response => {
    if (currentPage * imgPerPage >= response.totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.hidden = true;
    }
    createMarkup(response.hits);
  });
}

async function fetchData(searchQuery) {
  const searchParams = new URLSearchParams({
    key: '35861732-765d2ea3a6aad5336048671b3',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: imgPerPage,
    page: currentPage,
  });

  try {
    const response = await fetch(`${BASE_URL}?${searchParams}`);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card"><a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
  </a>
</div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
