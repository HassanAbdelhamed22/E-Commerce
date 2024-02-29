import axios from "axios";
import { BaseUrl } from "./modal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

let token = localStorage.getItem("userToken");

export function addToCart(productId) {
  return axios.post(
    `${BaseUrl}api/v1/cart`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

export function getCart() {
  return axios.get(`${BaseUrl}api/v1/cart`, {
    headers: {
      token,
    },
  });
}

export function deleteCart(id) {
  return axios.delete(`${BaseUrl}api/v1/cart/${id}`, {
    headers: {
      token,
    },
  });
}

export function updateCart({ id, count }) {
  return axios.put(
    `${BaseUrl}api/v1/cart/${id}`,
    { count },
    {
      headers: {
        token,
      },
    }
  );
}

export function checkout({ id, shippingAddress }) {
  return axios.post(
    `${BaseUrl}api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    { shippingAddress },
    {
      headers: {
        token,
      },
    }
  );
}

export function useCartCrud(fn) {
  const queryClient = useQueryClient();
  return useMutation(fn, {
    onSuccess: (data) => {
      if (fn === addToCart) toast.success(data?.data?.message);
      else if (fn === updateCart)
        toast.success("Quantity is Updated Successfully");
      else if (fn === deleteCart) toast.success("Item is Deleted Successfully");
      queryClient.invalidateQueries("getCart");
    },
    onError: (data) => {
      toast.error(data?.message || "An error occurred.");
    },
  });
}

export function useCart(key, fn) {
  return useQuery(key, fn);
}
