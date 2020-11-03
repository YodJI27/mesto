
export class FormValidator {
    constructor(formSelector, allClasses){
        this._form = document.querySelector(formSelector);
        this._inputList = Array.from(this._form.querySelectorAll(allClasses.popupText));
        this._popupButton = this._form.querySelector(allClasses.popupButton);
        this._popupTextNameError = allClasses.popupTextNameError;
        this._popupButonActive = allClasses.popupButonActive;
    }
    // Добавление элемента ошибки
    _showInputError(element, messageError){
        const errorElement = this._form.querySelector(`#${element.id}-error`);
        element.classList.add(this._popupTextNameError);
        errorElement.textContent = messageError;
    }

    // Скрытие элемента ошибки
    _hideInputError(input){
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._popupTextNameError);
        errorElement.textContent = "";
    }
    // Удаление текста ошибки при закрытии попапов
    // removeError(element, text){
    //     text.textContent = "";
    //     element.classList.remove(this._popupTextNameError);
    // }
    removeError(){
        this._inputList.forEach(item => {
            this._hideInputError(item);
        })
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
    _toggleButtonState(inputList){
        if(this._hasNotValidInput(inputList)){
            this.buttonActive();
        } else {
            this.buttonFalse();
        }
    }

    buttonActive(){
        this._popupButton.classList.add(this._popupButonActive);
        this._popupButton.setAttribute('disabled', true);
    }

    buttonFalse(){
        this._popupButton.classList.remove(this._popupButonActive);
        this._popupButton.removeAttribute('disabled');
    }

    // Добавление обработчика всем полям формы
    _setEventListener(){
        const inputList = this._inputList;
        inputList.forEach((item) => {
            item.addEventListener('input', () =>{
                this._isValid(item);
                this._toggleButtonState(inputList);
            });
        });
        this._toggleButtonState(inputList);
    }

    // Добавление обработчика формам
    enableValidation(){
        this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            })
        this.buttonFalse();
        this._setEventListener();
    }
}