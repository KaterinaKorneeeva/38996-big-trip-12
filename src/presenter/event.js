import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";

import {isEscEvent} from "../utils/common.js";
import {render, replace} from "../utils/dom-utils.js";

export default class Event {
  constructor(eventListContainer) {
    console.log('eventListContainer',eventListContainer);
    this._eventListContainer = eventListContainer;

    this._EventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._task = event;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    const replaceCardToForm = () => {
      replace(this._eventEditComponent, this._eventComponent);
    };

    const replaceFormToCard = () => {
      replace(this._eventComponent, this._eventEditComponent);
    };

    this._eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceCardToForm();
    });

    this._eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, isEscEvent);
    });

    // this._eventComponent.setEditClickHandler(this._handleEditClick);
    // this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    render(this._eventListContainer, this._eventComponent.getElement());
    // render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
