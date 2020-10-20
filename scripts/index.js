import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';

const allClasesCase = {
    formSelector: '.popup__container',
    formSelectorCards: '.popup__container_cards_item',
    popupText: '.popup__text',
    popupButton: '.popup__button',
    popupTextNameError: 'popup__text_name_error',
    popupButonActive: 'popup__button_active_not'
};

const popupEdit = document.querySelector('.popup');
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

// Заполнение формы для редактирования
const addFormSubmitHandler = (evt) => {

    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    nameAuthor.textContent = nameInputValue;
    jobAuthor.textContent = jobInputValue;

    closedPopup(popupEdit);
}

// Открытие попап для добавления карточек
const addPopupCards = () => {
    openedPopup(popupCards, 'popup_opened');
    validateCard.buttonActive(popupButtonSave);
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
    openedPopup(popupEdit, 'popup_opened');
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
    validateEdit.buttonFalse(popupButtonSaveButton);
    formElement.addEventListener('submit', addFormSubmitHandler);
}
// Открытие всех попап
const openedPopup = (val, link) => {
    val.classList.add(link);
    document.addEventListener('keydown', keyHandler);
}
// const removeError = (element, text) => {
//     text.textContent = "";
//     element.classList.remove('popup__text_name_error');
// }
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
popupEdit.addEventListener('click', (evt) =>{
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
        formElement.removeEventListener('submit', addFormSubmitHandler);     
        validateEdit.removeError(nameInput, inputErrorData);
        validateEdit.removeError(jobInput, inputErrorName);
        closedPopup(popupEdit);
    }
});
const keyHandler = (evt) => {
    if(evt.key === 'Escape'){
        const openedPopupCheck = document.querySelector('.popup_opened');
        closedPopup(openedPopupCheck);
    }
}
// закрытие для карточек
popupCards.addEventListener('click', (evt) =>{
    keyHandler(evt);
    if(evt.target.classList.contains('popup_cards') || evt.target.classList.contains('popup__close_cards_item')){
        formCards.removeEventListener('submit', addCardHandler); 
        validateCard.removeError(popupNameCards, inputNameError);
        validateCard.removeError(popupJobCards, inputErrorUrl);
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

const validateEdit = new FormValidator(allClasesCase.formSelector, allClasesCase);
validateEdit.enableValidation();

const validateCard = new FormValidator(allClasesCase.formSelectorCards, allClasesCase);
validateCard.enableValidation();

