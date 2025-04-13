import { createSlice } from "@reduxjs/toolkit";
let initialState:state = {
    messages_data:[]
}
export interface Chat{
    describe:string,
    role:string
}
interface state{
    messages_data:Array<Chat>
}
interface Action {
    payload:{
        desc:string,
        role:string
    },
    type:{}
}
const ChatSlice = createSlice({
    name:"Chat",
    initialState,
    reducers:{
        AddMessage(state,{payload:action}:Action){
            state.messages_data.push({describe:action.desc, role:action.role})
        }

    }
})

export  const {reducer,actions} = ChatSlice