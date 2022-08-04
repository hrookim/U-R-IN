import { combineReducers, configureStore } from "@reduxjs/toolkit/";

import studyReducer from "./studySlice";
import studyListReducer from "./studyListSlice";
import inquiryReducer from "./inquirySlice";
import feedReducer from "./feedSlice";

const rootReducer = combineReducers({
  study: studyReducer,
  studies: studyListReducer,
  inquiry: inquiryReducer,
  feed: feedReducer,
});

export default configureStore({
  reducer: rootReducer,
});
