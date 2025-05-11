import { createSlice } from "@reduxjs/toolkit";
let initialState:state = {
    messages_data:[],
    chat_data:[],
    current_chat:[],
    field_name:"Помощник",
}
export interface Chat{
    created_at:string,
    id:number,
    messages:Array<Message>,
    study_field:number,
    title:string
}
export interface Message{
    message:string,
    role:string,
    chat?:number,
    created_at?:string,
    id?:number,
}
interface state{
    messages_data:Array<Message>,
    field_name:string,
    chat_data:Array<Chat>,
    current_chat:Array<Message>,
}
interface Action {
    payload:{
        message:string,
        role:string
    },
    type:{}
}
interface ActionChat {
    payload:Array<Chat>,
    type:{}
}
const ChatSlice = createSlice({
    name:"Chat",
    initialState,
    reducers:{
        AddMessage(state,{payload:action}:Action){
            state.messages_data.push({message:action.message, role:action.role})
        },
        SetFieldName(state,{payload:action}){
            state.field_name = action
        },
        AddChat(state,{payload}){
            state.messages_data = []
        },
        SetCurrentChat(state,{payload}){
            state.current_chat = payload 
        },
        PushMessage(state,{payload}){
            state.current_chat.push(payload)
        },
        SetChats(state,{payload:action}:ActionChat){
            state.chat_data = action

        }

    }
})

export  const {reducer,actions} = ChatSlice