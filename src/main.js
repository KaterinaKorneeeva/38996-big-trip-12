import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils/dom-utils.js";

const EVENT_COUNT = 13;
const headerElement = document.querySelector(`.page-header`);
const headerInfoElement = headerElement.querySelector(`.trip-main`);
const headerControlsElement = headerInfoElement.querySelector(`.trip-controls`);

// меню и фильтры
render(headerInfoElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(headerControlsElement, new MenuView().getElement());
render(headerControlsElement, new FilterView().getElement());

// контент
const mainElement = document.querySelector(`.page-main`);
const tripElement = mainElement.querySelector(`.trip-events`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripPresenter = new TripPresenter(tripElement);
tripPresenter.init(events);
