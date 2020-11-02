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
const formElement = document.querySelector('.popup__container');
const photoCards = document.querySelector('.photo');
const photoImage = document.querySelector('.photo__image');
const textImage = document.querySelector('.photo__text');
const popupCards = document.querySelector('.popup_cards');
const popupNameCards = document.querySelector('.popup__text_name_cards');
const popupJobCards = document.querySelector('.popup__text_job_cards')
const popupButtonSave = document.querySelector('.popup__button_save_form');
const popupButtonSaveButton = document.querySelector('.popup__button_form_save');
const inputErrorName = document.getElementById(`name-input-error`);
const inputErrorData = document.getElementById(`job-input-error`);
const inputNameError = document.getElementById('input-name-error');
const inputErrorUrl = document.getElementById('url-input-error');

export{photoCards, photoImage, textImage, nameAuthor, jobAuthor, inputErrorUrl, inputNameError,
    inputErrorData, inputErrorName, popupButtonSaveButton, popupButtonSave, popupJobCards, popupNameCards, 
    popupCards, formElement, jobInput, nameInput,  openButtonPopupAdd, openButtonPopup, popupEdit, allClasesCase};
