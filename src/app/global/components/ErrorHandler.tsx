import React from 'react'

const ErrorHandler = ({UserError} : any ) => {
    if(!UserError || !UserError.content || !UserError.state ) return null;
return (
    <div className=''>
        {UserError.content && (
            <div className={` rounded-xl p-3 w-full flex-center font-black ${UserError.state === 'success' ? 'bg-[var(--color-success)] text-[var(--color-success-text)]' : UserError.state === 'Warning' ? 'bg-[var(--color-warning)] text-[var(--color-warning-text)]' : 'bg-[var(--color-error)] text-[var(--color-error-text)]'}`}>
                <p className={``}>{UserError.content}</p>
            </div>
        )}
    </div>
)
}

export default ErrorHandler