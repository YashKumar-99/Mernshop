import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fatchAuthUser } from '../../redux/features/userSlice';
import { server } from '../../server';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './Profile.css'

const Profile = () => {
  const { authuser, data } = useSelector((store) => store?.authUser);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!authuser) {
      console.log("Fetching auth user data...");
      dispatch(fatchAuthUser());
    }
  }, [authuser, dispatch]);



  if (!authuser) {
    return null; // Return early if authuser is falsy
  }
  const { name, email, imagePath } = data;

  console.log(data,"profiledata")

  return (
    <>
      <Box >
        <Stack direction="row" spacing={2}>
          <Avatar
            alt="Remy Sharp"
            src={`${server}uploads/${imagePath}`}
            sx={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </Stack>
        <p>{name}</p>
        <p>{email}</p>
      </Box>
    </>
  );
};

export default Profile;
