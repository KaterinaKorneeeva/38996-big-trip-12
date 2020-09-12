// import AbstractView from "./abstract.js";
import SmartView from "./smart.js";
import {renderDate} from "../utils/date-utils.js";
import EventDetailsView from "../view/event-details.js";
import {getPhotos, generateRandomDescription, generateOffers} from "../mock/event.js";

import {TRANSPORT_TYPE, TRANSFER, ACTIVITY, DESTINATION} from "../const.js";

const types = TRANSPORT_TYPE;

const BLANK_EVENT = {
  type: ``,
  infoDestination: {
    description: ``,
    pictures: [],
  },
  price: ``,
  date: {
    start: new Date(),
    end: new Date(),
  },
  isFavorite: false,
};


const getItemTypeTemplate = (arr, checkedType) => {
  return arr.map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checkedType.toUpperCase() === type.toUpperCase() ? ` checked` : ``}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
    </div>`
  ).join(``);
};

const createEventEditTemplate = (event) => {
  const {type, price, infoDestination, date, isFavorite} = event;
  const cityOptions = DESTINATION.map((city) => `<option value="${city}">`).join(``);

  const itemTransferTemplate = getItemTypeTemplate(TRANSFER, type);
  const itemActivityTemplate = getItemTypeTemplate(ACTIVITY, type);

  const favoriteChecked = isFavorite
    ? `checked`
    : ``;

  const EventDetailsBlock = new EventDetailsView(event);
  const getEventDetails = () => (`
    ${EventDetailsBlock.getTemplate()}
  `);

  return `<li class="trip-events__item">
          <form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>
                  ${itemTransferTemplate}
                </fieldset>
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>
                  ${itemActivityTemplate}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
              ${type} to
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${infoDestination.name}" list="destination-list-1">
              <datalist id="destination-list-1">
                ${cityOptions}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${renderDate(date.start)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${renderDate(date.end)}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=&euro;${price}>
            </div>
            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>
            <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoriteChecked}>
            <label class="event__favorite-btn" for="event-favorite-1">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </label>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          ${getEventDetails()}
        </form>
        </li>`;
};

export default class EventEdit extends SmartView {
  constructor(event = BLANK_EVENT) {
    super();

    // статичный метод
    this._data = EventEdit.parseTaskToData(event);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._destinationClickHandler = this._destinationClickHandler.bind(this);


    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    //
    this._setInnerHandlers();
  }

  // сброс
  reset(event) {
    this.updateData(
        EventEdit.parseTaskToData(event)
    );
  }
  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  // восстановление обработчиков после перерисовки
  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeClickHandler);

    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationClickHandler);
  }

  _typeClickHandler(evt) {
    evt.preventDefault();
    this._data.type = types.filter((item) => item.toLowerCase() === evt.target.value.toLowerCase());
    this.updateData({
      type: this._data.type[0],
      offers: generateOffers(this._data.type[0]),

    });
  }

  _destinationClickHandler(evt) {
    evt.preventDefault();
    this._data.name = evt.target.value;
    this._data.description = generateRandomDescription();
    this._data.pictures = getPhotos();
    this.updateData({
      infoDestination: {
        name: this._data.name,
        description: this._data.description,
        pictures: {
          src: this._data.pictures,
          description: this._data.description,
        }
      },
    });
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(this._data);
  }
  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }


  static parseTaskToData(data) {
    return Object.assign({}, data);
  }
}
