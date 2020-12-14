import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__container');
        this._formInputs = this._popup.querySelectorAll('.popup__text');
        this.setEventListeners();
    }
    _getInputValues(){

        this._case = {};

        this._formInputs.forEach(item =>{
            this._case[item.name] = item.value;
        })
        return this._case;
    }
    close(){
        super.close();
        this._form.reset();
    }

    setEventListeners(){
        this._popup.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }
}