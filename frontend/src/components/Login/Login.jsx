import React from 'react'
import { Container, Typography, CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';





import { useLocation } from 'react-router-dom';





const Login = () => {
    const location = useLocation();

    let callpath = '/user/login';

    if (location.pathname === '/login-shop') {

        callpath = '/seller/login'
    }

    console.log(location, "params")

    const [userObj, setUserObj] = useState('')
    const formRef = useRef();
    const SubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { email, password, } = Object.fromEntries(formData.entries());
        if (!email || !password) {
            toast.warn("Please fill the all fields!");
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }




        axios.post(callpath, formData, config).then((res) => {
            if (res.status === 201) {
                toast.success("Login successfull..!!");
                console.log(res, "res");
                setUserObj(res.data.user);


                formRef.current.reset();
            }
        }).catch((error) => {
            console.log("Error occured !!", error)
        })
    }















    console.log('redering Login page...');


    return (
        <>
            <Container component="main" maxWidth="xs">
                <div>
                    <Typography variant="h5" component="h1">
                        <h1>Login </h1>
                    </Typography>

                    <form onSubmit={SubmitHandler} ref={formRef}>
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            margin='normal'
                            name='email'
                            type='email'
                        />
                        <TextField

                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin='normal'
                            name='password'
                            type='text'

                        />
                        <Button variant="contained" type='submit' >Login to Account</Button>
                    </form>
                </div>
            </Container>

            {userObj && (<p>{userObj.email}</p>)}
        </>


    )
}

export default Login