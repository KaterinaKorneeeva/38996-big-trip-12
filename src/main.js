import {createMenuTemplate} from "./view/menu.js";
import { createFilterTemplate } from "./view/filter.js";
import { createTripInfoTemplate } from "./view/trip-info.js";
import { createSortTemplate } from "./view/sort.js";
import { createListTripTemplate } from "./view/list-trip.js";
import { createEventTemplate } from "./view/event.js";
import { createDayTripTemplate } from "./view/day-trip.js";
import { generateEvent } from "./mock/event.js";
import { render } from "../src/dom-utils.js";

const EVENT_COUNT = 13;
const headerElement = document.querySelector(`.page-header`);
const headerInfoElement = headerElement.querySelector(`.trip-main`);
const headerControlsElement = headerInfoElement.querySelector(`.trip-controls`);

// меню и фильтры
render(headerInfoElement, createTripInfoTemplate(), `afterbegin`);
render(headerControlsElement, createMenuTemplate(), `beforeend`);
render(headerControlsElement, createFilterTemplate(), `beforeend`);

// контент
const mainElement = document.querySelector(`.page-main`);
const boardElement = mainElement.querySelector(`.trip-events`);

// сортировка и контент
render(boardElement, createSortTemplate(), `beforeend`);
render(boardElement, createListTripTemplate(), `beforeend`);

const tripDaysElement = mainElement.querySelector(`.trip-days`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const sortEvents = (events) => {
  return events.sort((e1, e2) => {
    if (e1.date.start > e2.date.start) {
      return 1;
    }
    if (e1.date.start < e2.date.start) {
      return -1;
    }
    return 0;
  });
};

const getLastNode = (nodes) => nodes[nodes.length - 1];

const renderEvents = (events) => {
  const sortedEvents = sortEvents(events);

  let dayNumber = 1;
  let dayElement = null;
  let dayDate = null;

  const getEventsList = (day) => day.querySelector(`.trip-events__list`);

  for (let event of sortedEvents) {
    if (event.date.start.getDate() === dayDate) {
      render(getEventsList(dayElement), createEventTemplate(event));
    } else {
      // 1. dayDate == null
      // 2. event.date.start.getDate() != dayDate
      dayDate = event.date.start.getDate();
      // render day
      const dayTemplate = createDayTripTemplate(event.date.start, dayNumber++);
      render(tripDaysElement, dayTemplate);
      // render day event
      dayElement = getLastNode(tripDaysElement.querySelectorAll(`.trip-days__item.day`));
      render(getEventsList(dayElement), createEventTemplate(event));
    }
  }
};

renderEvents(events);
