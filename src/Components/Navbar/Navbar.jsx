import React, { useContext, useState } from "react";
import logo from "../../Assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../UserContext";
import { getCart, useCart } from "../../useCart";

export default function Navbar() {
  let { data } = useCart("getCart", getCart);
  let { user, setUser, setOpen, login } = useContext(userContext);
  let navigate = useNavigate();

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  function logout() {
    setUser(null);
    localStorage.removeItem("userToken");
    navigate("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg   navbar-light bg-light sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand" to="home">
            <img src={logo} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler mx-4"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="collapsibleNavId"
          >
            {user ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="allorders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 ">
              {/* <li className="nav-item">
                <Link className="nav-link " to="">
                  <i className=" fa-brands fa-facebook"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="">
                  <i className=" fa-brands fa-twitter"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="">
                  <i className=" fa-brands fa-instagram"></i>
                </Link>
              </li> */}

              {!user ? (
                <div className="d-md-flex  justify-content-center">
                  <li className="nav-item">
                    <Link className="nav-link " to="">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="registration">
                      Register
                    </Link>
                  </li>
                </div>
              ) : (
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logout}>
                    Logout
                  </span>
                </li>
              )}
              <div className="d-flex align-items-center gap-2">
                <li className="nav-item position-relative">
                  <Link className="nav-link " to="wishlist">
                    <i className="fa-solid fa-heart"></i>
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link " to="cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                  <span className="d-inline-block cart d-flex justify-content-center align-items-center position-absolute  rounded-circle text-white">
                    {data?.data?.numOfCartItems}
                  </span>
                </li>
                {user ? (
                  <li className="nav-item profile">
                    <li className="nav-item profile d-flex align-items-center justify-content-center">
                      <Link to="profile">
                        <i class="fa-solid fa-user nav-link ms-4 fa-lg "></i>
                      </Link>
                    </li>
                  </li>
                ) : (
                  ""
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <p>Please login first ...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
