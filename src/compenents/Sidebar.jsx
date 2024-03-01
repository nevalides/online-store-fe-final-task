import React, { useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import {
  IoMdAdd,
  IoMdArrowForward,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";
import { SidebarItem } from "./SidebarItem";

function Sidebar({ cart, setCart, sidebarState, handleClick }) {
  const addQuantity = (product) => {
    const addedItem = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };
    const checkItem = cart.find((item) => item.id === product.id);
    if (checkItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: addedItem.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      console.log(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const reduceQuantity = (product) => {
    const removedItem = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };
    const checkItem = cart.find((item) => item.id === product.id);
    if (checkItem) {
      if (checkItem.quantity > 1) {
        const updatedCart = cart.map((item) =>
          item.id === removedItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCart(updatedCart);
        console.log(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  };

  const removeFromCart = (product) => {
    const removedProduct = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };
    const checkItem = cart.find((item) => item.id === product.id);
    if (checkItem) {
      const updatedCart = cart.filter((item) => item.id !== removedProduct.id);
      setCart(updatedCart);
      console.log(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalPriceCalc = () => {
    let calcPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      calcPrice += cart[i]?.quantity * cart[i]?.price;
    }
    return calcPrice;
  };

  const totalPrice = totalPriceCalc();

  const checkoutHandler = () => {
    alert(
      `Thank you for buying, your total is $ ${parseFloat(totalPrice).toFixed(
        2
      )}`
    );
    clearCart();
  };

  return (
    <div
      className={`
      ${sidebarState ? "right-0" : "-right-full"}
       w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
          onClick={handleClick}
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((product, index) => (
          <SidebarItem
            key={index}
            product={product}
            addQuantity={addQuantity}
            reduceQuantity={reduceQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <div className="flex flex-col gap-y-3  mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span>{" "}
            {`$ ${parseFloat(totalPrice).toFixed(2)}`}
          </div>
          <div
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            onClick={clearCart}
          >
            <FiTrash2 />
          </div>
        </div>
        <button
          className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
          onClick={checkoutHandler}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
