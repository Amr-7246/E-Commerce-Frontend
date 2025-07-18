"use client"
import React, { useEffect} from 'react'
import {NavOptions} from '../../Data/NavOptions' 
// import { useUserInfoContext } from '../../Auth/context/userInfoContext';
import WideNavbar from './WideNavbar';
import MobileNavbar from './MobileNavbar';

const GlobalNav = () => {
    // const { UserInfo : user } = useUserInfoContext()

    // useEffect(() => {
    //     if(user !== null){
    //         NavOptions.push({
    //             name: 'Portfolio',
    //             href: '/global/user/portfolio',
    //             fake_href: '/global/user/portfolio',
    //         })
    //         console.log(NavOptions)
    //     }
    // }, [user])

return (
<>
    <WideNavbar/>
    <MobileNavbar/>
</>
)
}

export default GlobalNav