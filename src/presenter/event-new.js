
import EventEditView from "../view/event-edit.js";
import {generateId} from "../mock/event.js";
import {isEscEvent} from "../utils/common.js";
import {render, replace, remove, RenderPosition} from "../utils/dom-utils.js";
import {UserAction, UpdateType} from "../const.js";

// const Mode = {
//   DEFAULT: `DEFAULT`,
//   EDITING: `EDITING`
// };


export default class EventNew {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    // this._changeMode = changeMode;

    // this._eventComponent = null;
    this._eventEditComponent = null;
    // this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {

    if (this._eventEditComponent !== null) {
      return;
    }

    this._event = event;

    // const prevEventComponent = this._eventComponent;
    // const prevEventEditComponent = this._eventEditComponent;

    // this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView();

    // this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    // условие на проверку, первый раз был вызван init или нет
    // if (prevEventComponent === null || prevEventEditComponent === null) {
    render(this._eventListContainer, this._eventEditComponent.getElement(), RenderPosition.AFTERBEGIN);
    document.addEventListener(`keydown`, this._escKeyDownHandler);


    // // Проверка на наличие в DOM необходима,
    // // чтобы не пытаться заменить то, что не было отрисовано
    // // if (this._eventListContainer.getElement().contains(prevEventComponent.getElement())) {
    // if (this._eventListContainer.contains(prevEventComponent.getElement())) {
    //   replace(this._eventComponent, prevEventComponent);
    // }

    // // if (this._eventListContainer.getElement().contains(prevEventEditComponent.getElement())) {
    // if (this._eventListContainer.contains(prevEventEditComponent.getElement())) {
    //   replace(this._eventEditComponent, prevEventEditComponent);
    // }

    // remove(prevEventComponent);
    // remove(prevEventEditComponent);
  }

  // для очищения списка вместо innerHtml
  destroy() {
    if (this._taskEditComponent === null) {
      return;
    }

    // remove(this._eventComponent);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  // resetView() {
  //   if (this._mode !== Mode.DEFAULT) {
  //     this._replaceFormToCard();
  //   }
  // }

  // _replaceCardToForm() {
  //   replace(this._eventEditComponent, this._eventComponent);
  //   document.addEventListener(`keydown`, this._escKeyDownHandler);
  //   this._changeMode();
  //   this._mode = Mode.EDITING;
  // }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    // this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    isEscEvent(evt, (e) => {
      e.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    });
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._changeData(

        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        // Пока у нас нет сервера, который бы после сохранения
        // выдывал честный id задачи, нам нужно позаботиться об этом самим

        Object.assign({id: generateId()}, event)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
