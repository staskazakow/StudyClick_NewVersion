import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {Chat, reducer as ChatReducer} from "./reducers/ChatSlice";
import { authApi, User } from "./api/authApi";
import { reducer as AppReducer } from "./reducers/AppSlice";
import { fieldsApi } from "./api/fieldsAli";
export interface state {
    chat:{
        messages_data:Array<Chat>,
        field_name:string
    },
    app:{
        auth:boolean
    },
}
const reducer = combineReducers({
    chat:ChatReducer,
    app:AppReducer,
    [authApi.reducerPath]:authApi.reducer,
    [fieldsApi.reducerPath]:fieldsApi.reducer,
})
const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(fieldsApi.middleware),
})
export default store