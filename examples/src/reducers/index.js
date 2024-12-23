import { combineReducers } from "redux-like-core";
import counterReducer from "./counterReducer";
import itemsReducer from "./itemsReducer";

const createNewPast = (state, action) => {
  return {
    count: state.count,
    items: state.items,
    action: action.type,
    timestamp: Date.now(),
  };
};

const createPastObject = (pastObject, newInstance) => {
  return {
    ...pastObject,
    [newInstance.timestamp]: newInstance,
  };
};

const getActionFromPast = (past, target) => {
  const _past = { ...past };
  if (!target) {
    // get the last one
    const keys = Object.keys(_past).sort((a, b) => b - a);
    target = keys[0];
  }
  const action = _past[target];
  return action;
};

const undoAble = (reducer) => {
  const initialState = {
    past: {},
    present: { count: 0, items: [] },
    log: [],
    view: "present",
  };
  return (state = initialState, action) => {
    if (!action.type) return state;
    const { past, log } = state;
    let present = state.present;

    if (action.type === "TRAVEL") {
      let timestamp;
      if (action.hasOwnProperty("timestamp")) {
        timestamp = action.timestamp;
      } else {
        return state;
      }
      const newInstance = createNewPast(present, { type: "TRAVEL" });
      const newPast = createPastObject(past, newInstance);
      const newPresent = getActionFromPast(past, timestamp);
      return { ...state, past: newPast, present: newPresent, view: "past" };
    }
    if (action.type === "RETURN") {
      const lastPast = getActionFromPast(past);
      const newPresent = state.view === "present" ? present : lastPast;
      console.log({ past, lastPast, view: state.view });
      return { ...state, present: newPresent, view: "present" };
    }
    // revert to the actual present if there were traveling.
    if (state.view === "past") {
      present = getActionFromPast(past);
    }
    const newPresent = reducer(present, action);
    if (present === newPresent) {
      return state;
    }
    const newInstance = createNewPast(present, action);
    const newPast = createPastObject(past, newInstance);
    const newLog = [
      ...state.log,
      {
        action: action.type,
        timestamp: newInstance.timestamp,
      },
    ];

    return {
      past: newPast,
      present: { ...newPresent, timestamp: newInstance.timestamp },
      log: newLog,
      view: "present",
    };
  };
};

const rootReducer = undoAble(
  combineReducers({
    count: counterReducer,
    items: itemsReducer,
  })
);

export default rootReducer;
