import {photoImage, textImage} from './constants.js';
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(formSelector){
        super(formSelector);
    }

    open(imageName, imageSrc){
        photoImage.src = imageSrc;
        photoImage.alt = imageName;
        textImage.textContent = imageName;
        super.setEventListeners();
        super.open();
    }
} 