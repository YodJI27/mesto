export class Popup {
    constructor(formSelector){
        this._formSelector = document.querySelector(formSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._formSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        // this.setEventListeners();
    }
    close(){
        this._formSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        }
    }
    setEventListeners(){
        this._formSelector.querySelector('.popup__close').addEventListener('click', () => {
            this.close;
        });
    }
}