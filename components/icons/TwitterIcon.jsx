import React from 'react'

const TwitterIcon = ({ username }) => {
    return (
        <div className='relative group h-6 w-6 md:h-8 md:w-8 cursor-pointer mt-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="#ffffff" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-[#03435e] font-bold text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {username}
            </div>
        </div>
    )
}

export default TwitterIcon 
