import GlobalNavBar from '@/app/components/GlobalNavBar'
import React from 'react'
import Store from './Store'
import CustomSlider from './CustomSlider'

const page = () => {
return (
    <div className={`page`}>
        <CustomSlider title={"technology"} category={"tech"} />
        <CustomSlider title={"Exessory"} category={"Exessory"} />
        <CustomSlider title={"clothes"} category={"clothes"} />
        <CustomSlider title={"Food"} category={"Food"} />
    </div>
)
}

export default page