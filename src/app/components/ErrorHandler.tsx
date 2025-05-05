import React from 'react'

const ErrorHandler = ({UserError} : any ) => {
    if(!UserError || !UserError.content || !UserError.state ) return null;
return (
    <div className=''>
        {UserError.content && (
            <div className={` rounded-xl p-3 w-full flex-center font-black ${UserError.state === 'success' ? 'bg-green-400 text-green-900' : UserError.state === 'Warning' ? 'bg-orange-400/50 text-amber-200' : 'bg-rose-400 text-rose-900'}`}>
                <p className={``}>{UserError.content}</p>
            </div>
        )}
    </div>
)
}

export default ErrorHandler