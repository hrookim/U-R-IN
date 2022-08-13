import { combineReducers, configureStore } from "@reduxjs/toolkit/";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import studyReducer from "./studySlice";
import studyListReducer from "./studyListSlice";
import inquiryReducer from "./inquirySlice";
import feedReducer from "./feedSlice";
import memberReducer from "./memberSlice";
import checkValidationReducer from "./checkValidationSlice";
import myPageReducer from "./myPageSlice";

const rootReducer = combineReducers({
  validation: checkValidationReducer,
  member: memberReducer,
  study: studyReducer,
  studies: studyListReducer,
  inquiry: inquiryReducer,
  feed: feedReducer,
  mypage: myPageReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["study", "member"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
