import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
        jobInput, nameInput,
        openButtonPopupAdd, openButtonPopup, 
        allClasesCase, textImage, photoImage, cardsTemplate, 
        popupButtonSave, profileAvatarButton,
        popupEditAvatarButton, profileImage, popupButtonSaveButton, popupDeleteButton
       } from '../components/constants.js';

// Редактирование информации о пользователе
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17', 
    headers: {
        "Authorization": "ef54f240-380e-482d-82be-6a3e691e6be6",
        "content-type": "application/json"
    }    
});

// Отрисовка всех карточек
Promise.all([
    api.receiveCardsInServer(),
    api.getInfo()
])
.then(([cards, user]) => {
    const cardsSection = new Section({items: cards, renderer: (item) => {
        rendererCards(item, user._id);
    }
     }, '.cards');
    cardsSection.renderElements(cards);
    profileImage.src = user.avatar;
    editInfoUser.setUserInfo(user.name, user.about);
})
.catch((err) => {console.log(err)});

// Создание класса для редактирования профиля
const editInfoUser = new UserInfo({nameSelector: '.profile__author', jobSelector: '.profile__description', avatarSelector: '.profile__image'});
// Форма редактирования профиля
const editPopupClass = new PopupWithForm('.popup', () => {
    editInfoUser.setUserInfo(nameInput.value, jobInput.value);
    renderLoading(false, popupButtonSaveButton, "Cохранение...")
    api
    .editInfoUser(nameInput.value, jobInput.value)
    .finally(_ => renderLoading(false, popupButtonSaveButton, "Сохранить"));
    editPopupClass.close();
});

// Текст для кнопок
const renderLoading = (loading, button, message) => {
    if(loading) {
        button.textContent = message;
    } else {
        button.textContent = message;
    }
}

// Класс для попап удаление карточки
const closeDeleteCardsPopup = new PopupWithForm('.delete__cards', _ => {});

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
// Обработчик постановки лайков
const checkLikesFunction = (evt, id, card) => {
    const checkLike = card.checkCardsLikes(evt);
    if(checkLike){
        api.deleteLikes(id)
        .then((res) => {
            card.deleteCardsClass(evt);
            card._likeCount(res.likes);
        })
        .catch((err) => {console.log(err)});
    } else {
       api.putLikes(id)
        .then((res) => {
            card.addCardsClass(evt);
            card._likeCount(res.likes);
        })
        .catch((err) => {console.log(err)});
    }
}

// рендер одной карточки
const rendererCards = (item, id) => {
    const card = new Card({item, 
        handleCardClick: () => {
                cardsImage.open(item.name, item.link);
        },
        checkLikes: (evt) => {
            checkLikesFunction(evt, item._id, card);
        },
        deletedCards: () => {
            api.deleteCards(item._id)
            .then( _ => {card._deleteCards()})
            .catch((err) => {console.log(err)})
        }
    }, '#cards__template', closeDeleteCardsPopup, api);
    const cardsElement = card.generateCard();
    card.checkForId(id);
    card.checkMyLikes(id);
    cardsTemplate.prepend(cardsElement);
}
// Смена аватара
const editAvatar = new PopupWithForm('.popup__avatar', (item) => {
    renderLoading(true, popupEditAvatarButton, 'Сохранение...')
    api
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
    api
    .upCardsToTheServer(item.name, item.link)
    .then((res) => {
        rendererCards(res, res.owner._id);
    })
    .catch((err) => {console.log(err)})
    .finally(_ => renderLoading(false, popupButtonSave, 'Cоздать'));
});
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