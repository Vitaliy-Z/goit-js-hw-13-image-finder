export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const KEY = '19040716-d2ab54626dacf9b7f6f91612a';
    const BASE_URL = `https://pixabay.com/api/`;

    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`,
    )
      .then(r => r.json())
      .then(({ hits }) => {
        this.page += 1;
        return hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
