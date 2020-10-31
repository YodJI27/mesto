export class Section {
    constructor({items, renderer}, formSelector){
        this._items = items;
        this._renderer = renderer;
        this._formSelector = document.querySelector(formSelector);
    }
    // отвечает за отрисовку всех элементов 
    renderElement(){
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    // принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._formSelector.prepend(element);
    }
}