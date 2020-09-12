import AbstractView from "./abstract.js";
import {renderDateHoursMin} from "../utils/date-utils.js";

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
export default class DayTrip extends AbstractView {
  constructor(date, number) {
    super();
    this._date = date;
    this._number = number;
  }

  getTemplate() {
    return createDayTripTemplate(this._date, this._number);
  }

  getEventsList() {
    return this.getElement().querySelector(`.trip-events__list`);
  }

}
