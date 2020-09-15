import {FilterType} from "../const";
import {isEventFutureExpiringToday, isEventPastExpiringToday} from "./date-utils.js";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.slice(),

  [FilterType.FUTURE]: (events) => events
    .filter((event) => isEventFutureExpiringToday(event.dateFrom)),

  [FilterType.PAST]: (events) => events
    .filter((event) => isEventPastExpiringToday(event.dateTo)),
};
