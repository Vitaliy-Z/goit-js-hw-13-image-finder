import ApiService from './js/apiService';
const debounce = require('lodash.debounce');
import imageTpl from './templates/imageCard.hbs';
import './css/styles.css';
import onOpenModal from './js/modal';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('[data-action="loadMore"]'),
};

const apiService = new ApiService();

let windowHeight = 0;

refs.searchForm.addEventListener('input', debounce(onSearch, 700));
refs.searchForm.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onOpenModal);

let isSubmit = false;

function onSearch(e) {
  e.preventDefault();

  apiService.query = refs.searchForm.elements.query.value;

  if (apiService.query === '') {
    clearGallery();
    btnHidden();
    return;
  }

  if (isSubmit) {
    isSubmit = false;
    return;
  } else {
    clearGallery();
    apiService.fetchArticles().then(images => {
      imagesMarkup(images);
      btnLoadMoreNoHidden();
    });
  }
}

function onSubmit(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  onSearch(e);
  isSubmit = true;
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
  apiService.resetPage();
}

function btnHidden() {
  refs.btnLoadMore.disabled = true;
  refs.btnLoadMore.classList.add('visually-hidden');
}

function btnLoadMoreNoHidden() {
  refs.btnLoadMore.disabled = false;
  refs.btnLoadMore.classList.remove('visually-hidden');
}

function scrollPage() {
  window.scrollTo({
    top: windowHeight,
    behavior: 'smooth',
  });
}
