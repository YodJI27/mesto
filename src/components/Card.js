export class Card {
    constructor({item, handleCardClick}, template, deleteCards, apiUser, apiCards){
        this._name = item.name;
        this._link = item.link;
        this._idUser = item.owner._id;
        this._idCards = item._id;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._deleteCardsPopup = deleteCards;
        this._apiCardsDelete = apiCards;
        this._apiUser = apiUser.getInfo().then((data) => {this.checkForId(data._id)});
        this._editName = document.querySelector('.profile__author').textContent;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._template)
        .content
        .querySelector('.cards__item')
        .cloneNode(true)
        return cardElement;
    }
    checkForId(id){
        if(this._idUser !== id){
            this._buttonDelete.classList.add('cards__delete_inactive');
        }
    }

    // Cоздание и заполнение карточки
    generateCard(){
        this._element = this._getTemplate();
        this._cardValue = this._element.querySelector('.cards__image');
        this._buttonDelete = this._element.querySelector('.cards__delete');
        this._setEventListener();

        this._element.querySelector('.cards__text').textContent = this._name;
        this._cardValue.src = this._link;
        this._cardValue.alt = this._name;

        return this._element;
    }
    // Лайк
    _clickLike (evt){
        evt.target.classList.toggle('cards__like_active');
    }   
    // Удаление карточки
    _deleteCards(){
        this._element.remove();
        this._element = null;
    }
    _deleteCardsFunction(){
        document.querySelector('.popup__delete_button').addEventListener('click', () => {
            this._deleteCards();
            this._apiCardsDelete.deleteCards(this._idCards);
            this._deleteCardsPopup.close();
        })
    }
    // Добавление всех обработчиков карточки
    _setEventListener(){
        this._element.querySelector('.cards__like').addEventListener('click', (evt) =>{
            this._clickLike(evt);
        })
        this._element.querySelector('.cards__delete').addEventListener('click', () =>{
            this._deleteCardsPopup.open();
            this._deleteCardsFunction();
        })
        this._cardValue.addEventListener('click', () =>{
            this._handleCardClick();
        })
    }
}
