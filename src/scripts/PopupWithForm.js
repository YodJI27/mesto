import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(formSelector, renderer){
        super(formSelector);
        this._renderer = renderer;
        this._form = this._formSelector.querySelector('.popup__container');
        this._formElement = this._formSelector.querySelectorAll('.popup__text');
        this.setEventListeners();
    }
    _getInputValues(){

        this._case = {};

        this._formElement.forEach(item =>{
            this._case[item.name] = item.value;
        })
        return this._case;
    }
    close(){
        this._form.reset() ;
        super.close();
    }

    setEventListeners(){
        this._formSelector.addEventListener('submit', () => {
            this._renderer(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }
}