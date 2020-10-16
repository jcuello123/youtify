import { useState, useEffect } from 'react';
import axios from 'axios';
import {accessToken} from './accesstoken';

export default function UserInfo() {
    const [userInfo, setUserInfo] = useState([]);
    
    useEffect(() => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }).then(user_info => setUserInfo(user_info.data))
        }, []);

    return userInfo;
}


