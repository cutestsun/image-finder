import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchData(searchQuery, imgPerPage, currentPage) {
  const urlParams = {
    params: {
      key: '35861732-765d2ea3a6aad5336048671b3',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: imgPerPage,
      page: currentPage,
    },
  };
  try {
    const response = await axios.get(`${BASE_URL}`, urlParams);

    return response;
  } catch (error) {
    console.error(error);
  }
}
