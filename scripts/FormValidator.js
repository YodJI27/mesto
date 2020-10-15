

export class formValidator {
    constructor(formSelector, allClasses){
        this._formSelector = formSelector;
        this._formElement = document.querySelector(formSelector);
        this._popupText = allClasses.popupText;
        this._popupButton = allClasses.popupButton;
        this._popupTextNameError = allClasses.popupTextNameError;
        this._popupButonActive = allClasses.popupButonActive;
    }
    // Добавление элемента ошибки
    _showInputError(formElement, element, messageError){
        const errorElement = formElement.querySelector(`#${element.id}-error`);
        element.classList.add(this._popupTextNameError);
        errorElement.textContent = messageError;
    }

    // Скрытие элемента ошибки
    _hideInputError(formElement, element){
        const errorElement = formElement.querySelector(`#${element.id}-error`);
        element.classList.remove(this._popupTextNameError);
        errorElement.textContent = "";
    }

    // Проверка валидности поля 
    _isValid(formElement, element){
        if(!element.validity.valid){
            this._showInputError(formElement, element, element.validationMessage);
        } else {
            this._hideInputError(formElement, element);
        }
    }

    // Добавление класса кнопки ( активная / не активная)
    _toggleButtonState(inputList, buttonElement){
        const hasNotValidInput = inputList.some(
            (inputElement) => !inputElement.validity.valid
        );
        if(hasNotValidInput){
            this._buttonActive(buttonElement);
        } else {
            this._buttonFalse(buttonElement);
        }
    }
    _buttonActive(buttonElement){
        buttonElement.classList.add(this._popupButonActive);
        buttonElement.setAttribute('disabled', true);
    }
    _buttonFalse(buttonElement){
        buttonElement.classList.remove(this._popupButonActive);
        buttonElement.removeAttribute('disabled');
    }


    // Добавление обработчика всем полям формы
    _setEventListener(element){
        const inputList = Array.from(element.querySelectorAll(this._popupText));
        const buttonInput = element.querySelector(this._popupButton);
        inputList.forEach((item) => {
            item.addEventListener('input', () =>{
                this._isValid(element, item);
                this._toggleButtonState(inputList, buttonInput);
            });
        });
        this._toggleButtonState(inputList, buttonInput);
    }

    // Добавление обработчика формам
    enableValidation(){
        const buttonInput = document.querySelector(this._popupButton);
            this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            })
        this._buttonFalse(buttonInput);
        this._setEventListener(this._formElement);
    }
}