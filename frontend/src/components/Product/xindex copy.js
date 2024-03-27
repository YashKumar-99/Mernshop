import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Button, ButtonGroup } from '@mui/material';
import axios from 'axios';
import { server } from '../../server';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Pagination.css'

const Product = () => {
    const navigate = useNavigate();
    const userId = useSelector((store) => store?.authUser?.data?._id);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getAllProducts = async (page) => {
        try {
            const res = await axios.get(`${server}v1/api/products?page=${page}&limit=9`);
            setProducts(res.data.products);
            setTotalPages(res.data.pagination.totalPages);
        } catch (error) {
            console.log(error, "Error fetching products");
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
                <Grid container spacing={2}>
                    {products.map((product, index) => (
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
                                    <Button onClick={() => chatHandler({ productId: product._id, shopId: product.shopId })} variant="contained" color="secondary">
                                        Chat
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Box textAlign="center" marginTop="20px">
                    <ButtonGroup variant="outlined" color="primary" aria-label="pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button key={page} className={page === currentPage ? "active" : "normal"}
                                onClick={() => goToPage(page)}>{page}</Button>
                        ))}
                    </ButtonGroup>
                </Box>



            </Container>
        </>
    );
}

export default Product;
