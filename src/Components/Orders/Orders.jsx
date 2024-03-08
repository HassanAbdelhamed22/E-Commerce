import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BaseUrl } from "../../modal";
import Loading from "../Loading";

export default function Orders() {
  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);

  function getUserOrders(id) {
    return axios.get(`${BaseUrl}api/v1/orders/user/${id}`);
  }

  let { data, error, isError, isLoading } = useQuery("allorders", () =>
    getUserOrders(decodedToken.id)
  );

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Function to check if the order is delivered or shipped
  const getOrderStatus = (orderDate) => {
    const currentDate = new Date();
    const orderDatePlusThreeDays = new Date(orderDate);
    orderDatePlusThreeDays.setDate(orderDatePlusThreeDays.getDate() + 3);

    return currentDate > orderDatePlusThreeDays;
  };

  return (
    <div className="container my-4">
      {isLoading ? (
        <div>
          <Loading></Loading>
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="orders">
          <div className="responsive-table table-responsive">
            <table className="table table-hover">
              <thead>
                <tr className="bg-main text-white text-center">
                  <th scope="col">#</th>
                  <th scope="col">Items</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">City</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <ul className="list-unstyled">
                        {order.cartItems.map((item) => (
                          <li key={item.product.id}>
                            <div className="d-flex align-items-center my-2">
                              <img
                                src={item.product.imageCover}
                                className="mr-2"
                                alt={item.product.title}
                              />
                              <span className="fw-bold text-main mx-2">
                                {item.product.category.name}
                              </span>
                              <span className="mx-2">qty: {item.count}</span>
                              <span className="mx-2 ">{item.price} EGP</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{order.shippingAddress.phone}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{order.paymentMethodType}</td>
                    <td>${order.totalOrderPrice}</td>
                    <td>{order.shippingAddress.city}</td>
                    <td>
                      {getOrderStatus(order.createdAt) ? (
                        <div className="btn bg-success text-white">
                          Delivered
                        </div>
                      ) : (
                        <div className="btn bg-danger text-white">Shipped</div>
                      )}
                    </td>
                    {/* Display Order Status */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
