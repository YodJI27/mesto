import '../pages/index.css';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { Popup } from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';
import {photoCards, inputErrorUrl, inputNameError,
        inputErrorData, inputErrorName, popupButtonSaveButton,
        popupButtonSave, popupJobCards, popupNameCards,
        popupCards, formElement, jobInput, nameInput,
        openButtonPopupAdd, openButtonPopup, popupEdit, 
        allClasesCase} from './constants.js';

// Создание класса для редактирования профиля
const editInfoUser = new UserInfo({nameSelector: '.profile__author', jobSelector: '.profile__description'});
const editPopupClass = new Popup('.popup');

// Заполнение формы для редактирования
const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    editInfoUser.setUserInfo(nameInput.value, jobInput.value);
    editPopupClass.close();
}

// Открытие попап для добавления карточек
const addPopupCards = () => {
    validateCard.buttonActive(popupButtonSave);
    formPopup.open();
}

// Открытие попан для редактирования профиля
const addPopup = () => {
    nameInput.value = editInfoUser.getUserInfo().name;
    jobInput.value = editInfoUser.getUserInfo().job;
    editPopupClass.open();
    validateEdit.buttonFalse(popupButtonSaveButton);
    formElement.addEventListener('submit', addFormSubmitHandler);
}

// закрытие для редактирования
popupEdit.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
        formElement.removeEventListener('submit', addFormSubmitHandler);     
        validateEdit.removeError(nameInput, inputErrorData);
        validateEdit.removeError(jobInput, inputErrorName);
        editPopupClass.close();
    }
});

// закрытие для карточек
popupCards.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_cards') || evt.target.classList.contains('popup__close_cards_item')){
        validateCard.removeError(popupNameCards, inputNameError);
        validateCard.removeError(popupJobCards, inputErrorUrl);
        formPopup.close();
    }
});

// закрытие для фото
photoCards.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('photo') || evt.target.classList.contains('photo__close')){
        cardsImage.close();
    }
})

// функция создания одной карточки
const renderer = (item) => {
     const card = new Card({item, 
     handleCardClick: () => {
          cardsImage.open(item.name, item.link);
    }   
    }, '#cards__template');
    const cardsElement = card.generateCard();
    cardsDone.addItem(cardsElement);
}

// Добавление карточек из попап
const formPopup = new PopupWithForm('#cards__popup', (item) => {renderer(item);});

// Приближение картинки
const cardsImage = new PopupWithImage('.photo');

// Для карточек из массива
const cardsDone = new Section({ items: initialCards, renderer}, '.cards');
cardsDone.renderElement(initialCards);

openButtonPopupAdd.addEventListener('click', addPopupCards);
openButtonPopup.addEventListener('click', addPopup);

const validateEdit = new FormValidator(allClasesCase.formSelector, allClasesCase);
validateEdit.enableValidation();

const validateCard = new FormValidator(allClasesCase.formSelectorCards, allClasesCase);
validateCard.enableValidation();