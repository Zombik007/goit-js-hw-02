import gallery from "./gallery-items.js";
// console.log(gallery);

// const makeImagesMarkup = ({ preview, original, description }) => {
//   return `
//   <li class='gallery__item'>
//     <a
//       class="gallery__link"
//       href='${original}'
//     >
//       <img
//             class='gallery__image'
//             src='${preview}'
//             data-source='${original}'
//             alt='${description}'
//       />
//     </a>
//   </li>`;
// };

const makeImagesMarkup = ({ preview, original, description }) => {
  return `
  <li class='gallery__item'>
      <img
            class='gallery__image'
            src='${preview}' 
            data-source='${original}' 
            alt='${description}'
      />
  </li>`;
};

const galleryContainer = document.querySelector(".js-gallery");
const makeImagesList = gallery.map(makeImagesMarkup).join("");
galleryContainer.insertAdjacentHTML("afterbegin", makeImagesList);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function onGalleryContainerClick(evt) {
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  console.log(evt.target.classList);

  //   console.log(evt.target.dataset.source);
}
