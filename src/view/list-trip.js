import {createElement} from "../dom-utils.js";

const createListTripTemplate = () => `<ul class="trip-days"></ul>`;

export default class ListTrip {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createListTripTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
