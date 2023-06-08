import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pwds from "./pwds-slice";

const store = configureStore({
  reducer: { pwds },
});

const rootReducer = combineReducers({ pwds });
export type IRootState = ReturnType<typeof rootReducer>;

export default store;
