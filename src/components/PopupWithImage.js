import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(formSelector, {textImage, photoImage}){
        super(formSelector);
        this._textImage = textImage;
        this._photoImage = photoImage;
        super.setEventListeners();
    }

    open(imageName, imageSrc){
        this._photoImage.src = imageSrc;
        this._photoImage.alt = imageName;
        this._textImage.textContent = imageName;
        super.open();
    }
} 