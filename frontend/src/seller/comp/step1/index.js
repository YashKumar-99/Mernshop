import React, { useState } from 'react'
import { Container, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
// import { useRef } from 'react';

// import { Navigate } from 'react-router-dom';
// import StepSecond from '../step2';



import { sendOtp } from '../../../redux/features/sellerverfication';

import { useDispatch, useSelector } from 'react-redux';
const StepFirst = () => {



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');




    const dispatch = useDispatch();


    const SubmitHandler = async (e) => {
        e.preventDefault();

        console.log("heythis");

        console.log(email, password, "result is");



        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        if (!email || !password) {
            alert('Please fill all details');


        } else {

            await axios.post('/seller/sendotp', {
                email,
                password
            }, config).then((res) => {

                const { email, fullhash } = res.data;


                dispatch(sendOtp({ email, fullhash,password }))
                // console.log(res)

            }



            ).catch((err) => console.log(err))


        }







    }


    return (
        <>
            <Container component="main" maxWidth="md" >
                <div>
                    <Typography variant="h5" component="h1">
                        Create shop
                    </Typography>

                    <form onSubmit={SubmitHandler} >
                        <Grid container rowSpacing={2}>

                            <TextField
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                name='email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                            <TextField

                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                name='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />



                        </Grid>


                        <Button variant="contained" type='submit' >Create a Account </Button>
                    </form>
                </div>


            </Container>


        </>
    )
}
export default StepFirst