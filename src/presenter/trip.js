
import SortView from "../view/sort.js";
import ListTripView from "../view/list-trip.js";
import EventPresenter from "./event.js";
import DayTripView from "../view/day-trip.js";
// import {updateItem} from "../utils/common.js";
import {render} from "../utils/dom-utils.js";
import {UpdateType, UserAction} from "../const.js";


export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._boardContainer = tripContainer;
    this._listTripComponent = new ListTripView();
    this._sortComponent = new SortView();
    this._eventPresenter = {};

    // this._sortComponent = null;
    // this._loadMoreButtonComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    // this._handleEventChange = this._handleEventChange.bind(this);

    // метод для сброса представлений
    this._handleModeChange = this._handleModeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);


  }


  // init(events) {
  //   this._events = events.slice();
  //   // 1. В отличии от сортировки по любому параметру,
  //   // исходный порядок можно сохранить только одним способом -
  //   // сохранив исходный массив:

  //   this._sourcedBoardEvents = events.slice();
  //   this._renderBoard();
  // }

  init() {
    // this._events = events.slice();
    // // 1. В отличии от сортировки по любому параметру,
    // // исходный порядок можно сохранить только одним способом -
    // // сохранив исходный массив:

    // this._sourcedBoardEvents = events.slice();
    this._renderBoard();
  }

  _getEvents() {
    return this._eventsModel.getEvents();
  }

  // ф-ия обновления моков, только один эл-т массива (один event)
  // _handleEventChange(updatedEvent) {
  //   // this._events = updateItem(this._getEvents(), updatedEvent);
  //   // console.log('this._events',this._events);
  //   // // обновит
  //   // this._sourcedBoardTasks = updateItem(this._sourcedBoardEvents, updatedEvent);
  //   // // вызовет init заново уже у сущ eventPresenter с новыми данными
  //   // this._eventPresenter[updatedEvent.id].init(updatedEvent);

  //   // Здесь будем вызывать обновление модели
  //   this._eventPresenter[updateItem.id].init(updatedEvent);
  // }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._eventsModel.updateEvents(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._eventsModel.addEvents(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // для каждого event свой presenter
  _renderEvent(eventListElement, event) {
    const eventPresenter = new EventPresenter(eventListElement, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents(events) {
    const sortEvents = () => {
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
    // _getEvents
    const sortedEvents = sortEvents(events);

    let dayNumber = 1;
    let dayElement = null;
    let dayDate = null;

    for (let event of sortedEvents) {
      if (event.date.start.getDate() === dayDate) {
        // this._renderEvent(dayElement.getEventsList(), event);

        this._renderEvent(dayElement.getEventsList(), event);
      } else {
        // 1. dayDate == null
        // 2. event.date.start.getDate() != dayDate
        dayDate = event.date.start.getDate();
        // render day
        dayElement = new DayTripView(event.date.start, dayNumber++);
        // render(tripDaysElement, dayTemplate.getElement());
        render(this._listTripComponent, dayElement.getElement());
        // render day event
        this._renderEvent(dayElement.getEventsList(), event);
      }
    }
  }

  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    // this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  _renderBoard() {
    render(this._boardContainer, this._sortComponent.getElement());
    render(this._boardContainer, this._listTripComponent.getElement());

    // this._renderEvents(this._events);
    this._renderEvents(this._getEvents());
  }
}
