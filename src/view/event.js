import AbstractView from "./abstract.js";
import {renderDateHoursMin} from "../utils/date-utils.js";

const createEventTemplate = (event) => {
  const {type, destination, price, date} = event;
  const timeStart = renderDateHoursMin(date.start).split(`T`)[1];
  const timeEnd = renderDateHoursMin(date.end).split(`T`)[1];

  return `<li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${type} to ${destination}</h3>
              <div class="event__schedule">
                <p class="event__time">
                <time class="event__start-time" datetime="${renderDateHoursMin(date.start)}">
                  ${timeStart}
                </time>
                  &mdash;
                <time class="event__end-time" datetime="${renderDateHoursMin(date.end)}">
                  ${timeEnd}
                </time>
                </p>
                <p class="event__duration">30M</p>
              </div>

              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">Order Uber</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">20</span>
                  </li>
              </ul>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
          </div>
        </li>`;
};

// export default class Event {
export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
