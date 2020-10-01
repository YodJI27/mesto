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
initialCards.reverse();

// Добавление карточки в массив
const addCardHandler = (evt) => {
    evt.preventDefault();

    const cardsValue = { name: popupNameCards.value, link: popupJobCards.value};
    templateCards(cardsValue);
    closePopupCard();

}

// Заполнение формы для редактирования
const formSubmitHandler = (evt) => {

    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    nameAuthor.textContent = nameInputValue;
    jobAuthor.textContent = jobInputValue;

    popupClose();
}

// Приближение изображения
const openCards = (val) =>
{
    val.querySelector('.cards__image').addEventListener('click', function(evt){
        openedPopup(photoCards, 'photo_open');
        photoImage.src = evt.target.src;
        textImage.textContent = evt.target.alt;
        document.addEventListener('keydown', keyHandler);
    });
    
}

// Закрытие фото
const closeImagePhoto = () => {
    photoCards.classList.remove('photo_open');
    document.removeEventListener('keydown', keyHandler);
}

// Открытие попап для добавления карточек
const addPopupCards = () => {
    openedPopup(popupCards, 'popup_opened');
    popupButtonSave.classList.add('popup__button_active_not');
    popupButtonSave.disabled = true;
    popupNameCards.value = "";
    popupJobCards.value = "";
    formCards.addEventListener('submit', addCardHandler);
    document.addEventListener('keydown', keyHandler);
}

// Закрытие попап для карточек
const closePopupCard = () => {
    formCards.removeEventListener('submit', addCardHandler);
    document.removeEventListener('keydown', keyHandler);
    inputNameError.textContent = "";
    inputErrorUrl.textContent = "";
    popupJobCards.classList.remove('popup__text_name_error');
    popupNameCards.classList.remove('popup__text_name_error');
    closedPopup(popupCards);

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

// Добавление карточки в начало
const prenendCards = (val) => {
    cardsContainer.prepend(val);
}

// Открытие попан для редактирования профиля
const addPopup = () => {
    openedPopup(popup, 'popup_opened');
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;

    popupButtonSaveButton.classList.remove('popup__button_active_not');
    popupButtonSaveButton.disabled = false;

    formElement.addEventListener('submit', formSubmitHandler);
    document.addEventListener('keydown', keyHandler);
}
// Открытие всех попап
const openedPopup = (val, link) => {
    val.classList.add(link);
}
// Закрытие попап для редактирования
const popupClose = () => {
    formElement.removeEventListener('submit', formSubmitHandler);
    document.removeEventListener('keydown', keyHandler);
    inputErrorData.textContent = "";
    inputErrorName.textContent = "";
    nameInput.classList.remove('popup__text_name_error');
    jobInput.classList.remove('popup__text_name_error');
    closedPopup(popup);
}
// Функция закрытия всех попап
const closedPopup = (val) => {
    val.classList.remove('popup_opened');
}

// Наполнение карточек и вывод их на страницу ( из массива )
const templateCards = (item) => { 
        const cardsElement = cardsTemplate.cloneNode(true);

        const cardsImage = cardsElement.querySelector('.cards__image');
        const cardsText = cardsElement.querySelector('.cards__text');

        cardsText.textContent = item.name;
        cardsImage.src = item.link;
        cardsImage.alt = item.name;

        openCards(cardsElement);
        clickLike(cardsElement);
        deleteCards(cardsElement);
        prenendCards(cardsElement);
}

const render = () => {
    initialCards.forEach(templateCards);
}
render();

// document.addEventListener('keydown', function(evt){
//     if(evt.key === 'Escape'){
//         popupClose();
//         closePopupCard();
//         closeImagePhoto();
//     }
// });


const keyHandler = (evt) => {
    if(evt.key === 'Escape'){
        popupClose();
        closePopupCard();
        closeImagePhoto();
    }
}
popup.addEventListener('click', (evt) =>{
    if(evt.target.classList.contains('popup')){   
        popupClose();
    }
});
popupCards.addEventListener('click', (evt) =>{
    if(evt.target.classList.contains('popup_cards')){
        closePopupCard();
    }
});
photoCards.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('photo')){
        closeImagePhoto();
    }
})

formElement.addEventListener('submit', function(evt){
    evt.preventDefault();
});
closeCardsImage.addEventListener('click', closeImagePhoto);
openButtonPopupAdd.addEventListener('click', addPopupCards);
openButtonPopup.addEventListener('click', addPopup);
popupButtonClose.addEventListener('click', popupClose);
closePopupCards.addEventListener('click', closePopupCard);

