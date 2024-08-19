import { axiosApi } from "@/configs/axiosConfig";
import { isAxiosError } from "axios";

const postServices = {
  postData: async (data: any) => {
    try {
      const res = await axiosApi.post("/create-post", data);
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  getPostData: async () => {
    try {
      const res = await axiosApi.get("/create-post");
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  deletePost: async (postId: any) => {
    try {
      const res = await axiosApi.post("/delete-post", postId);
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
};

export default postServices;
