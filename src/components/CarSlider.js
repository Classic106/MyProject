import React from 'react';
import { useDispatch } from "react-redux";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/slider.scss';

const SimpleSlider = ({ images, initSlide, exact })=> {
    
    const dispatch = useDispatch();

    const settings = exact ? {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 5000,
      initialSlide: initSlide || 0,
    } : {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      initialSlide: initSlide || 0,
    };
    
    const OpenImages = e =>{
      const { attributes } = e.target;
      
      if(!!images && images.length > 0)
        dispatch({
            type: "OPEN_FULLSCREEN",
            payload: { images, initSlide: attributes['index'].value }
        });
    }

    return (
        <Slider {...settings}>
        {
          images.map((img, index) => {
            return <div
              className='slider_image_wrap'
              key={img}
            >
            <img
              src={img} alt="alt" index={index}
              onClick={exact ? OpenImages : ()=>{}}
            />
            </div>
            })
        }
        </Slider>
    );
}

export default SimpleSlider;
