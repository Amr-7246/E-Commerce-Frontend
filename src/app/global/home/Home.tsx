import React from 'react'
import Store from '../store/Store'
import Link from 'next/link'

const Home = () => {
return (
    <div className='flex-center flex-col gap-5 w-full '>
        <div className='flex-center flex-col gap-5'>
            <div className='w-[85%] rounded-lg overflow-hidden relative'>
                <div className='w-full h-full bg-black/70 flex-center absolute'>
                    <p className="text-[30px] font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-lime-600">Shop Now!</p>
                </div>
                <img className='' src='/assets/photo_5_2025-04-24_17-53-26.jpg' alt="banner" />
            </div>
            <Link href={'/global/store'}  className='btn text-stone-800 font-bold w-[40%]' >Go to stor</Link>
        </div>
        <div>
            <Store/>
        </div>
    </div>
)
}

export default Home