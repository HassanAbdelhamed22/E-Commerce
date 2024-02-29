import React, { useContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound";
import { userContext } from "../src/UserContext";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Components/Products/ProductDetails";
import Orders from "./Components/Orders/Orders";
import Wishlist from "./Components/Wishlist/Wishlist";
import SubCategories from "./Components/Categories/SubCategories";
import Profile from "./Components/Profile/Profile";
import BrandDetails from "./Components/Brands/BrandDetails";
import ForgetPassword from "./Components/Password/ForgetPassword";
import ResetCode from "./Components/Password/ResetCode";
import UpdatePass from "./Components/Password/UpdatePass";
import ProductsPageTwo from "./Components/Products/ProductsPageTwo";

export default function App() {
  let { setUser, setLogin } = useContext(userContext);

  // Handle Refresh
  useEffect(() => {
    if (localStorage.getItem("userToken"))
      setUser(localStorage.getItem("userToken"));
    setLogin(localStorage.getItem("userName"));
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Login></Login> },
        { path: "registration", element: <Registration></Registration> },
        {
          path: "forgetPassword",
          element: <ForgetPassword></ForgetPassword>,
        },
        {
          path: "updatePass",
          element: <UpdatePass></UpdatePass>,
        },
        {
          path: "resetCode",
          element: <ResetCode></ResetCode>,
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands></Brands>
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories></Categories>
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products></Products>
            </ProtectedRoute>
          ),
        },
        {
          path: "productsPageTwo",
          element: (
            <ProtectedRoute>
              <ProductsPageTwo></ProductsPageTwo>
            </ProtectedRoute>
          ),
        },

        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails></ProductDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "subCategories/:id",
          element: (
            <ProtectedRoute>
              <SubCategories></SubCategories>
            </ProtectedRoute>
          ),
        },
        {
          path: "brandDetails/:id",
          element: (
            <ProtectedRoute>
              <BrandDetails></BrandDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders></Orders>
            </ProtectedRoute>
          ),
        },

        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist></Wishlist>
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}
