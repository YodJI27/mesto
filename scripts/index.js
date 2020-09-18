const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const popup = document.querySelector('.popup');
const openButtonPopup = document.querySelector('.profile__edit_open_popup');
const openButtonPopupAdd = document.querySelector('.profile__add');
const popupButtonClose = document.querySelector('.popup__close');
const buttonDeleteCards = document.querySelector('.cards__delete');
const cardsTemplate = document.querySelector('#cards__template').content;
const popupSaveButton = document.querySelector('.popup__button');
let nameInput = document.querySelector('.popup__text_name_input');
let jobInput = document.querySelector('.popup__text_job_input');
let nameAuthor = document.querySelector('.profile__author');
let jobAuthor = document.querySelector('.profile__description');
let cardsItem = document.querySelector('.cards__item');
let cardsContainer = document.querySelector('.cards');
let popupHeading = document.querySelector('.popup__heading');
let formElement = document.querySelector('.popup__container');
let photoCards = document.querySelector('.photo');
let photoImage = document.querySelector('.photo__image');
let textImage = document.querySelector('.photo__text');
let closeCardsImage = document.querySelector('.photo__close');


// наполнение карточек и вывод их на страницу ( из массива )
const templateCards = () => {

    initialCards.forEach(function(item) { 
        const cardsElement = cardsTemplate.cloneNode(true);
        cardsElement.querySelector('.cards__text').textContent = item.name;
        cardsElement.querySelector('.cards__image').src = item.link;
        cardsElement.querySelector('.cards__image').alt = item.name;
        openCards(cardsElement);
        clickLike(cardsElement);
        deleteCards(cardsElement);
        cardsContainer.append(cardsElement);
    });
}
// Приближение изображения
const openCards = (val) =>
{
    val.querySelector('.cards__image').addEventListener('click', function(evt){
        photoCards.classList.add('photo_open');
        photoImage.src = evt.target.src;
        textImage.textContent = evt.target.alt;
    });
}
// Закрытие фото
const closeImagePhoto = () => {
    photoCards.classList.remove('photo_open');
}

// открытие попап для добавления карточек
const addPopupCards = () => {
    popup.classList.add('popup_opened');
    popupHeading.textContent = 'Новое место';
    nameInput.placeholder = 'Название';
    jobInput.placeholder = 'Ссылка на картинку';
    nameInput.value = '';
    jobInput.value = '';
    formElement.addEventListener('submit', addCardHandler);
}

// Лайк
const clickLike = (val) => {
    val.querySelector('.cards__like').addEventListener('click', function(event){
        event.target.classList.toggle('cards__like_active');
    })
}

// Удаление карточки
const deleteCards = (val) => {
    val.querySelector('.cards__delete').addEventListener('click', function(evt){
        evt.target.parentNode.remove();
    })
}

// добавление карточки из попап 
const addCardHandler = (evt) => {
    evt.preventDefault();

    const cardsElement = cardsTemplate.cloneNode(true);
    cardsElement.querySelector('.cards__text').textContent = nameInput.value;
    cardsElement.querySelector('.cards__image').src = jobInput.value;
    cardsElement.querySelector('.cards__image').alt = nameInput.value;
    openCards(cardsElement);
    clickLike(cardsElement);
    deleteCards(cardsElement);
    cardsContainer.prepend(cardsElement);
    popupClose();
}

// открытие попан для редактирования профиля
const addPopup = () => {

    popup.classList.add('popup_opened');
    popupHeading.textContent = 'Редактировать профиль';
    nameInput.placeholder = '';
    jobInput.placeholder = '';
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
    formElement.addEventListener('submit', formSubmitHandler);
}

// Заполнение формы для редактирования
const formSubmitHandler =  (evt) => {

    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    nameAuthor.textContent = nameInputValue;
    jobAuthor.textContent = jobInputValue;

    popupClose();
}

// закрытие попап
const popupClose = () => {
    formElement.removeEventListener('submit', addCardHandler);
    formElement.removeEventListener('submit', formSubmitHandler);
    popup.classList.remove('popup_opened');
}

templateCards();
closeCardsImage.addEventListener('click', closeImagePhoto);
openButtonPopupAdd.addEventListener('click', addPopupCards);
openButtonPopup.addEventListener('click', addPopup);
popupButtonClose.addEventListener('click', popupClose);

