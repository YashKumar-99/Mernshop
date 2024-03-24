import React, { useEffect, useState } from 'react';



import Cookies from 'js-cookie';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';

import { Container, Box, Grid } from '@mui/material';



const 
 SellerDashboard = () => {


  const History = useNavigate()

  console.log("hello........................!!!")




  const [IsAuth, setIsAuth] = useState(false);

  const accessTokenID = Cookies.get('accessTokenID');
  const refreshTokenID = Cookies.get('refreshTokenID');






  const checkAuthSeller = async () => {

    if (!refreshTokenID) {

      // <Navigate to='/login-shop' />
      History('/login-shop')

      setIsAuth(false);


    } else if (refreshTokenID && !accessTokenID) {

      await axios.get('/seller/refresh').then((res) =>
        console.log(res, "resfrom refresh")).catch((err) => console.log("err in refreshapi", err))


    } else if (refreshTokenID && accessTokenID) {


      // <Navigate to='/seller-dashboard' />
      History('/seller-dashboard')

      setIsAuth(true);


    }








  }
  useEffect(() => {

    checkAuthSeller();

  }, [IsAuth])



  return (


    <Container>
      <div>Dashboard or seller..</div>

      <Box>
        Hello world

      </Box>

    </Container>





  )
}

export default SellerDashboard