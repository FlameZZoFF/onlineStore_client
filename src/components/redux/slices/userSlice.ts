import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";

type User = {
    User:IUser,
    userToken:string,
}

const initialState:User = {
    User:{email:'',id:0,role:'',exp:0,iat:0},
    userToken:''
}

const userSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        setUser(state,action){
         state.User = action.payload
        },
        setToken(state,action){
            state.userToken = action.payload
        }
        
    }
})

export const {setUser,setToken} = userSlice.actions

export default userSlice.reducer