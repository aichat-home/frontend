import { configureStore } from "@reduxjs/toolkit";
import initReducer from "../providers/UserProvider/store/userSlice";
import { userApi } from "../providers/UserProvider/store";
import { farmApi } from "../../pages/ui/AirdropPage/store";
import { tasksApi } from "../../widgets/ui/Tasks/store/tasksApi";
import airDropSlice from "../../pages/ui/AirdropPage/store/slices";
import { leaderboardApi } from "../../pages/ui/LeaderboardPage/store";
import { referralsApi } from "../../pages/ui/ReferalsPage/store";
import { checkRefApi } from "../../pages/ui/InviteBonusPage/store";

export const store = configureStore({
  reducer: {
    userInit: initReducer,
    airDrop: airDropSlice,
    [userApi.reducerPath]: userApi.reducer,
    [farmApi.reducerPath]: farmApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
    [referralsApi.reducerPath]: referralsApi.reducer,
    [checkRefApi.reducerPath]: checkRefApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      farmApi.middleware,
      tasksApi.middleware,
      leaderboardApi.middleware,
      referralsApi.middleware,
      checkRefApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
