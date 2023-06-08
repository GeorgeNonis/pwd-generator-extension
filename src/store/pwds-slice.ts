import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./interfaces";

const initialState: InitialState = {
  component: "generator",
  history: false,
  pwds: [],
};

const pwds = createSlice({
  name: "pwds",
  initialState,
  reducers: {
    changeCompo(state, { payload }) {
      const { comp } = payload;
      state.component = comp;
    },
    historyHandler(state, { payload }) {
      const { history } = payload;
      state.history = history;
    },
    setPasswords(state, { payload }) {
      const { pwds } = payload;
      state.pwds = pwds;
    },
    historyPush(state, { payload }) {
      const { pwd } = payload;
      state.pwds.push(pwd);
    },
    clearHistorry(state) {
      state.pwds = [];
    },
  },
});

export const {
  changeCompo,
  historyHandler,
  setPasswords,
  historyPush,
  clearHistorry,
} = pwds.actions;

export default pwds.reducer;
