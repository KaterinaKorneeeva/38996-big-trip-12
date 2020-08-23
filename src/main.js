"use strict";

import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripInfoMainElement} from "./view/trip-info-main.js";
import {createTripCostElement} from "./view/trip-cost.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/list-trip.js";
import {createElementTemplate} from "./view/trip.js";
import {createElementEditTemplate} from "./view/trip-edit.js";
import {createDetailsTripTemplate} from "./view/trip-details.js";
import {createDayTripTemplate} from "./view/day-trip.js";
import {generatePoint} from "./mock/point.js";

import {renderDate} from "../src/utils.js";

const POINT_COUNT = 3;
const headerElement = document.querySelector(`.page-header`);
const headerInfoElement = headerElement.querySelector(`.trip-main`);
const headerControlsElement = headerInfoElement.querySelector(`.trip-controls`);

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



// dates.forEach((date, index) => {
//   points.filter((point) => new Date(point.date.start).toDateString() === date).forEach((point) => {

//     // как в этом случае отрисовать точки маршрута, если эл-та trip-events__list еще нет

//   });

//   render(dayListElement, createDayTripTemplate(new Date(date), index + 1), `beforeend`);
// });


points.forEach((point) => {
  const dateEvent  = point.date.start; // дата события
  const dateTest2 = renderDate(point.date.start).split(`T`)[0]; // дата для поиска дня

  const dayElement1 = `time[datetime="${dateTest2}"]`;
  console.log('dateTest',dayElement1);
  const dayElement = document.querySelectorAll(dayElement1).length; //  эл-т дня

  console.log('dayElement',dayElement);
  console.log('dayElement.length',dayElement);

  if (dayElement === 0) {
    console.log('points', points);

    render(dayListElement, createDayTripTemplate(new Date(point.date.start), 1), `beforeend`);  // разметка дня

    const tripListElement = mainElement.querySelector(`.trip-events__list`);

     const dateConst = point.date.start;

     console.log('point.date.start', renderDate(dateConst).split(`T`)[0]);

    //  .getAttribute('datetime')
    //  console.log('test', renderDate(test).split(`T`)[0]);


        if (renderDate(dateConst).split(`T`)[0] === dateTest2) {
          render(tripListElement, createElementTemplate(point), `beforeend`);
        }

  } else {
  }

});

// // список точек маршрута
// const tripListElement = mainElement.querySelector(`.trip-events__list`);
// render(tripListElement, createElementEditTemplate(points[0]), `beforeend`);

// const tripEditElement = mainElement.querySelector(`.event--edit`);
// render(tripEditElement, createDetailsTripTemplate(points[0]), `beforeend`);

// for (let i = 1; i < POINT_COUNT; i++) {
//   render(tripListElement, createElementTemplate(points[i]), `beforeend`);
// }
