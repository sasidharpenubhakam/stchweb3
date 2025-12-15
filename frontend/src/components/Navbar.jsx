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
        <div className="flex items-center justify-between px-6 py-4 font-medium">

          {/* Logo */}
          <Link to="/">
            <img src={assets.logo} className="w-36" alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-6 text-sm text-gray-800">
            {['/', '/collection', '/about', '/contact'].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 ${
                    isActive ? 'text-black' : ''
                  }`
                }
              >
                <p>
                  {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
                </p>
                <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden group-hover:block" />
              </NavLink>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-6">

            {/* Search */}
            <img
              onClick={() => { setShowSearch(true); navigate('/collection') }}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt="Search"
            />

            {/* Profile */}
            <div className="relative group">
              <img
                onClick={() => token ? null : navigate('/login')}
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt="Profile"
              />

              {token && (
                <div className="absolute right-0 pt-4 hidden group-hover:block">
                  <div className="
                    flex flex-col gap-2 w-36
                    py-3 px-5
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
              <img src={assets.cart_icon} className="w-5" alt="Cart" />
              <span className="
                absolute -right-1 -bottom-1
                w-4 h-4 text-[8px]
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
              className="w-5 cursor-pointer sm:hidden"
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
            className="flex items-center gap-4 p-4 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/contact">CONTACT</NavLink>
        </div>
      </div>

      {/* Spacer so content does not hide behind fixed navbar */}
      <div className="h-[80px]" />
    </>
  )
}

export default Navbar

