import {parseTimeToArray} from "../utils.js";

const renderDate = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const createElementTemplate = (point) => {
  const {type, destination, price, date} = point;
  const timeStart = renderDate(date.start).split(`T`)[1];
  const timeEnd = renderDate(date.end).split(`T`)[1];

  return (
    `
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} to ${destination}</h3>

          <div class="event__schedule">
            <p class="event__time">
            <time class="event__start-time" datetime="${renderDate(date.start)}">
              ${timeStart}
            </time>
              &mdash;
            <time class="event__end-time" datetime="${renderDate(date.end)}">
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
      </li>
    `
  );
};
