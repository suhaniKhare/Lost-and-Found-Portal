

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchItems = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.type) params.append("type", filters.type);

    const response = await axios.get(
      `${API_BASE_URL}/items/getItems?${params.toString()}`,
      getAuthHeader()
    );
    return response.data.items || []; // Always return an array
  } catch (error) {
    console.error("Failed to fetch items:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch items, try again later.");
  }
};

export const fetchUserItems = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/items/myItems`,
      getAuthHeader()
    );
    return response.data.items || [];
  } catch (error) {
    console.error("Error in fetching user items:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch user items, try again later.");
  }
};

export const fetchSingleItem = async (itemId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/items/${itemId}`,
      getAuthHeader()
    );
    if (!response.data.item) {
      throw new Error("Item not found");
    }
    return response.data.item;
  } catch (error) {
    console.error("Failed to fetch single item:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch item details.");
  }
};

export const searchItemsByKeyword = async (keyword, filters = {}) => {
  try {
    const params = new URLSearchParams({ keyword });
    if (filters.type) params.append("type", filters.type);
    
    const response = await axios.get(
      `${API_BASE_URL}/items/getitemsonsearch?${params.toString()}`,
      getAuthHeader()
    );
    return response.data.items || [];
  } catch (error) {
    console.error("Search failed:", error);
    throw new Error(error.response?.data?.message || "Search failed, please try again.");
  }
};
