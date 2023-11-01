export default function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="card photo-card">
<a href="${largeImageURL}">
  <img
    src="${webformatURL}"
    alt="${tags}"
    loading="lazy"
  />
  <div class="card-content">
    <p>Likes: <span>${likes}</span></p>

    <p>Views: <span>${views}</span></p>

    <p>Comments: <span>${comments}</span></p>

    <p>Downloads: <span>${downloads}</span></p>
  </div>
   </a>
</div>`
    )
    .join('');
}
