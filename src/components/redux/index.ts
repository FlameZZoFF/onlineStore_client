import { configureStore } from "@reduxjs/toolkit";
import { serverApi } from "./api/server.api";
import authSlice from "./slices/authSlice";
import typesSlice from "./slices/typesSlice";
import userSlice from "./slices/userSlice";


export const store = configureStore({
    reducer:{
       [serverApi.reducerPath]:serverApi.reducer,
       user:userSlice,
       auth:authSlice,
       type:typesSlice,
    },
    middleware: getDefMiddleWare => getDefMiddleWare().concat(serverApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 