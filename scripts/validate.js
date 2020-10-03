allClasesCase = {
    formSelector: '.popup__container',
    popupText: '.popup__text',
    popupButton: '.popup__button',
    popupTextNameError: 'popup__text_name_error',
    popupButonActive: 'popup__button_active_not'
};

 
// Добавление элемента ошибки
const showInputError = (formElement, element, messageError, allClasses) => {
    const errorElement = formElement.querySelector(`#${element.id}-error`);
    element.classList.add(allClasses.popupTextNameError);
    errorElement.textContent = messageError;
    
}

// Скрытие элемента ошибки
const hideInputError = (formElement, element, allClasses) => {
    const errorElement = formElement.querySelector(`#${element.id}-error`);
    element.classList.remove(allClasses.popupTextNameError);
    errorElement.textContent = "";
}
const buttonClosed = (element) => {
    element.classList.remove(allClasesCase.popupTextNameError);
}

const removeInputError = (element) => {
    element.textContent = "";
}


// Проверка валидности поля 
const isValid = (formElement, element, allClasses) => {
    if(!element.validity.valid){
        showInputError(formElement, element, element.validationMessage, allClasses);
    } else {
        hideInputError(formElement, element, allClasses);
    }
}

// Добавление класса кнопки ( активная / не активная)
const toggleButtonState = (inputList, buttonElement) => {
    const hasNotValidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid
    );
    if(hasNotValidInput){
        buttonActive(buttonElement);
    } else {
        buttonFalse(buttonElement);
    }
}
const buttonActive = (buttonElement) => {
    buttonElement.classList.add(allClasesCase.popupButonActive);
    buttonElement.setAttribute('disabled', true);
}
const buttonFalse = (buttonElement) => {
    buttonElement.classList.remove(allClasesCase.popupButonActive);
    buttonElement.removeAttribute('disabled');
}

// Добавление обработчика всем полям формы
const setEventListener = (element, allClasses) => {
    const inputList = Array.from(element.querySelectorAll(allClasses.popupText));
    const buttonInput = element.querySelector(allClasses.popupButton);
    inputList.forEach((item) => {
        item.addEventListener('input', function(){
            isValid(element, item, allClasses);
            toggleButtonState(inputList, buttonInput);
        });
    });
    toggleButtonState(inputList, buttonInput);
}

// Добавление обработчика формам
const  enableValidation = (allClasses) => {
    const formList = Array.from(document.querySelectorAll(allClasses.formSelector));
    const buttonInput = document.querySelector(allClasses.popupButton);
    formList.forEach((item) => {
        item.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        buttonFalse(buttonInput, allClasses);
        setEventListener(item, allClasses);
    });
}
enableValidation(allClasesCase);