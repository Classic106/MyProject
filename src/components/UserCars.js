import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SearchResult from './SearchResult';
import EditCarItem from './EditCarItem';

import '../style/user_cars.scss';

const UserCars = ()=>{

    const { user } = useSelector(store => store.user);
    
    const [cars, setCars] = useState([]);

    useEffect(()=>{
        setCars(user.carsId);
    }, [user]);
  
    return(
        <div className='user_cars'>
            <SearchResult CarItem={EditCarItem} searchResult={cars}/>
        </div>
    )
}

export default UserCars;