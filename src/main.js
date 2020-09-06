import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import SortView from "./view/sort.js";
import ListTripView from "./view/list-trip.js";
import EventView from "./view/event.js";
import EventEditView from "./view/event-edit.js";
import DayTripView from "./view/day-trip.js";
import { generateEvent } from "./mock/event.js";
import {render, RenderPosition, replace, remove} from "./utils/dom-utils.js";

const EVENT_COUNT = 13;
const headerElement = document.querySelector(`.page-header`);
const headerInfoElement = headerElement.querySelector(`.trip-main`);
const headerControlsElement = headerInfoElement.querySelector(`.trip-controls`);

// меню и фильтры
render(headerInfoElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(headerControlsElement,  new MenuView().getElement());
render(headerControlsElement, new FilterView().getElement());

// контент
const mainElement = document.querySelector(`.page-main`);
const boardElement = mainElement.querySelector(`.trip-events`);

// сортировка и контент
render(boardElement, new SortView().getElement());
render(boardElement, new ListTripView().getElement());

const tripDaysElement = mainElement.querySelector(`.trip-days`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);


  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
    // eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
    // eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  // eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
  //     evt.preventDefault();
  //     replaceFormToCard();
  // });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement());
};

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
      renderEvent(getEventsList(dayElement), event);
    } else {
      // 1. dayDate == null
      // 2. event.date.start.getDate() != dayDate
      dayDate = event.date.start.getDate();
      // render day
      const dayTemplate = new DayTripView(event.date.start, dayNumber++);
      render(tripDaysElement, dayTemplate.getElement());
      // render day event
      dayElement = getLastNode(tripDaysElement.querySelectorAll(`.trip-days__item.day`));;
      renderEvent(getEventsList(dayElement), event);
    }
  }
};

renderEvents(events);
