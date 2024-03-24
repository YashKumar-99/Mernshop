import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

import Header from './Header';

import { Box, Item } from '@mui/material';


import { useEffect, useState } from 'react';



import Cookies from 'js-cookie';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';

import { notRefershToken } from '../redux/features/sellerAuth';
import { fetchAuthSeller } from '../redux/features/sellerAuth';
import { accAndref } from '../redux/features/sellerAuth';

import { useSelector, useDispatch } from 'react-redux';


const FullLayout = () => {










    const dispatch = useDispatch();


    const History = useNavigate()


    const { auth } = useSelector((store) => store.sellerAuth)



    const accessTokenID = Cookies.get('accessTokenID');
    const refreshTokenID = Cookies.get('refreshTokenID');


    if (!accessTokenID) {

        dispatch(notRefershToken());

    }


    const [IsAuth, setIsAuth] = useState(accessTokenID);

    console.log(IsAuth, "IsAuth...!!")



    const checkAuthSeller = async () => {

        if (!refreshTokenID) {
            console.log("step1")

            // <Navigate to='/login-shop' />
            dispatch(notRefershToken())
            History('/login-shop');

            // setIsAuth(false);


        } else if (refreshTokenID && !accessTokenID) {
            console.log("step2")

            dispatch(fetchAuthSeller());

            // await axios.get('/seller/refresh').then((res) => {

            //     // Cookies.set('accessTokenID', true)

            //     // setIsAuth(true)
            //     setIsAuth(true);

            //     console.log(res, "resfrom refresh")

            // }



            // ).catch((err) => console.log("err in refreshapi", err))


        } else if (refreshTokenID && accessTokenID) {
            console.log("step3")


            // <Navigate to='/seller-dashboard' />
            // History('/seller-dashboard')

            // setIsAuth(true);
            // setIsAuth(true);


            dispatch(accAndref());


        }








    }





    console.log(auth, "auth is here..")

    useEffect(() => {


        // if(auth === false){
        //     console.log('calleed useEffect!!')
        //     checkAuthSeller();
        // }

        checkAuthSeller();



    }, [auth])






    return (
        <>

            {/* <div>FullLayout</div> */}

            <Header />
            <hr />

            <div>
                <Box
                    sx={{ display: 'flex' }}

                >
                    <div style={{ border: '1px solid red' }}>
                        <Sidebar />

                    </div>
                    <div style={{ flexGrow: 1, border: '1px solid green' }}><Outlet />
                    </div>
                </Box>


            </div>


        </>
    )
}

export default FullLayout