import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {photoCards,
        popupCards, jobInput, nameInput,
        openButtonPopupAdd, openButtonPopup, popupEdit, 
        allClasesCase, textImage, photoImage, cardsTemplate, 
        deletePopup, popupButtonSave, profileAvatarButton,
        editAvatarSelector, popupEditAvatarButton, profileImage, popupButtonSaveButton} from '../components/constants.js';
import { Popup } from '../components/Popup';

// Редактирование информации о пользователе
const apiUser = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/users/me', 
    headers: {
        "Authorization": "ef54f240-380e-482d-82be-6a3e691e6be6",
        "content-type": "application/json"
    }    
});
// Для карточек
const apiCards = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/cards', 
    headers: {
        "Authorization": "ef54f240-380e-482d-82be-6a3e691e6be6",
        "content-type": "application/json"
    }
});

// Создание класса для редактирования профиля
const editInfoUser = new UserInfo({nameSelector: '.profile__author', jobSelector: '.profile__description', avatarSelector: '.profile__image'});
const editPopupClass = new PopupWithForm('.popup', () => {addFormSubmitHandler();});

// Текст для кнопок
const renderLoading = (loading, button, message) => {
    if(loading) {
        button.textContent = message;
    } else {
        button.textCotent = message;
    }
}

const editApiUser = () => {
    apiUser.getInfo()
    .then((data) => {
        profileImage.src = data.avatar;
        editInfoUser.setUserInfo(data.name, data.about);
})
.catch((err) => {console.log(err)})
};
editApiUser();

// Класс для попап удаление карточки
const closeDeleteCardsPopup = new Popup('.delete__cards');

// Заполнение формы для редактирования
const addFormSubmitHandler = () => {
    editInfoUser.setUserInfo(nameInput.value, jobInput.value);
    apiUser.getEditInfo(nameInput.value, jobInput.value);
    editPopupClass.close();
}

// Открытие попап для добавления карточек
const addPopupCards = () => {
    validateCard.buttonActive();
    formPopup.open();
}
// Открытие попап для редактирования аватара 
const editAvatarFunction = () => {
    editAvatar.open();
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
// закрытие для попап удаление карточки
deletePopup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('delete__cards') || evt.target.classList.contains('popup__delete_close_button')){
        closeDeleteCardsPopup.close();
    }
})

editAvatarSelector.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__avatar') || evt.target.classList.contains('popup__close_avatar')){
        editAvatar.close();
    }
})


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

// рендер одной карточки
const rendererCards = (item) => {
    return new Card({item, 
        handleCardClick: () => {
                cardsImage.open(item.name, item.link);
        }   
    }, '#cards__template', closeDeleteCardsPopup, apiUser, apiCards);
}

// Смена аватара
const editAvatar = new PopupWithForm('.popup__avatar', (item) => {
    renderLoading(true, popupEditAvatarButton, 'Сохранение...')
    apiUser
    .editAvatar(item.link)
    .then((data) => {
        profileImage.src = data.avatar;
    })
    .catch((err) => {console.log(err)})
    .finally(_ => renderLoading(false, popupEditAvatarButton, "Сохранить"));
});


// Добавление карточек из попап
const formPopup = new PopupWithForm('#cards__popup', (item) => {
    renderLoading(true, popupButtonSave, 'Создание...');
    apiCards
    .getAddCards(item.name, item.link)
    .then((res) => {
        const card  = rendererCards(res);
        const cardsElement = card.generateCard();
        cardsTemplate.prepend(cardsElement);
    })
    .catch((err) => {console.log(err)})
    .finally(_ => renderLoading(false, popupButtonSave, 'Cоздать'));
});

// Отрисовка всех карточек
apiCards.addCardsInServer().then((data) => {
    const cardsSection = new Section({items: data, renderer: (item) => {
       const card  = rendererCards(item);
       card.checkForId;
       const cardsElement = card.generateCard();
       cardsSection.addItem(cardsElement);
    }
     }, '.cards');
    cardsSection.renderElements(data);
})

// Приближение картинки
const cardsImage = new PopupWithImage('.photo', {textImage, photoImage});

openButtonPopupAdd.addEventListener('click', addPopupCards);
openButtonPopup.addEventListener('click', addPopup);
profileAvatarButton.addEventListener('click', editAvatarFunction);

const validateEdit = new FormValidator(allClasesCase.formSelector, allClasesCase);
validateEdit.enableValidation();

const validateCard = new FormValidator(allClasesCase.formSelectorCards, allClasesCase);
validateCard.enableValidation();

const validateAvatar = new FormValidator(allClasesCase.formSelectorAvatar, allClasesCase);
validateAvatar.enableValidation();