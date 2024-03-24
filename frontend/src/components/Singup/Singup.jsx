import React from 'react'
import { Container, Typography, CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRef } from 'react';


const Singup = () => {

    
    const formRef = useRef();
    const SubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { name, email, password, file } = Object.fromEntries(formData.entries());
        if (!name || !email || !password || file.name === '') {
            toast.warn("Please fill the all fields!");
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post('/user/register', formData, config).then((res) => {
            if (res.status === 201) {
                toast.success("Registeration successfull..!!");

                console.log(formRef,"heythere!!")
                formRef.current.reset();
            }
        }).catch((error) => {
            console.log("Error occured !!", error)
        })
    }


    console.log('redering registerdd page...')

    return (
        <>
            <Container component="main" maxWidth="xs">
                <div>
                    <Typography variant="h5" component="h1">
                        Sign Up
                    </Typography>

                    <form onSubmit={SubmitHandler} ref={formRef}>

                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            margin='normal'
                            name='name'
                            type='text'

                        />

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
                            type='password'

                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            margin='normal'
                            name='file'
                            type='file'
                        />
                        <Button variant="contained" type='submit' >Create a Account</Button>
                    </form>
                </div>

                
            </Container>
        </>

 
    )
}

export default Singup