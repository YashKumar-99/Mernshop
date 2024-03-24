import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    auth: false
}




export const fetchAuthSeller = createAsyncThunk(

    "action/sellerAuthent",
    async (thunkAPI) => {

        const result = await axios.get('/seller/refresh');

        return result.data;
    }
)



// export const fetchAuthSeller = createAsyncThunk(
//     "action/sellerAuthent",

//     async (thunkAPI) => {
//         const result = await axios.get("/seller/refresh");
//         // console.log(result, "dataisapi");

//         return result.data;

//     }
// );

const sellerAuthSlice = createSlice({

    name: 'sellerAuth',
    initialState,
    reducers: {


        notRefershToken: (state) => {

            state.auth = false;



        },
        accAndref: (state) => {
            state.auth = true;

        }


        // authapi: () => {


        // }



    },
    extraReducers: (builder) => {

        builder.addCase(fetchAuthSeller.fulfilled, (state) => {

            // console.log("heythis.........................!!")
            state.auth = true;

        })




    }




})

export const { notRefershToken,accAndref } = sellerAuthSlice.actions;

export default sellerAuthSlice.reducer; 