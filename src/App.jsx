import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import Header from "./compenents/Header";
import PrivateRoute from "./compenents/PrivateRoute";
import { useEffect, useState } from "react";
import SignInUp from "./pages/SignInUp";
import { ToastContainer } from "react-toastify";

const App = () => {
  const isLogin = localStorage.getItem("isLogin");
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    if (isLogin) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }

    const intervalId = setInterval(() => {
      const newIsLogin = localStorage.getItem("isLogin");

      if (newIsLogin) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isLogin]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute isAllowed={isAllowed}>
          <Header />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <PrivateRoute isAllowed={isAllowed}>
              <Homepage />
            </PrivateRoute>
          ),
        },
        {
          path: ":productId",
          element: (
            <PrivateRoute isAllowed={isAllowed}>
              <ProductDetail />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "signinup",
      element: <SignInUp setIsAllowed={setIsAllowed} />,
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
