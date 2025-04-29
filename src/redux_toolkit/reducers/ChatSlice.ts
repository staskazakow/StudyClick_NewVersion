import { createSlice } from "@reduxjs/toolkit";
let initialState:state = {
    messages_data:[],
    field_name:"Помощник",
}
export interface Chat{
    describe:string,
    role:string
}
interface state{
    messages_data:Array<Chat>,
    field_name:string
}
interface Action {
    payload:{
        describe:string,
        role:string
    },
    type:{}
}
const ChatSlice = createSlice({
    name:"Chat",
    initialState,
    reducers:{
        AddMessage(state,{payload:action}:Action){
            state.messages_data.push({describe:action.describe, role:action.role})
        },
        SetFieldName(state,{payload:action}){
            state.field_name = action
        },
        AddChat(state,{payload}){
            state.messages_data = []
        }

    }
})

export  const {reducer,actions} = ChatSlice