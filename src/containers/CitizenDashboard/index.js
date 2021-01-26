import React from 'react'
import { getUserFromToken } from '../../utils/request';


const CitizenDashboard = ({props}) => {

    const user = getUserFromToken();

    return  (
        <h1>Hello, {user.role}</h1>
        
    )
}

export default CitizenDashboard;