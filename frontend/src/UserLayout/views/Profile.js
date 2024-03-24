import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fatchAuthUser } from '../../redux/features/userSlice';
import { server } from '../../server';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import { toast } from 'react-toastify'

import BorderColorIcon from '@mui/icons-material/BorderColor';
import './Profile.css'
import axios from 'axios';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const ariaLabel = { 'aria-label': 'description' };

const Profile = () => {
  const { authuser, data } = useSelector((store) => store?.authUser);
  const [updateStatus, setUpdateStatus] = useState(false)
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState(null);

  const [file, setFile] = useState('');



  const sendProfilePicBackend = async () => {


    const formData = new FormData();

    formData.append('userProfile', file);



    const res = await axios.post('/user/updateUserProfilePic', formData, {
      headers: {
        'Content-Type': 'mutipart/form-data'
      }

    })


    if (res.status === 201) {
      dispatch(fatchAuthUser());
      toast.success('Image updated successfully !!')



    }
    console.log(res, "profilepicupdate!!")






  }


  useEffect(() => {

    sendProfilePicBackend();


  }, [file])


  const fileUploader = useRef()
  const onUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value })
  }
  useEffect(() => {
    if (!authuser) {
      dispatch(fatchAuthUser());
    }
  }, [authuser, dispatch]);
  if (!authuser) {
    return null; // Return early if authuser is falsy
  }
  const { name, email, imagePath, phone, zipCode, address, dob } = data;
  const updateHandler = () => {
    setUpdateStatus(true);
  }

  const cancelHandler = () => {

    if (updateData) {
      setUpdateStatus(false)
      setUpdateData(null);
      toast.warn('Update Canceled !!')
      dispatch(fatchAuthUser());
    }
  }

  async function updateProfileApi() {
    if (updateStatus && updateData !== null) {
      try {
        const updateProfileRes = await axios.post('/user/updateUserProfile', { updateData });
        if (updateData) {
          toast.success("Profile update successfull..!!");
          dispatch(fatchAuthUser());
          setUpdateStatus(false)
        }
      } catch (error) {
        console.log(error, "error is here..!!")
      }
    }
  }


  const sendProfilePic = () => {

    console.log('call api!!')
  }


  const changeProfilePic = () => {
    fileUploader.current.click(); // Programmatically trigger click event on file input


  }





  return (
    <>
      <h2>Profile</h2>
      <hr />
      <Box className="profileSec" >
        <Box sx={{ flex: '0 0 15%' }}>


          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', width: 100, height: 100, borderRadius: 50, position: 'relative', border: '2px solid #282c34' }}>
            <Avatar
              alt="User image"
              src={`${server}uploads/${imagePath}`}
              sx={{ width: 100, height: 100 }}
              onClick={changeProfilePic}
            />
            <div className='updateImageIcon'               onClick={changeProfilePic}
>
              <AddPhotoAlternateIcon />
            </div>

          </Stack>

          <input type='file' id='file' onChange={(e) => setFile(e.target.files[0])} ref={fileUploader} style={{ display: 'none' }} />


        </Box>

        <Box className='profileRightSec' sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', }}>
          <div className='item-flex'>
            <label htmlFor="name"> Full Name:</label>
            <Input defaultValue={name.toUpperCase()} fullWidth id="name" sx={{ float: 'left' }} disabled={!updateStatus} name="name" onChange={onUpdate} />
            {updateStatus && (<span className='updateicon'>
              <BorderColorIcon />
            </span>)}
          </div>
          <div className='item-flex'>
            <label htmlFor="email">Email:</label>
            <Input defaultValue={email} fullWidth id="email" disabled />
          </div>
          <div className='item-flex'>
            <label htmlFor="phone"> Phone:</label>
            <Input fullWidth id="phone" defaultValue={phone} disabled={!updateStatus} type='text' name="phone" onChange={onUpdate} />
            {updateStatus && (<span className='updateicon'>
              <BorderColorIcon />
            </span>)}
          </div>
          <div className='item-flex'>
            <label htmlFor="dob"> Date of Birth:</label>
            <Input fullWidth id="dob" defaultValue={dob} type={updateStatus ? 'date' : 'text'} disabled={!updateStatus} name="dob" onChange={onUpdate} />
          </div>
          <div className='item-flex'>
            <label htmlFor="address"> Address:</label>
            <Input fullWidth id="address" defaultValue={address} disabled={!updateStatus} name="address" onChange={onUpdate} />
            {updateStatus && (<span className='updateicon'>
              <BorderColorIcon />
            </span>)}
          </div>
          <div className='item-flex'>
            <label htmlFor="zipCode"> Zip Code:</label>
            <Input fullWidth id="zipCode" defaultValue={zipCode} disabled={!updateStatus} name="zipCode" onChange={onUpdate} />
            {updateStatus && (<span className='updateicon'>
              <BorderColorIcon />
            </span>)}
          </div>

          <Box>
            <Button variant="outlined" sx={{ marginTop: '40px' }} onClick={updateHandler}>Update</Button>
            <Button variant="outlined" sx={{ marginTop: '40px', marginLeft: '10px' }} onClick={cancelHandler}>Cancel</Button>
            <Button variant="outlined" sx={{ marginTop: '40px', marginLeft: '10px' }} onClick={updateProfileApi}>Save</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
