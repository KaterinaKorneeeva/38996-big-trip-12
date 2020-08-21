import {renderDate} from "../utils.js";


export const createDayTripTemplate = (date, number) => {

  const dateTime = renderDate(date).split(`T`)[0];
  return (
    `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${number}</span>
          <time class="day__date" datetime="${dateTime}">${date.toDateString().slice(4, 10)}</time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>
    `
  );
};
