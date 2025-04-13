import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {Chat, reducer as ChatReducer} from "./reducers/ChatSlice";
export interface state {
    chat:{
        messages_data:Array<Chat>
    }
}
const reducer = combineReducers({
    chat:ChatReducer,
})
const store = configureStore({
    reducer,
})
export default store