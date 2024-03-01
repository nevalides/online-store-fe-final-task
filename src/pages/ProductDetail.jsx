import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useOutletContext, useParams } from "react-router-dom";

export default function ProductDetail() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cart, setCart] = useOutletContext();
  const { productId } = useParams();

  const paramChecker = (productId) => {
    if (productId > 60) {
      return productId - 60;
    } else if (productId > 40) {
      return productId - 40;
    } else if (productId > 20) {
      return productId - 20;
    } else {
      return productId;
    }
  };

  const addToCart = (product) => {
    const addedItem = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };
    const checkItem = cart.find((item) => item.id === addedItem.id);
    if (checkItem) {
      const updatedCart = cart.map((item) =>
        item.id === addedItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      console.log(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...addedItem, quantity: 1 }];
      setCart(updatedCart);
      console.log(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    alert("Product added to cart!");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://fakestoreapi.com/products/${paramChecker(productId)}`
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(true);
    };

    fetchData();
  }, []);

  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 max-h-screen flex flex-col items-center relative">
      <Link to={"/"}>
        <div className="w-[100vw] pl-20">
          <IoArrowBackCircle
            className="text-primary cursor-pointer"
            size={40}
          />
        </div>
      </Link>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-xs"
              src={data.image}
              alt=""
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {data.title}
            </h1>
            <div className="text-2xl text-red-500 font-medium mb-6">
              $ {data.price}
            </div>
            <p className="mb-8">{data.description}</p>
            <button
              className="bg-primary py-4 px-8 text-white"
              onClick={() => addToCart(data)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
