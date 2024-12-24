import axios from "axios";

const API_URL = "https://adventus-admin-api.pdwap.store"; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProperties = async () => {
  try {
    const response = await api.get("/properties");
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const addProperty = async (property) => {
  try {
    const response = await api.post("/properties", property);
    return response.data;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};

export const editProperty = async (id, property) => {
  try {
    const response = await api.put(`/properties/${id}`, property);
    return response.data;
  } catch (error) {
    console.error("Error editing property:", error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};