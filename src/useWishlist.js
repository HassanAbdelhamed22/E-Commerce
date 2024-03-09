import { useMutation, useQuery, useQueryClient } from "react-query";
import { BaseUrl } from "./modal";
import toast from "react-hot-toast";
import axios from "axios";

let token = localStorage.getItem("userToken");

export function addToWishlist(productId) {
  return axios.post(
    `https://route-ecommerce.onrender.com/api/v1/wishlist`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

export function getWishlist() {
  return axios.get(`${BaseUrl}api/v1/wishlist`, {
    headers: {
      token,
    },
  });
}

export function deleteWishlist(id) {
  return axios.delete(`${BaseUrl}api/v1/wishlist/${id}`, {
    headers: {
      token,
    },
  });
}

export function useWishlist(key, fn) {
  return useQuery(key, fn);
}

export function useWishlistCrud(fn) {
  const queryClient = useQueryClient();
  return useMutation(fn, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries("wishlist");
    },
    onError: (data) => {
      toast.error(data?.message || "An error occurred.");
    },
  });
}
