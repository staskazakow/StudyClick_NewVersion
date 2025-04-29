import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    auth:false
}
const AppSlice = createSlice({
    initialState:initialState,
    name:"app",
    reducers:{
        setAuth(state,{payload}){
            state.auth = payload
        }
    }
})
export const {actions,reducer} = AppSlice