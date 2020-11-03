import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/initialCards.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {photoCards, inputErrorUrl, inputNameError,
        inputErrorData, inputErrorName, popupButtonSaveButton,
        popupButtonSave, popupJobCards, popupNameCards,
        popupCards, jobInput, nameInput,
        openButtonPopupAdd, openButtonPopup, popupEdit, 
        allClasesCase, textImage, photoImage} from '../components/constants.js';

// Создание класса для редактирования профиля
const editInfoUser = new UserInfo({nameSelector: '.profile__author', jobSelector: '.profile__description'});
const editPopupClass = new PopupWithForm('.popup', () => {addFormSubmitHandler();});

// Заполнение формы для редактирования
const addFormSubmitHandler = () => {
    editInfoUser.setUserInfo(nameInput.value, jobInput.value);
    editPopupClass.close();
}

// Открытие попап для добавления карточек
const addPopupCards = () => {
    validateCard.buttonActive();
    formPopup.open();
}

// Открытие попан для редактирования профиля
const addPopup = () => {
    nameInput.value = editInfoUser.getUserInfo().name;
    jobInput.value = editInfoUser.getUserInfo().job;
    editPopupClass.open();
    validateEdit.buttonFalse();
}

// закрытие для редактирования
popupEdit.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){    
        validateEdit.removeError();
        editPopupClass.close();
    }
});

// закрытие для карточек
popupCards.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_cards') || evt.target.classList.contains('popup__close_cards_item')){
        validateCard.removeError();
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
    cardsSection.addItem(cardsElement);
}

// Добавление карточек из попап
const formPopup = new PopupWithForm('#cards__popup', (item) => {renderer(item);});

// Приближение картинки
const cardsImage = new PopupWithImage('.photo', {textImage, photoImage});

// Для карточек из массива
const cardsSection = new Section({ items: initialCards, renderer}, '.cards');
cardsSection.renderElements(initialCards);

openButtonPopupAdd.addEventListener('click', addPopupCards);
openButtonPopup.addEventListener('click', addPopup);

const validateEdit = new FormValidator(allClasesCase.formSelector, allClasesCase);
validateEdit.enableValidation();

const validateCard = new FormValidator(allClasesCase.formSelectorCards, allClasesCase);
validateCard.enableValidation();