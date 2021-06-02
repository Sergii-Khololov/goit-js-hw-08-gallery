import images from "../gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');
const imgRef = document.querySelector('.lightbox__image');
const btnClose = document.querySelector('[data-action="close-lightbox"]');


const arrayImages = [];
images.forEach(element => {
    arrayImages.push(element.original);
});


const imgGallery = createFotoMarkup(images);
galleryRef.insertAdjacentHTML('beforeend', imgGallery);

function createFotoMarkup (images) {
    return images.map((image) => {

       return `<li class="gallery__item">
        <a class="gallery__link" href= '${image.original}'>
            <img class="gallery__image"
                src= '${image.preview}'
                data-source= '${image.original}'
                alt='${image.description}'
            />
        </a>
    </li >`;
      
    }).join('');
        
};

// // ==== Делегирование

galleryRef.addEventListener('click', onClick);

function onClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'IMG') {
        return;
    }
   
    openModal(e.target);
   
};

// // ==== 3  Открытие модального окна

function openModal(e) {
    
    lightboxRef.classList.add('is-open');
    
    changeAtributs(e);
    
    btnClose.addEventListener('click', closeModal);
    overlayRef.addEventListener('click', closeModal);
    document.addEventListener('keydown', eskapeCloseModal);
    
};

// //==== 4

function changeAtributs (e) {
    imgRef.src = e.dataset.source;
    imgRef.alt = e.alt;
};

// //===== 5 Закрытие модального окна

function closeModal() {
    
    lightboxRef.classList.remove('is-open');
    
    imgRef.src = "";
    imgRef.alt = "";

};


// //=====  Доп. Закрытие модального окна по нажатию клавиши ESC.

function eskapeCloseModal(e) {
    const ESCAPE_CODE = 'Escape';
    if (e.key === ESCAPE_CODE) {
        closeModal();
    }
};

// // ==== Пролистывание изображений галереи

document.addEventListener('keydown', (e) => {

    let newIndex = arrayImages.indexOf(imgRef.srс);

    if (e.key === 'ArrowLeft') {
        newIndex -= 1;
        if (newIndex === -1) {
           newIndex = arrayImages.length - 1
        }
        
    } else if (e.key === 'ArrowRight') {
        newIndex += 1;
        if (newIndex === arrayImages.length) {
            newIndex = 0;
        }
    }
    
    imgRef.srс = arrayImages[newIndex];
});