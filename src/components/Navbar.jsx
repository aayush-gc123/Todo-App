import React from 'react'

const Navbar = (props) => {
  return (
    <nav className="flex justify-between bg-blue-600 text-white px-20 h-16 items-center " style={{minWidth:384}} >
        <div className="profile-name ">
            <h1 className="text-2xl font-bold">{props.logo}</h1>
        </div>
        <ul className="flex mx-20 gap-16 max-lg:hidden" >
            <li className="cursor-pointer hover:font-bold transition-all">Home</li>
            <li className="cursor-pointer hover:font-bold">About</li>
            <li className="cursor-pointer hover:font-bold">Help</li>
        </ul>
    </nav>
  )
}

export default Navbar
