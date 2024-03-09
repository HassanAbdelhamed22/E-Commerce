import React, { useContext, useState } from "react";
import { userContext } from "../../UserContext";
import {
  Cashcheckout,
  checkout,
  deleteCart,
  getCart,
  updateCart,
  useCart,
  useCartCrud,
} from "../../useCart";
import Navbar from "./../Navbar/Navbar";
import Loading from "./../Loading";
import emptyImg from "../../Assets/preview.png";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let [details, setDetails] = useState("");
  let [phone, setPhone] = useState("");
  let [city, setCity] = useState("");

  const navigate = useNavigate();

  let { isOpen, setOpen } = useContext(userContext);
  let { data, isError, error, isLoading } = useCart("getCart", getCart);

  let { mutate } = useCartCrud(deleteCart);
  let { mutate: mutateupdate, data: updatedData } = useCartCrud(updateCart);
  let { mutate: mutateCheckout, data: checkoutData } = useCartCrud(checkout);

  let { mutate: mutateCashCheckout, data: checkoutCashData } =
    useCartCrud(Cashcheckout);

  function addAddress(e) {
    let shippingAddress = { details, phone, city };
    e.preventDefault();
    mutateCheckout({ id: data?.data?.data?._id, shippingAddress });
    if (checkoutData?.data?.status === "success")
      window.location.href = checkoutData?.data?.session?.url;
  }

  function addAddressCash(e) {
    let shippingAddress = { details, phone, city };
    e.preventDefault();
    mutateCashCheckout({ id: data?.data?.data?._id, shippingAddress });

      window.location.href = "/allorders";
  }

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="text-center my-4">
        <h3 className=" fw-bold text-main">Cart is Empty</h3>
        <img className="" src={emptyImg} alt="emptyImg" />
      </div>
    );

  return (
    <>
      <div className="container my-4">
        <div className={data?.data?.numOfCartItems ? "bg-main-light p-4" : ""}>
          {data?.data?.numOfCartItems ? (
            <>
              <h3 className="fw-bold mb-4">Shop Cart:</h3>

              <h4 className="text-main">
                Number of cart items:{" "}
                <span className="fw-bolder">{data?.data?.numOfCartItems}</span>
              </h4>

              <h5 className="mt-2 mb-4">
                Total cart price:{" "}
                <span className="fw-bolder ">
                  {data?.data?.data?.totalCartPrice}
                </span>
              </h5>
              <button
                className="btn bg-main text-white"
                data-bs-toggle="modal"
                data-bs-target="#modalId"
              >
                Checkout
              </button>

              {data?.data?.data?.products.map((prod) => (
                <div className="row py-4 border-bottom" key={prod.product._id}>
                  <div className="col-md-8">
                    <div className="row gy-3 align-items-center">
                      <div className="col-lg-2 col-md-4">
                        <img
                          className="w-100"
                          src={prod.product.imageCover}
                          alt=""
                        />
                      </div>
                      <div className="col-lg-9 col-md-8 d-flex flex-column justify-content-center">
                        <p className="fw-bold fs-5">{prod.product.title}</p>
                        <p className="text-main fs-5 pt-2 pb-4">
                          Price: {prod.price} EGP
                        </p>
                        <p
                          className="fs-5 cursor-pointer"
                          onClick={() => {
                            mutate(prod.product._id);
                          }}
                        >
                          <i className="fa-solid fa-trash-can text-main"></i>{" "}
                          Remove
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end align-items-center">
                    <button
                      className="btn btn-border fw-bold fs-5 "
                      onClick={() => {
                        mutateupdate({
                          id: prod.product._id,
                          count: prod.count + 1,
                        });
                      }}
                    >
                      +
                    </button>
                    <span className="fs-4 mx-2">{prod.count}</span>
                    <button
                      className="btn btn-border fw-bold fs-5 "
                      onClick={() => {
                        mutateupdate({
                          id: prod.product._id,
                          count: prod.count > 1 ? prod.count - 1 : prod.count,
                        });
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center my-4">
              <h3 className="fw-bold text-main">Cart is Empty</h3>
              <img className="w-100" src={emptyImg} alt="emptyImg" />
            </div>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="modalId"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main" id="modalTitleId">
                Shipping Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  required
                  className="form-control my-3"
                  placeholder="Details"
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                />
                <input
                  type="text"
                  required
                  className="form-control my-3"
                  placeholder="Phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <input
                  type="text"
                  required
                  className="form-control my-3"
                  placeholder="City"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </form>
            </div>
            <div className="modal-footer d-flex align-items-center justify-content-between">
              <button
                type="button"
                className="btn btn-secondary "
                onClick={addAddressCash}
              >
                Cash
              </button>
              <button
                type="submit"
                className="btn bg-main text-white"
                onClick={addAddress}
              >
                Visa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
