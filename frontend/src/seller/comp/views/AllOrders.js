import React, { useEffect, useState } from 'react'
import axios from 'axios'



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { product } from '../ProductData';



const AllOrders = () => {

  const [objArr, setObjArr] = useState(product);


  // async function callapi() {

  //   await axios.get('https://api.escuelajs.co/api/v1/products').then((res) => setObjArr(res.data))

  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     callapi();

  //   }, 1000);

  // }, [])





  return (
    <div>AllOrders


      <div>

        {objArr.map((item) => {


          return (<>
            <Card sx={{ maxWidth: 345 }}>


              <CardMedia
                sx={{ height: 140 }}
                image={item.category.image}
                title="green iguana"
              />
              <CardMedia
                sx={{ height: 140 }}
                image={item.images[0]}
                title="green iguana"
              />
              <CardMedia
                sx={{ height: 140 }}
                image={item.images[1]}
                title="green iguana"
              />
              <CardMedia
                sx={{ height: 140 }}
                image={item.images[2]}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.category.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </>)


        })}

      </div>

    </div >
  )
}

export default AllOrders