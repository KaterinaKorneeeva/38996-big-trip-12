
import SortView from "../view/sort.js";
import ListTripView from "../view/list-trip.js";
import EventPresenter from "./event.js";
import DayTripView from "../view/day-trip.js";
import {isEscEvent, updateItem} from "../utils/common.js";
import {render, replace} from "../utils/dom-utils.js";


export default class Trip {
  constructor(tripContainer) {
    this._boardContainer = tripContainer;
    this._listTripComponent = new ListTripView();
    this._sortComponent = new SortView();
    this._eventPresenter = {};

    this._handleEventChange = this._handleEventChange.bind(this);


  }


  init(events) {
    this._events = events.slice();
    console.log('this._events', this._events);
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:

    this._sourcedBoardEvents = events.slice();
    console.log('this._sourcedBoardTasks ', this._sourcedBoardEvents);
    this._renderBoard();
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._sourcedBoardTasks = updateItem(this._sourcedBoardEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  // для каждого event вой presenter
  _renderEvent(eventListElement, event) {
    const eventPresenter = new EventPresenter(eventListElement);
    // const eventPresenter = new EventPresenter(eventListElement, this._handleEventChange, this._handleModeChange);
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
