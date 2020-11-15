import InfiniteScroll from 'infinite-scroll';

console.log(InfiniteScroll);

const infScroll = new InfiniteScroll('.gallery', {
  path: '.pagination__next',
  append: '.post',
  history: false,
});
