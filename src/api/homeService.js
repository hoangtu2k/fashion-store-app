import axios from "./axiosConfig";

const API_BASE = "/api/";

export const homeService = {
  // Đăng ký khách hàng
  registerCustomer: (customerData) => {
    return axios.post(`${API_BASE}customers/register`, customerData);
  },

  // Lấy giỏ hàng theo customerId
  getCart: (customerId) => {
    return axios.get(`${API_BASE}cart/${customerId}`);
  },

  // Thêm sản phẩm vào giỏ hàng
  addItemToCart: (customerId, productId, quantity) => {
    return axios.post(
      `${API_BASE}cart/${customerId}/add`,
      null,
      {
        params: {
          productId,
          quantity,
        },
      }
    );
  },

  // Xoá 1 sản phẩm trong giỏ hàng
  removeItemFromCart: (customerId, cartItemId) => {
    return axios.delete(`${API_BASE}cart/${customerId}/remove/${cartItemId}`);
  },

  // Xoá sạch giỏ hàng
  clearCart: (customerId) => {
    return axios.delete(`${API_BASE}cart/${customerId}/clear`);
  },
};
