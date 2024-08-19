import { axiosApi } from "@/configs/axiosConfig";
import { isAxiosError } from "axios";

const postServices = {
  postData: async (data: any) => {
    console.log(data, "Data received in services");
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
};

export default postServices;
