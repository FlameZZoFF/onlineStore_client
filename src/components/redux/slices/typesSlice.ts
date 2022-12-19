import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type type = {
    type:number
}

const initialState:type = {
    type:0
}

const typeSlice = createSlice({
    name:"type",
    initialState,
    reducers:{
        setType(state,action:PayloadAction<number>){
         state.type = action.payload
        }
    }
})


export const{setType} = typeSlice.actions

export default typeSlice.reducer