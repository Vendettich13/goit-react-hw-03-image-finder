import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31926358-b359fad316cd3018af04e862f';

export async function getByName(query, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&per_page=12&q=${query}&page=${page}&image_type=photo&orientation=horizontal`
  );
  return response;
}
