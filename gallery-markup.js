import gallery from "./gallery-items.js";

const makeImagesMarkup = ({ preview, original, description }) => {
  return `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
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
}

function onLigthboxBtnCloseClick() {
  lightboxContainer.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

function onLigthboxOverlayCloseClick() {
  lightboxContainer.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

document.addEventListener("keydown", onEscBtnClickModalClose);

function onEscBtnClickModalClose(event) {
  if (event.key === "Escape") {
    lightboxContainer.classList.remove("is-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    console.log("Key: ", event.key);
  }
}

document.addEventListener("keydown", onArrowBtnClickChangeImage);

function onArrowBtnClickChangeImage(event) {
  onRightArrowBtnClick(event);
  onLeftArrowBtnClick(event);
}

let i = 0;
function onRightArrowBtnClick(event) {
  if (event.key === "ArrowRight") {
    i++;
    if (i == gallery.length) {
      i = 0;
    }
    lightboxImage.src = gallery[i].original;
    lightboxImage.alt = gallery[i].description;
  }
}

function onLeftArrowBtnClick(event) {
  if (event.key === "ArrowLeft") {
    i--;
    if (i == -1) {
      i = gallery.length - 1;
    }
    lightboxImage.src = gallery[i].original;
    lightboxImage.alt = gallery[i].description;
  }
}
