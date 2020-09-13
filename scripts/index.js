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
let formElement = document.querySelector('.popup__container');
const popupSaveButton = document.querySelector('.popup__button');
let nameInput = document.querySelector('.popup__text_name_input');
let jobInput = document.querySelector('.popup__text_job_input');
let nameAuthor = document.querySelector('.profile__author');
let jobAuthor = document.querySelector('.profile__description');
let cards = document.querySelector('.cards');
let cardsItem = document.querySelector('.cards__item');
let popupHeading = document.querySelector('.popup__heading');



// наполнение карточек и вывод их на страницу
const templateCards = function() {

    initialCards.forEach(function(item)
    {   
        const cardsTemplate = document.querySelector('#cards__template').content;
        const cardsElement = cardsTemplate.cloneNode(true);
        cardsElement.querySelector('.cards__text').textContent = item.name;
        cardsElement.querySelector('.cards__image').src = item.link;
        cardsElement.querySelector('.cards__image').alt = item.name;
        cards.append(cardsElement);
    });
}
// ------------------------------------------
// открытие попап для добавления картинок
const popupAddCards = function()
{
    popup.classList.add('popup_opened');
    popupHeading.textContent = 'Новое место';
}

// открытие попан для редактирования профиля
const popupAdd = function() {

    popup.classList.add('popup_opened');
    popupHeading.textContent = 'Редактировать профиль';
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
}
const popupClose = function() {

    popup.classList.remove('popup_opened');
}
// -----------------------

// Заполнение формы
function formSubmitHandler (evt) {

    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    nameAuthor.textContent = nameInputValue;
    jobAuthor.textContent = jobInputValue;

    popupClose();
}
// ---------------------

templateCards();
openButtonPopupAdd.addEventListener('click', popupAddCards);
openButtonPopup.addEventListener('click', popupAdd);
popupButtonClose.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

