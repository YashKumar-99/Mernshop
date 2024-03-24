import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

import Header from './Header';

import { Box, Item } from '@mui/material';


import { useEffect, useState } from 'react';



import Cookies from 'js-cookie';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';



const FullLayout = () => {



    const History = useNavigate()

    console.log("hello........................!!!")





    const accessTokenID = Cookies.get('accessTokenID');
    const refreshTokenID = Cookies.get('refreshTokenID');

    const [IsAuth, setIsAuth] = useState(accessTokenID);

    console.log(IsAuth, "IsAuth...!!")



    const checkAuthSeller = async () => {

        if (!refreshTokenID) {

            // <Navigate to='/login-shop' />
            History('/login-shop')

            setIsAuth(false);


        } else if (refreshTokenID && !accessTokenID) {

            await axios.get('/seller/refresh').then((res) => {

                // Cookies.set('accessTokenID', true)

                // setIsAuth(true)
                setIsAuth(true);

                console.log(res, "resfrom refresh")

            }



            ).catch((err) => console.log("err in refreshapi", err))


        } else if (refreshTokenID && accessTokenID) {


            // <Navigate to='/seller-dashboard' />
            // History('/seller-dashboard')

            // setIsAuth(true);
            setIsAuth(true);



        }








    }






    useEffect(() => {



        console.log('calleed useEffect!!')
        checkAuthSeller();

    }, [IsAuth])






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