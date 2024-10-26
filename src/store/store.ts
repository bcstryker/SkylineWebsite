import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

// Properly type the dispatch to work with Thunks
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
