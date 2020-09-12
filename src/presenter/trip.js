
import SortView from "../view/sort.js";
import ListTripView from "../view/list-trip.js";
import EventPresenter from "./event.js";
import DayTripView from "../view/day-trip.js";
import {updateItem} from "../utils/common.js";
import {render} from "../utils/dom-utils.js";


export default class Trip {
  constructor(tripContainer) {
    this._boardContainer = tripContainer;
    this._listTripComponent = new ListTripView();
    this._sortComponent = new SortView();
    this._eventPresenter = {};

    this._handleEventChange = this._handleEventChange.bind(this);

    // метод для сброса представлений
    this._handleModeChange = this._handleModeChange.bind(this);


  }


  init(events) {
    this._events = events.slice();
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:

    this._sourcedBoardEvents = events.slice();
    this._renderBoard();
  }

  // ф-ия обновления моков, только один эл-т массива (один event)
  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    // обновит
    this._sourcedBoardTasks = updateItem(this._sourcedBoardEvents, updatedEvent);
    // вызовет init заново уже у сущ eventPresenter с новыми данными
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // для каждого event свой presenter
  _renderEvent(eventListElement, event) {
    const eventPresenter = new EventPresenter(eventListElement, this._handleEventChange, this._handleModeChange);
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

    this._renderEvents(this._events);
  }
}
