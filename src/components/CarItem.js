import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const CarItem = ({ car }) => {
    
    const history = useHistory();
    
    const { user } = useSelector(store => store.user);
	
    const Click = ()=> {
    	!user ? 
            history.push('/search/'+car._id) :
    			history.push('/user/'+car._id, 0);
    }
    
    return(
        <div className='car_item' key={car._id} onClick={Click}>
            <div className='wrap_car_img'>
            {
                (!!car.images && car.images.length === 0)
                    ? <img src='https://i.rst.ua/no-photo.png' alt='carImage'/> :
                        <img src={car.images[0]} alt='carImage'/>
            }
            </div>
            <div className='car_description'>
                <h3>{car.manufacturer.toUpperCase()} {car.model.toUpperCase()}</h3>
                <div className='car_description_items'>
                    <section className='car_item_left'>
                        <p>Price: {car.price} $</p>
                        <p>Year: {car.year}, ({car.mileage}-mileage)</p>
                        <p>Engine: {car.engine} {car.fuel}, {car.transmission}</p>
                    </section>
                    <section className='car_item_right'>
                        <p>City: {car.city}</p>
                        <p>Condition: {car.condition}</p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default CarItem;