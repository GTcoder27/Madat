import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";    
import { axiosInstance } from "../../lib/axios";


export const checkAuth = createAsyncThunk("checkAuth",async ()=>{
    try{
        const res = await axiosInstance.get("/auth/check");
        return res.data;
    } catch(e){
        console.log("error",e);
    }
});

export const login = createAsyncThunk("login",async (data)=>{
    try{
        const res = await axiosInstance.post("/auth/login",data);
        return res.data;
    } catch(e){
        console.log("error",e);
    }
});

export const signup = createAsyncThunk("signup",async (data)=>{
    try{
        const res = await axiosInstance.post("/auth/signup",data);
        return res.data;
    } catch(e){
        console.log("error",e);
    }
});

export const logout = createAsyncThunk("logout",async ()=>{
    try{
        const res = await axiosInstance.post("/auth/logout");
        return null;
    } catch(e){
        console.log("error",e);
    }
});




const authSlice = createSlice({
    name: "auth",
    initialState:{
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isCheckingAuth: false,        
        isLoggingOut: false,        
    },
    reducers:{},
    extraReducers:(builder)=>{

        // checkAuth
        builder.addCase(checkAuth.pending, (state) => {
            state.isCheckingAuth = true;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isCheckingAuth = false;
        });
        builder.addCase(checkAuth.rejected, (state) => {
            state.authUser = null;
            state.isCheckingAuth = false;
        });

        // login
        builder.addCase(login.pending, (state) => {
            state.isLoggingIn = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isLoggingIn = false;
        });
        builder.addCase(login.rejected, (state) => {
            state.authUser = null;
            state.isLoggingIn = false;
        });

        // signup
        builder.addCase(signup.pending, (state) => {
            state.isSigningUp = true;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isSigningUp = false;
        });
        builder.addCase(signup.rejected, (state) => {
            state.authUser = null;
            state.isSigningUp = false;
        });
        
        // logout
        builder.addCase(logout.pending, (state) => {
            state.isLoggingOut = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isLoggingOut = false;
        });
        builder.addCase(logout.rejected, (state) => {
            state.authUser = null;
            state.isLoggingOut = false;
        });
    } 
})


export default authSlice.reducer; 


