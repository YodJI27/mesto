
export class FormValidator {
    constructor(formSelector, allClasses){
        this._formSelector = document.querySelector(formSelector);
        this._popupText = allClasses.popupText;
        this._popupButton = allClasses.popupButton;
        this._popupTextNameError = allClasses.popupTextNameError;
        this._popupButonActive = allClasses.popupButonActive;
    }
    // Добавление элемента ошибки
    _showInputError(element, messageError){
        const errorElement = this._formSelector.querySelector(`#${element.id}-error`);
        element.classList.add(this._popupTextNameError);
        errorElement.textContent = messageError;
    }

    // Скрытие элемента ошибки
    _hideInputError(element){
        const errorElement = this._formSelector.querySelector(`#${element.id}-error`);
        element.classList.remove(this._popupTextNameError);
        errorElement.textContent = "";
    }
    // Удаление текста ошибки при закрытии попапов
    removeError(element, text){
        text.textContent = "";
        element.classList.remove(this._popupTextNameError);
    }

    // Проверка валидности поля 
    _isValid(element){
        if(!element.validity.valid){
            this._showInputError(element, element.validationMessage);
        } else {
            this._hideInputError(element);
        }
    }
    // Проверка валидности
    _hasNotValidInput(inputList){
        return inputList.some((inputElement) => !inputElement.validity.valid);
    }

    // Добавление класса кнопки ( активная / не активная)
    _toggleButtonState(inputList, buttonElement){
        if(this._hasNotValidInput(inputList)){
            this.buttonActive(buttonElement);
        } else {
            this.buttonFalse(buttonElement);
        }
    }

    buttonActive(buttonElement){
        buttonElement.classList.add(this._popupButonActive);
        buttonElement.setAttribute('disabled', true);
    }

    buttonFalse(buttonElement){
        buttonElement.classList.remove(this._popupButonActive);
        buttonElement.removeAttribute('disabled');
    }

    // Добавление обработчика всем полям формы
    _setEventListener(element){
        const inputList = Array.from(element.querySelectorAll(this._popupText));
        const buttonInput = element.querySelector(this._popupButton);
        inputList.forEach((item) => {
            item.addEventListener('input', () =>{
                this._isValid(item);
                this._toggleButtonState(inputList, buttonInput);
            });
        });
        this._toggleButtonState(inputList, buttonInput);
    }

    // Добавление обработчика формам
    enableValidation(){
        const buttonInput = document.querySelector(this._popupButton);
        this._formSelector.addEventListener('submit', (evt) => {
                evt.preventDefault();
            })
        this.buttonFalse(buttonInput);
        this._setEventListener(this._formSelector);
    }
}