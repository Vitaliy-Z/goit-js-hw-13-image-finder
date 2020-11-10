import ApiService from './js/apiService';
const debounce = require('lodash.debounce');
import imageTpl from './templates/imageCard.hbs';
import './css/styles.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('[data-action="loadMore"]'),
};

const apiService = new ApiService();

let windowHeight = 0;

refs.searchForm.addEventListener('input', debounce(onSearch, 700));
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  if (e.target.value === '') {
    clearGallery();
    return;
  }

  apiService.query = e.target.value;

  apiService.resetPage();
  apiService.fetchArticles().then(images => {
    clearGallery();
    imagesMarkup(images);
  });
}

function onLoadMore() {
  windowHeight = refs.gallery.offsetHeight;

  apiService
    .fetchArticles()
    .then(images => {
      imagesMarkup(images);
    })
    .then(debounce(scrollPage, 0));
}

function imagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageTpl(images));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function scrollPage() {
  console.log(windowHeight);

  window.scrollTo({
    top: windowHeight,
    behavior: 'smooth',
  });
}
