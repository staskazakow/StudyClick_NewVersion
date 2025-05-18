import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {Chat, reducer as ChatReducer, Message} from "./reducers/ChatSlice";
import { authApi } from "./api/authApi";
import { reducer as AppReducer } from "./reducers/AppSlice";
import { fieldsApi } from "./api/fieldsAli";
import { chatApi } from "./api/chatsApi";
import { yoKassaApi } from "./api/yookassaApi";
export interface state {
    chat:{
        messages_data:Array<Message>,
            field_name:string,
            chat_data:Array<Chat>,
            current_chat:Array<Message>,
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
    [yoKassaApi.reducerPath]:yoKassaApi.reducer,
})
const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(fieldsApi.middleware).concat(chatApi.middleware).concat(yoKassaApi.middleware),
})
export default store