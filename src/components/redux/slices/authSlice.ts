import { createSlice,PayloadAction } from "@reduxjs/toolkit";


type auth = {
    auth:boolean,
}

const initialState:auth = {
    auth:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth(state,action:PayloadAction<boolean>){
         state.auth = action.payload
        }
    }
})


export const{setAuth} = authSlice.actions

export default authSlice.reducer