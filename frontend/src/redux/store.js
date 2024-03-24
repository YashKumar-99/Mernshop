import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../redux/features/userSlice'
import sellerVerify from '../redux/features/sellerverfication'
import SellAuthReducer from '../redux/features/sellerAuth'

import ChatReducer from '../redux/features/chatFeature'

const store =  configureStore({


    reducer: {
        authUser: authReducer,
        sellerVerify:sellerVerify,
        sellerAuth:SellAuthReducer,
        chat:ChatReducer

    }

})


export default store;

