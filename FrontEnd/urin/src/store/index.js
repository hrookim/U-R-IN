import { combineReducers, configureStore } from "@reduxjs/toolkit/";

import studyReducer from "./studySlice";
import studyListReducer from "./studyListSlice";
import inquiryReducer from "./inquirySlice";
import feedReducer from "./feedSlice";
import memberReducer from "./memberSlice";
import checkValidationReducer from "./checkValidationSlice";

const rootReducer = combineReducers({
  validation: checkValidationReducer,
  member: memberReducer,
  study: studyReducer,
  studies: studyListReducer,
  inquiry: inquiryReducer,
  feed: feedReducer,
});

export default configureStore({
  reducer: rootReducer,
});
