const popup = document.querySelector('.popup');
const openButtonPopup = document.querySelector('.profile__edit_open_popup');
const popupButtonClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
const popupSaveButton = document.querySelector('.popup__button');
let nameInput = document.querySelector('.popup__text_name_input');
let jobInput = document.querySelector('.popup__text_job_input');
let nameAuthor = document.querySelector('.profile__author');
let jobAuthor = document.querySelector('.profile__description');

// открытие закрытие попап
const popupAdd = function() {

    popup.classList.add('popup_opened');

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
openButtonPopup.addEventListener('click', popupAdd);
popupButtonClose.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

