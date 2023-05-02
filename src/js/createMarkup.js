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
  />
  <div class="card-content">
    <h2>Likes: <span>${likes}</span></h2>

    <h2>Views: <span>${views}</span></h2>

    <h2>Comments: <span>${comments}</span></h2>

    <h2>Downloads: <span>${downloads}</span></h2>
  </div>
   </a>
</div>`
    )
    .join('');
}
