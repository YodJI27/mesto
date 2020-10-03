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
const toggleButtonState = (inputList, buttonElement, allClasses) => {
    const hasNotValidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid
    );
    if(hasNotValidInput){
        buttonActive(buttonElement, allClasses);
    } else {
        buttonFalse(buttonElement, allClasses);
    }
}

 const buttonActiveTrue = (element) => {
     element.classList.add(allClasesCase.popupButonActive);
     element.disabled = true;
}

const buttonActive = (buttonElement, allClasses) => {
    buttonElement.classList.add(allClasses.popupButonActive);
    buttonElement.setAttribute('disabled', true);
}
const buttonFalse = (buttonElement, allClasses) => {
    buttonElement.classList.remove(allClasses.popupButonActive);
    buttonElement.removeAttribute('disabled');
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
// popupButtonActiveFalse = (element) => {
//     element.classList.remove(allClasesCase.popupButonActive);
//     element.removeAttribute('disabled');
// }
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
