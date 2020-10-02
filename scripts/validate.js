allClasesCase = {
    formSelector: '.popup__container',
    popupText: '.popup__text',
    popupButton: '.popup__button',
    popupTextNameError: 'popup__text_name_error',
    popupButonActive: 'popup__button_active_not',
    inputNameError: 'input-name-error',
    inputUrlError: 'url-input-error'
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

const buttonActive = (element) => {
    element.classList.add(allClasesCase.popupButonActive);
    element.disabled = true;
}
const buttonActiveFalse = (element) => {
    element.classList.remove(allClasesCase.popupButonActive);
    element.disabled = false;
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
const toggleButtonState = (inputList, buttonElement, allClasses) => {
    const hasNotValidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid
    );
    if(hasNotValidInput){
        buttonElement.classList.add(allClasses.popupButonActive);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(allClasses.popupButonActive);
        buttonElement.removeAttribute('disabled');
    }
}


// Добавление обработчика всем полям формы
const setEventListener = (element, allClasses) => {
    const inputList = Array.from(element.querySelectorAll(allClasses.popupText));
    const buttonInput = element.querySelector(allClasses.popupButton);
    inputList.forEach((item) => {
        item.addEventListener('input', function(){
            isValid(element, item, allClasses);
            toggleButtonState(inputList, buttonInput, allClasses);
        });
    });
    toggleButtonState(inputList, buttonInput, allClasses);
}

// Добавление обработчика формам
const  enableValidation = (allClasses) => {
    const formList = Array.from(document.querySelectorAll(allClasses.formSelector));
    formList.forEach((item) => {
        item.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListener(item, allClasses);
    });
}
enableValidation(allClasesCase);