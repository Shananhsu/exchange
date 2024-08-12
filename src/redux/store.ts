import { configureStore } from "@reduxjs/toolkit";
import commodityApi from "../redux/commoditySlice";
import balanceApi from "../redux/balanceSlice";
import chipApi from "../redux/chipSlice";
import socketReducer from "../redux/socketSlice";
import dealReducer from "../redux/dealSlice";
import tokenReducer from "./tokenSlice";

const store = configureStore({
    reducer: {
        [commodityApi.reducerPath]: commodityApi.reducer,
        [balanceApi.reducerPath]: balanceApi.reducer,
        [chipApi.reducerPath]: chipApi.reducer,
        socket: socketReducer,
        deal: dealReducer,
        token: tokenReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(commodityApi.middleware)
            .concat(balanceApi.middleware)
            .concat(chipApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
