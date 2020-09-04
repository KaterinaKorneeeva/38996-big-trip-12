// import BoardView from "../view/board.js";
// import SortView from "../view/sort.js";
// import TaskListView from "../view/task-list.js";
// import NoTaskView from "../view/no-task.js";
// import TaskView from "../view/task.js";
// import TaskEditView from "../view/task-edit.js";
// import LoadMoreButtonView from "../view/load-more-button.js";
// import {render, RenderPosition} from "../utils/render.js";


import TripInfoView from "./view/trip-info.js";
import SortView from "./view/sort.js";
import ListTripView from "./view/list-trip.js";
import EventView from "./view/event.js";
import EventEditView from "./view/event-edit.js";
import DayTripView from "./view/day-trip.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._listTripComponent = new ListTripView();
    this._sortComponent = new SortView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }


  // _renderTask() {
  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderTasks() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoTasks() {
    // Метод для рендеринга заглушки
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
  }

  // _renderListTrip() {
  //   // список задач
  // }
  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
