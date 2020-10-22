import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';
import holder from './movie.svg'



export default function ImgMediaCard({props}) {
  let image = holder

  if(props.hasOwnProperty('Poster')){
 
    image=`${props.Poster}`
  }

  return (
    <Card className='Card'>
      <img style={{
        
        height: "15rem",
          width: '10rem'
      }} src={image} alt="sdsd"/>
    </Card>
  );
}