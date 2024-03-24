
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    email: '',
    fullhash: '',
    password: ''
}


const sellerVerficationSlice = createSlice({
    name: 'sellerVerify',
    initialState,
    reducers: {

        sendOtp: (state, action) => {
            const { email, fullhash,password} = action.payload;

            state.email = email;
            state.fullhash = fullhash;
            state.password=password;



        }

    }

})



export const { sendOtp } = sellerVerficationSlice.actions;


export default sellerVerficationSlice.reducer;
