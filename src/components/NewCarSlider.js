import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/new_slider.scss';

const axios = require('axios').default;

const NewCarSlider = ({ car, exact })=>{

  const dispatch = useDispatch();
  
  const [imgs, setImgs] = useState(car.images || []);
  const [user, setUser] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(()=>{
    return(()=>{

      if(exact){

      }else{
        if(user) dispatch({type: 'SET_USER', payload: user});
      }
    })
  }, [dispatch, user, exact])

  const DeleteImage = e =>{

    e.stopPropagation();

    const index = e.target.attributes[1].value;
    
    let images = [...car.images];
    const deletedImg = images.splice(+index, 1)[0];
    
    if(exact){
      axios.post('http://localhost:3001/cars/deletePicTemp/'+car._id, {images, deletedImg})
        .then(result => {
          setImgs(imgs.splice(index, 1));
          alert('Image deleted!!!');
        })
        .catch(err => {
          console.log(err.message);
        });
    }else{
      axios.post('http://localhost:3001/cars/deletePic/'+car._id, {images, deletedImg})
        .then(user => {
          setImgs(imgs.splice(index, 1));
          setUser(user.data);
          alert('Image deleted!!!');
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }

  const FullSize = e =>{
    dispatch({ type: "OPEN_FULLSCREEN",
        payload: {
          images: imgs,
          initSlide: e.target.attributes[1].value
        }
    })
  }
  
  return (
      <Slider {...settings}>
      {
        imgs.map((img, index) => 
          <div className='new_slider_image_wrap' key={img}>
            <div className='slider_image_buttons'>
              <button
                className='button'
                onClick={FullSize}
                index={index}
              >
                Full size
              </button>
              <button
                className='button delete'
                onClick={DeleteImage}
                index={index}
              >
                Delete
              </button>
            </div>
            <img src={img} alt="alt"/>
          </div>)
      }
      </Slider>
  );
}

export default NewCarSlider;
