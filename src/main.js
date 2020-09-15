import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {generateEvent} from "./mock/event.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/dom-utils.js";
import {generateFilter} from "./mock/filter.js";

const EVENT_COUNT = 13;
const headerElement = document.querySelector(`.page-header`);
const headerInfoElement = headerElement.querySelector(`.trip-main`);
const headerControlsElement = headerInfoElement.querySelector(`.trip-controls`);


// контент
const mainElement = document.querySelector(`.page-main`);
const tripElement = mainElement.querySelector(`.trip-events`);

const filterElement = document.querySelector(`.trip-main__trip-controls`);
console.log('filterElement',filterElement);

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

console.log('filterModel',filterModel);
eventsModel.setEvents(events);
const filters = generateFilter(events);

// меню и фильтры
render(headerInfoElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(headerControlsElement, new MenuView().getElement());
render(headerControlsElement, new FilterView(filters).getElement());

// render(headerControlsElement, new FilterView().getElement());




// const filterElement = mainElement.querySelector(`trip-main__trip-controls`);
// console.log('filterElement',filterElement);
const tripPresenter = new TripPresenter(tripElement, eventsModel);
// const filterPresenter = new FilterPresenter(filterElement, filterModel, eventsModel);

// filterPresenter.init();
tripPresenter.init();


document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
