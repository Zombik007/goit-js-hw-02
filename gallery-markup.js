import gallery from "./gallery-items.js";

const makeImagesMarkup = ({ preview, original, description }, index) => {
  return `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
      data-index="${index}"
    >
      <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
      />
    </a>
  </li>`;
};

const lightboxContainer = document.querySelector(".js-lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxBtnClose = document.querySelector(".lightbox__button");
const galleryContainer = document.querySelector(".js-gallery");

const makeImagesList = gallery.map(makeImagesMarkup).join("");

galleryContainer.insertAdjacentHTML("afterbegin", makeImagesList);

galleryContainer.addEventListener("click", onGalleryContainerClick);
lightboxOverlay.addEventListener("click", onLigthboxOverlayCloseClick);
lightboxBtnClose.addEventListener("click", onLigthboxBtnCloseClick);

let i;
function onGalleryContainerClick(evt) {
  if (!evt.target.classList.contains("gallery__link")) {
    evt.preventDefault();
  }

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  lightboxContainer.classList.add("is-open");
  lightboxImage.src = evt.target.dataset.source;
  lightboxImage.alt = evt.target.alt;

  document.addEventListener("keydown", onModalWindowBtnClick);
  i = evt.target.dataset.index;
}

function onModalWindowBtnClick(evt) {
  if (evt.key === "Escape") {
    closeModalWindow();
  }
  if (evt.key === "ArrowRight") {
    i++;
    if (i == gallery.length) {
      i = 0;
    }
    lightboxImage.src = gallery[i].original;
    lightboxImage.alt = gallery[i].description;
  }
  if (evt.key === "ArrowLeft") {
    i--;
    if (i == -1) {
      i = gallery.length - 1;
    }
    lightboxImage.src = gallery[i].original;
    lightboxImage.alt = gallery[i].description;
  }
}

function closeModalWindow() {
  lightboxContainer.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.removeEventListener("keydown", onModalWindowBtnClick);
}

function onLigthboxBtnCloseClick() {
  closeModalWindow();
}

function onLigthboxOverlayCloseClick() {
  closeModalWindow();
}
