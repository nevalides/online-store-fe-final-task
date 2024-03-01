import React, { useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Header() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [sidebarState, setSidebarState] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleScroll = (event) => {
    setIsHeaderSticky(window.scrollY > 50); // Sticky after scrolling 50px
  };

  const handleLogout = () => {
    localStorage.clear("isLogin");
  };

  const getTotalCartItem = () => {
    if (cart.length === 0) {
      return 0;
    }
    let totalItem = 0;
    for (let i = 0; i < cart.length; i++) {
      totalItem += cart[i]?.quantity;
    }
    return totalItem;
  };

  const totalQuantity = getTotalCartItem();

  const handleClick = () => {
    if (sidebarState) setSidebarState(false);
    else setSidebarState(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Important: Remove the listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-10 lg:px-8 transition-all ${
          isHeaderSticky ? "bg-white py-4 shadow-md" : "bg-none py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <a href="/">
            <div className="w-[40px]">
              <h1
                style={{ fontFamily: '"Satisfy", cursive', fontSize: "1.5rem" }}
              >
                Fakecommerce
              </h1>
            </div>
          </a>

          <div className="flex gap-6">
            <div className="cursor-pointer flex relative" onClick={handleClick}>
              <BsBag className="text-2xl" />
              <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {totalQuantity}
              </div>
            </div>
            <div
              onClick={handleLogout}
              className="cursor-pointer flex relative"
            >
              <CiLogout className="text-3xl" />
            </div>
          </div>
        </div>
      </header>
      <Outlet context={[cart, setCart]} />
      <Sidebar
        cart={cart}
        setCart={setCart}
        sidebarState={sidebarState}
        handleClick={handleClick}
      />
    </>
  );
}

export default Header;
