import axios from "axios";
import { useQuery } from "react-query";
import { BaseUrl } from "./modal";

export function featuredProducts() {
  return axios.get(`${BaseUrl}api/v1/products`);
}

export function featuredProducts2() {
  return axios.get(`${BaseUrl}api/v1/products?page=2`);
}

export function featuredOneProduct(id) {
  return axios.get(`${BaseUrl}api/v1/products/${id}`);
}

export function useProduct(key, fn) {
  return useQuery(key, fn, {
    select: (data) => data.data.data,
  });
}
