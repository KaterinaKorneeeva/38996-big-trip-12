import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mock/event.js";
import EventsModel from "./model/events.js";
import {render, RenderPosition} from "./utils/dom-utils.js";
import {generateFilter} from "./mock/filter.js";

const EVENT_COUNT = 13;
const headerElement = document.querySelector(`.page-header`);
const headerInfoElement = headerElement.querySelector(`.trip-main`);
const headerControlsElement = headerInfoElement.querySelector(`.trip-controls`);


const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);
const filters = generateFilter(events);

// меню и фильтры
render(headerInfoElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(headerControlsElement, new MenuView().getElement());
render(headerControlsElement, new FilterView(filters).getElement());

// render(headerControlsElement, new FilterView().getElement());

// контент
const mainElement = document.querySelector(`.page-main`);
const tripElement = mainElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripElement, eventsModel);
tripPresenter.init();


document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
