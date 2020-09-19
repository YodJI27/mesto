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

// добавление карточки из попап 
const addCardHandler = (evt) => {
    evt.preventDefault();

    const cardsElement = cardsTemplate.cloneNode(true);

    const cardsImage = cardsElement.querySelector('.cards__image');
    const cardsText = cardsElement.querySelector('.cards__text');

    cardsText.textContent = popupNameCards.value;
    cardsImage.src = popupJobCards.value;
    cardsImage.alt = popupNameCards.value;

    openCards(cardsElement);
    clickLike(cardsElement);
    deleteCards(cardsElement);
    prenendCards(cardsElement);
    closePopupCard();
}

// Заполнение формы для редактирования
const formSubmitHandler =  (evt) => {

    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    nameAuthor.textContent = nameInputValue;
    jobAuthor.textContent = jobInputValue;

    popupClose();
}

// Приближение изображения
const openCards = (val) =>
{
    val.querySelector('.cards__image').addEventListener('click', function(evt){
        photoCards.classList.add('photo_open');
        photoImage.src = evt.target.src;
        textImage.textContent = evt.target.alt;
    });
}

// Закрытие фото
const closeImagePhoto = () => {
    photoCards.classList.remove('photo_open');
}

// Открытие попап для добавления карточек
const addPopupCards = () => {
    openedPopup(popupCards);
    formCards.addEventListener('submit', addCardHandler);
    popupNameCards.value = "";
    popupJobCards.value = "";
}

// Закрытие попап для карточек
const closePopupCard = () => {
    formCards.removeEventListener('submit', addCardHandler);
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
    openedPopup(popup);
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
    formElement.addEventListener('submit', formSubmitHandler);
}
// Открытие всех попап
const openedPopup = (val) => {
    val.classList.add('popup_opened');
}

// Закрытие попап для редактирования
const popupClose = () => {
    formElement.removeEventListener('submit', formSubmitHandler);
    closedPopup(popup);
}
// Функция закрытия всех попап
const closedPopup = (val) => {
    val.classList.remove('popup_opened');
}

// Наполнение карточек и вывод их на страницу ( из массива )
const templateCards = () => {
    initialCards.forEach(function(item) { 
        const cardsElement = cardsTemplate.cloneNode(true);

        const cardsImage = cardsElement.querySelector('.cards__image');
        const cardsText = cardsElement.querySelector('.cards__text');

        cardsText.textContent = item.name;
        cardsImage.src = item.link;
        cardsImage.alt = item.name;

        openCards(cardsElement);
        clickLike(cardsElement);
        deleteCards(cardsElement);
        cardsContainer.append(cardsElement);
    });
}

templateCards();
closeCardsImage.addEventListener('click', closeImagePhoto);
openButtonPopupAdd.addEventListener('click', addPopupCards);
openButtonPopup.addEventListener('click', addPopup);
popupButtonClose.addEventListener('click', popupClose);
closePopupCards.addEventListener('click', closePopupCard);

