import { axiosPublic } from "@/configs/axiosConfig";
import { isAxiosError } from "axios";

const authServices = {
  signUp: async (data: any) => {
    try {
      const res = await axiosPublic.post("/signup", data);
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  login: async (data: any) => {
    try {
      const res = await axiosPublic.post("/login", data);
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.username
          ? error.response?.data?.username[0]
          : error.response?.data?.non_field_errors[0];
        throw new Error(message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
};
export default authServices;
