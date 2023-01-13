import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import eventReducer from "./events";
import groupReducer from "./groups";
import membersReducer from "./members";
import sessionReducer from "./session";
import attendancesReducer from "./attendances";


const rootReducer = combineReducers({
  session: sessionReducer,
  group: groupReducer,
  event: eventReducer,
  members: membersReducer,
  attendance: attendancesReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
