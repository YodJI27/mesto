import {Card} from './Card.js';
import {formValidator} from './FormValidator.js';

const allClasesCase = {
    formSelector: '.popup__container',
    formSelectorCards: '.popup__container_cards_item',
    popupText: '.popup__text',
    popupButton: '.popup__button',
    popupTextNameError: 'popup__text_name_error',
    popupButonActive: 'popup__button_active_not'
};

const popup = document.querySelector('.popup');
const openButtonPopup = document.querySelector('.profile__edit_open_popup');
const openButtonPopupAdd = document.querySelector('.profile__add');
const nameInput = document.querySelector('.popup__text_name_input');
const jobInput = document.querySelector('.popup__text_job_input');
const nameAuthor = document.querySelector('.profile__author');
const jobAuthor = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.cards');
const formElement = document.querySelector('.popup__container');
const photoCards = document.querySelector('.photo');
const photoImage = document.querySelector('.photo__image');
const textImage = document.querySelector('.photo__text');
const popupCards = document.querySelector('.popup_cards');
const formCards = document.querySelector('.popup__container_cards_item');
const popupNameCards = document.querySelector('.popup__text_name_cards');
const popupJobCards = document.querySelector('.popup__text_job_cards')
const popupButtonSave = document.querySelector('.popup__button_save_form');
const popupButtonSaveButton = document.querySelector('.popup__button_form_save');
const inputErrorName = document.getElementById(`name-input-error`);
const inputErrorData = document.getElementById(`job-input-error`);
const inputNameError = document.getElementById('input-name-error');
const inputErrorUrl = document.getElementById('url-input-error');

export{photoCards, photoImage, textImage, openedPopup};

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

// Заполнение формы для редактирования
const formSubmitHandler = (evt) => {

    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    nameAuthor.textContent = nameInputValue;
    jobAuthor.textContent = jobInputValue;

    closedPopup(popup);
}

// Открытие попап для добавления карточек
const addPopupCards = () => {
    openedPopup(popupCards, 'popup_opened');
    buttonActive(popupButtonSave);
    popupNameCards.value = "";
    popupJobCards.value = "";
    formCards.addEventListener('submit', addCardHandler);
}

// Функция закрытия всех попап
const closedPopup = (val) => {
    val.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
}

// Открытие попан для редактирования профиля
const addPopup = () => {
    openedPopup(popup, 'popup_opened');
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
    buttonFalse(popupButtonSaveButton);
    formElement.addEventListener('submit', formSubmitHandler);
}
// Открытие всех попап
const openedPopup = (val, link) => {
    val.classList.add(link);
    document.addEventListener('keydown', keyHandler);
}
const removeError = (element, text) => {
    text.textContent = "";
    element.classList.remove('popup__text_name_error');
}

const buttonActive = (buttonElement) => {
    buttonElement.classList.add('popup__button_active_not');
    buttonElement.setAttribute('disabled', true);
}
const buttonFalse = (buttonElement) => {
    buttonElement.classList.remove('popup__button_active_not');
    buttonElement.removeAttribute('disabled');
}
// добавление карточки на страницу
const prependCards = (val, container) => {
    const card = new Card(val, container);
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
}

// Добавление карточки в массив
const addCardHandler = (evt) => {
    evt.preventDefault();

    const cardsValue = { name: popupNameCards.value, 
                         link: popupJobCards.value};
    prependCards(cardsValue, '#cards__template');
    closedPopup(popupCards);

}
// перебор массива c карточками и вывод на страницу
initialCards.reverse().forEach((item) => {
    prependCards(item, '#cards__template');
})

// закрытие для редактирования
popup.addEventListener('click', (evt) =>{
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
        formElement.removeEventListener('submit', formSubmitHandler);     
        removeError(nameInput, inputErrorData);
        removeError(jobInput, inputErrorName);
        closedPopup(popup);
    }
});
const keyHandler = (evt) => {
    if(evt.key === 'Escape'){
        const OpenedPopupCheck = document.querySelector('.popup_opened');
        closedPopup(OpenedPopupCheck);
    }
}
// закрытие для карточек
popupCards.addEventListener('click', (evt) =>{
    keyHandler(evt);
    if(evt.target.classList.contains('popup_cards') || evt.target.classList.contains('popup__close_cards_item')){
        formCards.removeEventListener('submit', addCardHandler); 
        removeError(popupNameCards, inputNameError);
        removeError(popupJobCards, inputErrorUrl);
        closedPopup(popupCards);
    }
});
// закрытие для фото
photoCards.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('photo') || evt.target.classList.contains('photo__close')){
        closedPopup(photoCards);
    }
})

openButtonPopupAdd.addEventListener('click', addPopupCards);
openButtonPopup.addEventListener('click', addPopup);

const validation = (element, allClasses) =>{
    const validate = new formValidator(element, allClasses);
    validate.enableValidation();
}

validation(allClasesCase.formSelector, allClasesCase);
validation(allClasesCase.formSelectorCards, allClasesCase);

