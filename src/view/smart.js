import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  // обновляет данные
  // есть кнопка пользователь на нее кликает, на ней обработчик и вызывает
  // updateData
  // updateData(update) {
  updateData(update, justDataUpdating) {
    // если нечего обновлять, то прерываем
    if (!update) {
      return;
    }
    // берем те данные которые были и добавляем им  update
    this._data = Object.assign(
        {},
        this._data,
        update
    );
    if (justDataUpdating) {
      return;
    }
    // вызываем метод
    this.updateElement();
  }

  // обновляет разметку
  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null; // Чтобы окончательно "убить" ссылку на prevElement

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
