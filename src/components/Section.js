export class Section {
    constructor({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    // отвечает за отрисовку всех элементов 
    renderElements(){
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    // принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }
}