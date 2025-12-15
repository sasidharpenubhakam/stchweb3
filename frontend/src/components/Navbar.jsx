import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <>
      {/* Glassmorphism Navbar */}
      <div className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-md bg-white/60
        border-b border-white/30
        shadow-sm
      ">
        <div className="flex items-center justify-between px-4 py-2 font-medium">

          {/* Logo */}
          <Link to="/">
            <img src={assets.logo} className="w-28" alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-6 text-sm text-gray-800">
            <NavLink to="/" className="flex flex-col items-center gap-0.5">
              <p>HOME</p>
            </NavLink>
            <NavLink to="/collection" className="flex flex-col items-center gap-0.5">
              <p>COLLECTION</p>
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-0.5">
              <p>ABOUT</p>
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-0.5">
              <p>CONTACT</p>
            </NavLink>
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <img
              onClick={() => { setShowSearch(true); navigate('/collection') }}
              src={assets.search_icon}
              className="w-4 cursor-pointer"
              alt="Search"
            />

            {/* Profile */}
            <div className="relative group">
              <img
                onClick={() => token ? null : navigate('/login')}
                src={assets.profile_icon}
                className="w-4 cursor-pointer"
                alt="Profile"
              />

              {token && (
                <div className="absolute right-0 pt-3 hidden group-hover:block">
                  <div className="
                    flex flex-col gap-2 w-36
                    py-2 px-4
                    bg-white/80 backdrop-blur-md
                    text-gray-600 rounded shadow
                  ">
                    <p className="cursor-pointer hover:text-black">My Profile</p>
                    <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                    <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-4" alt="Cart" />
              <span className="
                absolute -right-1 -bottom-1
                w-3.5 h-3.5 text-[8px]
                bg-black text-white
                rounded-full flex items-center justify-center
              ">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu */}
            <img
              onClick={() => setVisible(true)}
              src={assets.menu_icon}
              className="w-4 cursor-pointer sm:hidden"
              alt="Menu"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        fixed top-0 right-0 bottom-0 z-50
        bg-white backdrop-blur-md
        transition-all duration-300
        ${visible ? 'w-full' : 'w-0 overflow-hidden'}
      `}>
        <div className="flex flex-col text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-3 rotate-180" alt="Back" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[56px]" />
    </>
  )
}

export default Navbar

