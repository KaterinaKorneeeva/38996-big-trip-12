import {renderDateHoursMin} from "../date-utils.js";
import {createElement} from "../dom-utils.js";

const createDayTripTemplate = (date, number) => {
  const dateTime = renderDateHoursMin(date).split(`T`)[0];
  return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${number}</span>
        <time class="day__date" datetime="${dateTime}">${date.toDateString().slice(4, 10)}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`;
};

export default class DayTrip {
  constructor(date, number) {
    this._date = date;
    this._number = number;
    this._element = null;
  }

  getTemplate() {
    return createDayTripTemplate(this._date, this._number);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
