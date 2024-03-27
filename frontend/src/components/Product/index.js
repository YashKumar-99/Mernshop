import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Button, ButtonGroup, CircularProgress, Skeleton } from '@mui/material'; // Import Skeleton from MUI
import axios from 'axios';
import { server } from '../../server';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import './Product.css'; // Import CSS file for product and loader styles

const Product = () => {
    const navigate = useNavigate();
    const userId = useSelector((store) => store?.authUser?.data?._id);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true); // State for loader visibility

    const getAllProducts = async (page) => {
        try {
            setLoading(true); // Show loader while fetching products
            const res = await axios.get(`${server}v1/api/products?page=${page}&limit=9`);
            setProducts(res.data.products);
            setTotalPages(res.data.pagination.totalPages);
        } catch (error) {
            console.log(error, "Error fetching products");
        } finally {
            setLoading(false); // Hide loader after fetching products
        }
    }

    useEffect(() => {
        getAllProducts(currentPage);
    }, [currentPage]);

    const goToPage = (page) => {
        setCurrentPage(page);
    }

    async function getSellerInfo(obj) {
        const { foundSellerId, groupTitle } = obj;
        try {
            const conversationRes = await axios.get(`/convertion/conversationwihtsellers/${userId}`);
            if (conversationRes.status === 200) {
                conversationRes?.data?.conversation?.forEach((item) => {
                    if (item.groupTitle === groupTitle) {
                        const { userimage, username, groupTitle, senderId, reciverId } = item;
                        navigate(`/converstion?${groupTitle}`, {
                            state: { username, groupTitle, userimage: `/seller/${userimage}`, senderId, reciverId }
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error, "Error fetching seller information");
        }
    }

    const chatHandler = async (obj) => {
        const { shopId } = obj;
        const groupTitle = shopId + userId;
        try {
            const res = await axios.post(`${server}convertion/create-new-conversation`, {
                groupTitle,
                userId,
                shopId
            });
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
                {loading && (
                    <Grid container spacing={2}>
                        {[...Array(9)].map((_, index) => (
                            <Grid key={index} item xs={4} style={{ height: '100%' }}>
                                <Box style={{ margin: '10px', background: '#1976d2', padding: '15px', color: '#fff' }}>
                                    <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
                                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={45} width="20%" style={{ marginBottom: 6 }} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}
                {!loading && (
                    <Grid container spacing={2}>
                        {products.map((product, index) => (




                            <Grid key={index} item xs={4} style={{ height: '100%' }}>
                                <Box style={{ margin: '10px', background: '#1976d2', padding: '15px', color: '#fff' }}>


                                    <div><img
                                        style={{ maxWidth: '100%' , }}
                                        src={`${server}${product.productImage[0].path}`}
                                        onLoad={() => setLoading(false)} // Hide loader when image is loaded
                                    /></div>
                                    <Box style={{ padding: '15px', color: '#fff' }}>
                                        <div>{product._id}</div>
                                        <div>Title: {product.name}</div>
                                        <div>Description: {product.description}</div>
                                        <div>Price: {product.orignalPrice}</div>
                                        <div>Price with discount: {product.pricewithdiscount}</div>
                                        <div>Stock: {product.stock}</div>
                                        <div>Tag: {product?.tag[0].tagname}</div>
                                        <div>Shop ID: {product.shopId}</div>
                                        <Button onClick={() => chatHandler({ productId: product._id, shopId: product.shopId })} variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                                            Chat
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>

                            // <Grid key={index} item xs={4} style={{ height: '100%' }}>
                            //     <Box style={{ margin: '10px,', background: '#1976d2', padding: '15px' }}>
                            //         <div><img
                            //             style={{ maxWidth: '100%' }}
                            //             src={`${server}${product.productImage[0].path}`}
                            //             onLoad={() => setLoading(false)} // Hide loader when image is loaded
                            //         /></div>
                            //         <Box style={{ padding: '15px', color: '#fff' }}>
                            //             <div>{product._id}</div>
                            //             <div>Title: {product.name}</div>
                            //             <div>Description: {product.description}</div>
                            //             <div>Price: {product.orignalPrice}</div>
                            //             <div>Price with discount: {product.pricewithdiscount}</div>
                            //             <div>Stock: {product.stock}</div>
                            //             <div>Tag: {product?.tag[0].tagname}</div>
                            //             <div>Shop ID: {product.shopId}</div>
                            //             <Button onClick={() => chatHandler({ productId: product._id, shopId: product.shopId })} variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                            //                 Chat
                            //             </Button>
                            //         </Box>
                            //     </Box>
                            // </Grid>
                        ))}
                    </Grid>
                )}


                {/* <Box textAlign="center" marginTop="20px">
                    <ButtonGroup variant="outlined" color="primary" aria-label="pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button key={page} className={(page == currentPage) ? 'active' : 'normal'} onClick={() => goToPage(page)}>{page}</Button>
                        ))}
                    </ButtonGroup>
                </Box> */}


                <Box textAlign="center" margin="20px">
                    <ButtonGroup variant="outlined" color="primary" aria-label="pagination">
                        <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            {/* <ArrowBackIcon /> */}

                            <KeyboardDoubleArrowLeftIcon/>
                            
                            
                            
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button key={page} className={(page === currentPage) ? 'active' : 'normal'} onClick={() => goToPage(page)} >{page}</Button>
                        ))}
                        <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>

                            <KeyboardDoubleArrowRightIcon/>
                            
                            {/* <ArrowForwardIcon /> */}
                        </Button>
                    </ButtonGroup>
                </Box>

            </Container>
        </>
    );
}

export default Product;
