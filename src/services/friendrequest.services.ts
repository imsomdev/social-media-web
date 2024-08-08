import { axiosApi } from "@/configs/axiosConfig";
import { isAxiosError } from "axios";

const friendrequestServices = {
  getFriendList: async () => {
    try {
      const res = await axiosApi.get("/friend-list");
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
};
export default friendrequestServices;
