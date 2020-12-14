import {buttonEscape} from '../components/constants.js';

export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);

    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt){
        if(evt.key === buttonEscape){
            this.close();
        }
    }
    setEventListeners(){
        this._popup.querySelector('.popup__close').addEventListener('click', _ => {
            this.close();
        });
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup')){
                this.close();
            }
        });
    }
}