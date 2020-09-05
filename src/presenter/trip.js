// import TripInfoView from "./view/trip-info.js";
import SortView from "../view/sort.js";
import ListTripView from "../view/list-trip.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import DayTripView from "../view/day-trip.js";
import {isEscEvent} from "../utils/common.js";
import {render, replace} from "../utils/dom-utils.js";


export default class Trip {
  constructor(tripContainer) {
    this._boardContainer = tripContainer;
    this._listTripComponent = new ListTripView();
    this._sortComponent = new SortView();
  }


  init(events) {
    this._events = events;
    this._renderBoard();
  }

  _renderEvent(eventListElement, event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceCardToForm();
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, isEscEvent);
    });

    render(eventListElement, eventComponent.getElement());
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

  _renderBoard() {
    render(this._boardContainer, this._sortComponent.getElement());
    render(this._boardContainer, this._listTripComponent.getElement());

    this._renderEvents(this._events);
  }
}
