import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function onOpenModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
    `<a href="${event.target.dataset.src}">
     <img src="${event.target.dataset.src}" alt=""  width="100%" />
    </a>`,
  );
  instance.show();
}
