const popup = document.querySelector('.popup');
const openButtonPopup = document.querySelector('.js-menu__open-popup');
const popupButtonClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
const popupSaveButton = document.querySelector('.popup__button');

// открытие закрытие попап
const popupAdd = function() {

    popup.classList.add('popup__opened');
}
const popupClose = function() {
    popup.classList.remove('popup__opened');
}

openButtonPopup.addEventListener('click', popupAdd);
popupButtonClose.addEventListener('click', popupClose);
popupSaveButton.addEventListener('click', popupClose);
// -----------------------

// Заполнение формы
function formSubmitHandler (evt) {

    evt.preventDefault();

    let nameInput = document.querySelector('.js-menu__name-input');
    let jobInput = document.querySelector('.js-menu__job-input');

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    let nameAuthor = document.querySelector('.profile__author');
    let jobAuthor = document.querySelector('.profile__description');

    nameAuthor.textContent = nameInputValue;
    jobAuthor.textContent = jobInputValue;

}
popupSaveButton.addEventListener('click', formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler);
// ---------------------
