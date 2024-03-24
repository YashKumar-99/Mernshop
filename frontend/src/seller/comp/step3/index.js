import React from 'react'
import { Container, Typography, CssBaseline, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRef } from 'react';

import { useSelector } from 'react-redux';

const StepThird = () => {

  const { email, password } = useSelector((store) => store.sellerVerify)

  const formRef = useRef();
  const SubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, file, phone, address, zip } = Object.fromEntries(formData.entries());

    if (!name || !email || !password || !phone || !zip || !address || file.name === '') {
      toast.warn("Please fill the all fields!");
      return;
    }



    formData.append("email",email);
    formData.append("password",password);

    // console.log("res", name, email, phone, address, zip, password)
    // console.log("file", file)






    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/json'

      }
    }

    // console.log(formData,"formData")


    axios.post('/seller/createSeller', formData, config).then((res) => {
      if (res.status === 201) {
        toast.success("Registeration successfull..!!");
        formRef.current.reset();
      }
    }).catch((error) => {
      console.log("Error occured !!", error)
    })
  }



  return (
    <>
      <Container component="main" maxWidth="md" >
        <div>
          <Typography variant="h5" component="h1">
            Create shop
          </Typography>

          <form onSubmit={SubmitHandler} ref={formRef}>
            <Grid container rowSpacing={2}>



              <Grid xs={6}>



                <TextField
                  label="Shop Name"
                  variant="outlined"
                  fullWidth
                  margin='normal'
                  name='name'
                  type='text'

                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  margin='normal'
                  name='phone'
                  type='text'

                />


                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin='normal'
                  name='address'
                  type='text'

                />

              </Grid>

              <Grid xs={6}>


                <TextField
                  label="Zip code"
                  variant="outlined"
                  fullWidth
                  margin='normal'
                  name='zip'
                  type='text'

                />

                <TextField
                  variant="outlined"
                  fullWidth
                  margin='normal'
                  name='file'
                  type='file'
                />

              </Grid>

            </Grid>


            <Button variant="contained" type='submit' >Create a Account </Button>
          </form>
        </div>


      </Container>
    </>


  )
}

export default StepThird