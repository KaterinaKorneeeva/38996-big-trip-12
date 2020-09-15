import {isEventFutureExpiringToday, isEventPastExpiringToday} from "../utils/date-utils.js";

const eventToFilterMap = {
  everything: (events) => events.slice(),

  future: (events) => events
    .filter((event) => isEventFutureExpiringToday(event.date.start)),

  past: (events) => events
    .filter((event) => isEventPastExpiringToday(event.date.end)),
};

export const generateFilter = (events) => {
  return Object.entries(eventToFilterMap).map(([filterName, arrayEvents]) => {
    return {
      name: filterName,
      arr: arrayEvents(events),
    };
  });
};
