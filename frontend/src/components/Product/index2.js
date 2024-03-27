import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../../routes/Routes';
import { Container, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import { server } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


import { useNavigate } from 'react-router-dom';
const Dashboard = () => {



    const navigate = useNavigate();

    const authUser = useSelector((store) => store?.authUser);

    const userId = useSelector((store) => store?.authUser?.data?._id);


    const [converationUsers, setConverationUser] = useState(null);



    const [Products, setProducts] = useState(null)



    const getAllProducts = async () => {


        try {

            const res = await axios.get('/v1/api/products');
            console.log(res.data, "result....111")

            setProducts(res.data)


        } catch (error) {


            console.log(error, "Error has occured!!")
        }
        console.log(Products, "Products...!!")




    }

    useEffect(() => {

        getAllProducts();
    }, [])





    async function getSellerinfo(obj) {

       const {foundSellerId,groupTitle}=obj;

        const conversationRes = await axios.get(`/convertion/conversationwihtsellers/${userId}`);
        setConverationUser(conversationRes.data.conversation);

        console.log(conversationRes, "testing is here..!!");

        conversationDetails(groupTitle)
        console.log(foundSellerId, "foundSellerIdfoundSellerId")


    }





    function conversationDetails(groupTitle) {

        console.log("conversationDetails")
        converationUsers?.map((item) => {


            console.log("enterenterenter!!", item._id, groupTitle)
            if (item.groupTitle === groupTitle) {
                console.log("enterenterenterinside!!",item)

                const { userimage, username, groupTitle } = item;



                navigate(`/converstion?${groupTitle}`, {
                    state: {
                        username
                        , groupTitle, userimage
                    }
                });
            }
        })
    }




    // useEffect(() => {
    //     converationUsers?.map((item) => {


    //         // console.log("enterenterenter!!", item._id, foundSellerId)

    //         console.log(item._id, "itemid..")
    //         if (item.groupTitle === groupTitle) {
    //             console.log("enterenterenterinside!!")

    //             const { userimage, username, groupTitle } = item;



    //             navigate(`/converstion?${groupTitle}`, {
    //                 state: {
    //                     username
    //                     , groupTitle, userimage
    //                 }
    //             });
    //         }
    //     })
    // }, [converationUsers])



    console.log(converationUsers, "converationUsersconverationUsersconverationUsersconverationUsers")

    const MessageHandler = async (obj) => {


        const { productId, shopId } = obj;


        // console.log(authUser, "authUser.sss..!!");


        const userId = authUser?.data?._id;

        alert(shopId + " seller and userId" + userId)


        const groupTitle = shopId + userId;

        console.log(groupTitle, "groupTitle");




        await axios.post(`${server}convertion/create-new-conversation`, {
            groupTitle,
            userId,
            shopId
        }).then((res) => {
            // navigate(`/converstion?${groupTitle}`)
            // console.log(conversationRes.data, 'Seller Conversation Data');

            // console.log('go foward..!!')

            getSellerinfo({shopId,groupTitle});
        }).catch((error) => {
            console.log(error, "error is there..!!")
        })






    }





    return (

        <>
            <Header />


            <Container >

                <h1 style={{ textAlign: 'center' }}>Products</h1>


                <Grid container spacing={2}>


                    {
                        Products?.map((product, index) => {

                            return (<Grid

                                key={index}
                                xs={4} style={{ height: '100%' }}>

                                <Box style={{ margin: '10px,', background: '#1976d2' }}>



                                    <div>   <img style={{ maxWidth: '100%' }} src={`${server}${product.productImage[0].path}`} /></div>

                                    <Box style={{ padding: '15px', color: '#fff' }}>

                                        <div>{product._id}</div>
                                        <div> Title: {product.name}</div>
                                        <div>Description:{product.description}</div>
                                        <div>Price:{product.orignalPrice}</div>
                                        <div>pricewithdiscount:{product.pricewithdiscount}</div>
                                        <div>stock:{product.stock}</div>
                                        <div>Tag:{product?.tag[0].tagname}</div>
                                        <div>shopId:{product.shopId}</div>

                                        <Button onClick={() => MessageHandler({ productId: product._id, shopId: product.shopId })} variant="contained" color="secondary">
                                            Massage
                                        </Button>
                                    </Box>


                                </Box>
                            </Grid>
                            )

                        })
                    }



                </Grid>




            </Container>

            <Footer />
        </>
    )
}

export default Dashboard;




