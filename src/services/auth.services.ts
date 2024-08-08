import { axiosApi } from "@/configs/axiosConfig";
import { isAxiosError } from "axios";

const authServices = {
  signUp: async (data: any) => {
    try {
      const res = await axiosApi.post("/signup", data);
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  login: async (data: any) => {
    try {
      const res = await axiosApi.post("/login", data);
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
};
export default authServices;
