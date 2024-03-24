import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
    authuser: false,
   
};

export const fatchAuthUser = createAsyncThunk(
    "action/auth",

    async (thunkAPI) => {
        const result = await axios.get("/user/authentication");
        // console.log(result, "dataisapi");

        return result.data;

    }
);

// console.log(fatchAuthUser, "featchauth");
const UserAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        // getAuthStatus: (state) => {
        //     state.authuser = true;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fatchAuthUser.pending, (state) => {
            return {
                ...state,
                authuser: false,
                pending: true
            };
        });
        builder.addCase(fatchAuthUser.fulfilled, (state, action) => {
            const { auth } = action.payload;

            return {
                ...state,
                authuser: auth,
                pending: false,
                data: action.payload.verifyUserByDb
            };
        });
        builder.addCase(fatchAuthUser.rejected, (state, action) => {

            return {
                ...state,
                pending: false,
                authuser: false
            };
        });
    },

});

export const { getAuthStatus } = UserAuthSlice.actions;

export default UserAuthSlice.reducer;
