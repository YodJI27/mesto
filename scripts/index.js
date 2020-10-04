const popup = document.querySelector('.popup');
const openButtonPopup = document.querySelector('.profile__edit_open_popup');
const openButtonPopupAdd = document.querySelector('.profile__add');
const popupButtonClose = document.querySelector('.popup__close');
const buttonDeleteCards = document.querySelector('.cards__delete');
const cardsTemplate = document.querySelector('#cards__template').content;
const nameInput = document.querySelector('.popup__text_name_input');
const jobInput = document.querySelector('.popup__text_job_input');
const nameAuthor = document.querySelector('.profile__author');
const jobAuthor = document.querySelector('.profile__description');
const cardsItem = document.querySelector('.cards__item');
const cardsContainer = document.querySelector('.cards');
const popupHeading = document.querySelector('.popup__heading');
const popupHeadingCards = document.querySelector('.popup__heading_cards_text');
const formElement = document.querySelector('.popup__container');
const photoCards = document.querySelector('.photo');
const photoImage = document.querySelector('.photo__image');
const textImage = document.querySelector('.photo__text');
const closeCardsImage = document.querySelector('.photo__close');
const closePopupCards = document.querySelector('.popup__close_cards_item');
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

// Приближение изображения
const openCards = (evt) =>
{
    openedPopup(photoCards, 'popup_opened');
    photoImage.src = evt.target.src;
    textImage.textContent = evt.target.alt;
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

// Удаление карточки
const deleteCards = (evt) => {
    evt.target.parentNode.remove();
}

// Лайк
const clickLike = (event) => {
    event.target.classList.toggle('cards__like_active');
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

// Наполнение карточек и вывод их на страницу ( из массива )
const templateCards = (item) => { 
        const cardsElement = cardsTemplate.cloneNode(true);

        const cardsImage = cardsElement.querySelector('.cards__image');
        const cardsText = cardsElement.querySelector('.cards__text');

        cardsText.textContent = item.name;
        cardsImage.src = item.link;
        cardsImage.alt = item.name;

        cardsElement.querySelector('.cards__like').addEventListener('click', clickLike);
        cardsElement.querySelector('.cards__delete').addEventListener('click', deleteCards);
        cardsElement.querySelector('.cards__image').addEventListener('click', openCards);
       
        return cardsElement;
}
// добавление карточки на страницу
const prenendCards = (container, val) => {
    container.prepend(val);
}

// Добавление карточки в массив
const addCardHandler = (evt) => {
    evt.preventDefault();

    const cardsValue = { name: popupNameCards.value, 
                         link: popupJobCards.value};
    prenendCards(cardsContainer, templateCards(cardsValue));
    closedPopup(popupCards);

}
// перебор массива
initialCards.reverse().forEach((item) => {
    prenendCards(cardsContainer, templateCards(item));
})

// закрытие для редактирования
popup.addEventListener('click', (evt) =>{
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
        formElement.removeEventListener('submit', formSubmitHandler);     
        removeInputError(inputErrorData);
        removeInputError(inputErrorName);
        buttonClosed(nameInput);
        buttonClosed(jobInput);
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
        removeInputError(inputNameError);
        removeInputError(inputErrorUrl);
        buttonClosed(popupJobCards);
        buttonClosed(popupNameCards);
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


