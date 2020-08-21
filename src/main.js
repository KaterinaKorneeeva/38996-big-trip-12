"use strict";

const POINT_COUNT = 3;
const headerElement = document.querySelector(`.page-header`);
const headerInfoElement = headerElement.querySelector(`.trip-main`);
const headerControlsElement = headerInfoElement.querySelector(`.trip-controls`);

import {createMenuTemplate} from "./view/menu.js";
// фильтры
import {createFilterTemplate} from "./view/filter.js";
// контейнер для информации о поездке
import {createTripInfoTemplate} from "./view/trip-info.js";
// информация о поездке
import {createTripInfoMainElement} from "./view/trip-info-main.js";
// стоимость поездки
import {createTripCostElement} from "./view/trip-cost.js";
// сортировка
import {createSortTemplate} from "./view/sort.js";
// cписок
import {createListTemplate} from "./view/list-trip.js";
// эл-т списка
import {createElementTemplate} from "./view/trip.js";
// создание/редактирование эл-та
import {createElementEditTemplate} from "./view/trip-edit.js";
// создание/редактирование эл-та
import {createDetailsTripTemplate} from "./view/trip-details.js";

import {createDayTripTemplate} from "./view/day-trip.js";

import {generatePoint} from "./mock/point.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// меню и фильтры
render(headerInfoElement, createTripInfoTemplate(), `afterbegin`);
render(headerControlsElement, createMenuTemplate(), `beforeend`);
render(headerControlsElement, createFilterTemplate(), `beforeend`);

const headerInfoMainElement = headerElement.querySelector(`.trip-info__main`);
const headerInfoCoastElement = headerElement.querySelector(`.trip-info__cost`);


const points = new Array(POINT_COUNT).fill().map(generatePoint);

const dates = [
  ...new Set(points.map((point) => new Date(point.date.start).toDateString()))
];


render(headerInfoMainElement, createTripInfoMainElement(), `beforeend`);
render(headerInfoCoastElement, createTripCostElement(), `beforeend`);

// контент
const mainElement = document.querySelector(`.page-main`);
const boardElement = mainElement.querySelector(`.trip-events`);

// сортировка и контент
render(boardElement, createSortTemplate(), `beforeend`);
render(boardElement, createListTemplate(), `beforeend`);


const dayListElement = mainElement.querySelector(`.trip-days`);
('dayListElement',dayListElement);


dates.forEach((date, index) => {
  points.filter((point) => new Date(point.date.start).toDateString() === date).forEach((point) => {

    // как в этом случае отрисовать точки маршрута, если эл-та trip-events__list еще нет

  });

  render(dayListElement, createDayTripTemplate(new Date(date), index + 1), `beforeend`);
});

// список точек маршрута
const tripListElement = mainElement.querySelector(`.trip-events__list`);
render(tripListElement, createElementEditTemplate(points[0]), `beforeend`);

const tripEditElement = mainElement.querySelector(`.event--edit`);
render(tripEditElement, createDetailsTripTemplate(points[0]), `beforeend`);

for (let i = 1; i < POINT_COUNT; i++) {
  render(tripListElement, createElementTemplate(points[i]), `beforeend`);
}
