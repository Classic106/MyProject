import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BasicUserPage from './BasicUserPage';
import AdminUserPage from './AdminUserPage';

const User = ()=>{

    const { user } = useSelector(store => store.user);
    
    return user.isAdmin ? <AdminUserPage /> : <BasicUserPage />;
}

export default User;