import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './js/refs';

const BASE_URL = 'https://pixabay.com/api/';
let inputValue = '';
// Notify.success('Hi');
refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  inputValue = e.currentTarget.elements.searchQuery.value;
  fetchData(inputValue).then(response => {
    console.log(response.hits);
    createMarkup(response.hits);
  });
}

function onLoadMoreBtnClick() {
  fetchData(inputValue).then(response => {
    console.log(response.hits);
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
    per_page: 40,
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
      }) => `<div class="photo-card">
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
</div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
