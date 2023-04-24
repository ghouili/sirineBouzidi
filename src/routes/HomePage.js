import React from 'react';
import Cookies from "universal-cookie";

import { Dashboard, Landpage } from '../containers';

const HomePage = () => {

    const cookies = new Cookies();
    let user = cookies.get("user");

    if (!user || user.role === 'user') {
        return <Landpage />
    } else {
        return <Dashboard />     
    }

}

export default HomePage