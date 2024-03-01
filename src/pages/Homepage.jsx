import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductCard } from "../compenents/ProductCard";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cart, setCart] = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const selectedList = data.slice(startIndex, endIndex);

  const pageButtonStyle = (page) => {
    return currentPage == page
      ? "mx-1 px-6 py-4 rounded shadow text-white bg-black font-bold"
      : "mx-1 px-6 py-4 rounded shadow text-black bg-white";
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const discoverMore = () => {
    const targetView = document.getElementById("products");
    targetView.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://fakestoreapi.com/products"
        );
        let duplicateList = [...response];
        for (let i = 1; i < 4; i++) {
          duplicateList = duplicateList.concat(
            response.map((product, index) => ({
              ...product,
              id: product.id + i * response.length,
            }))
          );
        }
        setData(duplicateList);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(true);
    };

    fetchData();
  }, []);

  //   cart
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
  };

  useEffect(() => {
    const message = localStorage.getItem("toastMessage");
    console.log(message);
    if (message) {
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 5000, // Close the toast after 5000 milliseconds (5 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // onClose: () => {
        //   localStorage.removeItem("toastMessage");
        // },
      });
    }
    localStorage.removeItem("toastMessage");
  }, []);

  return (
    <>
      <div className="w-[100vw]">
        <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
          <div className="container mx-auto flex justify-around h-full">
            <div className="flex flex-col justify-center">
              <div className="font-semibold flex items-center uppercase">
                <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>Hot Trend
              </div>
              <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
                Fresh Fashion Finds
                <br />
                <span className="font-light text-lg">new collection</span>
              </h1>
              <a
                onClick={discoverMore}
                className="self-start uppercase font-semibold border-b-2 border-primary text-2xl cursor-pointer"
              >
                Discover More
              </a>
            </div>
          </div>
        </section>
        {loading && (
          <section id="products" className="pt-[8rem]">
            <div className="container mx-auto">
              <h1 className="text-3xl font-semibold mb-10 text-center">
                Explore Our Products
              </h1>
              {/* Products => Needs Container: Grid, & Pagination */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg mx-auto">
                  {selectedList.map((product, index) => (
                    <ProductCard
                      key={index}
                      product={product}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
                <nav className="my-4">
                  <ul className="flex justify-center">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li key={index}>
                        <button
                          className={pageButtonStyle(index + 1)}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
