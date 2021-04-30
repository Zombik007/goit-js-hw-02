import gallery from "./gallery-items.js";
// console.log(gallery);

// const makeImagesMarkup = ({ preview, original, description }) => {
//   return `
//   <li class="gallery__item">
//     <a
//       class="gallery__link"
//       href="${original}"
//     >
//       <img
//             class="gallery__image"
//             src="${preview}"
//             data-source="${original}"
//             alt="${description}"
//       />
//     </a>
//   </li>`;
// };

const makeImagesMarkup = ({ preview, original, description }) => {
  return `
  <li class="gallery__item">
      <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
      />
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

// document.addEventListener("keydown", onEscBtnClickModalClose());

document.addEventListener("keydown", onEscBtnClickModalClose);

function onEscBtnClickModalClose(event) {
  if (event.key === "Escape") {
    lightboxContainer.classList.remove("is-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    console.log("Key: ", event.key);
  }
}

/* <div class="lightbox js-lightbox">
  <div class="lightbox__overlay"></div>

  <div class="lightbox__content">
    <img class="lightbox__image" src="" alt="" />
  </div>

  <button
    type="button"
    class="lightbox__button"
    data-action="close-lightbox"
  ></button>
</div>; */
