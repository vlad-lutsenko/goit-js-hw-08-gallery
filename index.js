// Разбей задание на несколько подзадач:

"use strict";
import galleryItems from "./gallery-items.js";
// Создание и рендер разметки по массиву данных
// и предоставленному шаблону.

const markupRender = function() {
  return galleryItems.reduce(
    (acc, item) =>
      acc +
      ` <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
    </a>
  </li> `,
    ""
  );
};

const galleryList = document.querySelector(".js-gallery");
galleryList.insertAdjacentHTML("beforeend", markupRender());

// Реализация делегирования на галерее ul.js-gallery
// и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.

const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");

const openImg = function(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  const newUrl = event.target.dataset.source;

  lightboxImage.src = newUrl;
  lightbox.classList.add("is-open");
};

galleryList.addEventListener("click", openImg);

// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
//пока грузится изображение, мы не видели предыдущее.

const closeBtn = document.querySelector(".lightbox__button");

const closeImg = function() {
  lightboxImage.src = "";
  lightbox.classList.remove("is-open");
};

closeBtn.addEventListener("click", closeImg);

///////////////------------Дополнительно------------/////////////////////////////
//Закрытие модального окна по клику на div.lightbox__overlay.
const closeImgByOverlayClick = function(event) {
  if (event.target !== lightboxImage) {
    closeImg();
  }
  return;
};

lightbox.addEventListener("click", closeImgByOverlayClick);

// Закрытие модального окна по нажатию клавиши ESC

const closeImgByEsc = function(event) {
  if (event.code === "Escape") {
    closeImg();
  }
};
window.addEventListener("keydown", closeImgByEsc);
