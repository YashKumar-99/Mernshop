import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../../routes/Routes';
import { Container, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import { server } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const navigate = useNavigate();
    const authUser = useSelector((store) => store?.authUser);
    const userId = useSelector((store) => store?.authUser?.data?._id);
    const [conversationUsers, setConversationUser] = useState(null);
    const [products, setProducts] = useState(null);

    const getAllProducts = async () => {
        try {
            const res = await axios.get('/v1/api/products');
            setProducts(res.data);
        } catch (error) {
            console.log(error, "Error fetching products");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    async function getSellerInfo(obj) {
        const { foundSellerId, groupTitle } = obj;
        try {
            const conversationRes = await axios.get(`/convertion/conversationwihtsellers/${userId}`);
            console.log("getSellerInfo called!!")

            console.log(conversationRes, "converss")

            if (conversationRes.status === 200) {
                // setConversationUser(conversationRes.data.conversation);

                conversationRes?.data?.conversation?.forEach((item) => {
                    if (item.groupTitle === groupTitle) {
                        const { userimage, username, groupTitle, senderId, reciverId } = item;
                        navigate(`/converstion?${groupTitle}`, {
                            state: { username, groupTitle, userimage: `/seller/${userimage}`, senderId, reciverId }
                        });
                    }
                });

                // conversationDetails(groupTitle);
            }

        } catch (error) {
            console.log(error, "Error fetching seller information");
        }
    }

    // function conversationDetails(groupTitle) {

    //     console.log("conversationDetails called!!")
    //     conversationUsers?.forEach((item) => {
    //         if (item.groupTitle === groupTitle) {
    //             const { userimage, username, groupTitle } = item;
    //             navigate(`/converstion?${groupTitle}`, {
    //                 state: { username, groupTitle, userimage:`/seller/${userimage}` }
    //             });
    //         }
    //     });
    // }

    const messageHandler = async (obj) => {
        const { shopId } = obj;
        const groupTitle = shopId + userId;
        try {
            const res = await axios.post(`${server}convertion/create-new-conversation`, {
                groupTitle,
                userId,
                shopId
            });

            console.log("messageHandler called!!")
            getSellerInfo({ shopId, groupTitle });
        } catch (error) {
            console.log(error, "Error creating new conversation");
        }
    };

    return (
        <>
            <Container>
                <h1 style={{ textAlign: 'center' }}>Products</h1>
                <hr className='bottomBorder' />
                <Grid container spacing={2}>
                    {products?.map((product, index) => (
                        <Grid key={index} xs={4} style={{ height: '100%' }}>
                            <Box style={{ margin: '10px,', background: '#1976d2' }}>
                                <div><img style={{ maxWidth: '100%' }} src={`${server}${product.productImage[0].path}`} /></div>
                                <Box style={{ padding: '15px', color: '#fff' }}>
                                    <div>{product._id}</div>
                                    <div>Title: {product.name}</div>
                                    <div>Description: {product.description}</div>
                                    <div>Price: {product.orignalPrice}</div>
                                    <div>Price with discount: {product.pricewithdiscount}</div>
                                    <div>Stock: {product.stock}</div>
                                    <div>Tag: {product?.tag[0].tagname}</div>
                                    <div>Shop ID: {product.shopId}</div>
                                    <Button onClick={() => messageHandler({ productId: product._id, shopId: product.shopId })} variant="contained" color="secondary">
                                        Message
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Product;
