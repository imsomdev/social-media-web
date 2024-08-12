import { axiosApi } from "@/configs/axiosConfig";
import { isAxiosError } from "axios";

const friendrequestServices = {
  getAllUsersDetails: async () => {
    try {
      const res = await axiosApi.get("/all-users");
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
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
  sendFriendRequest: async (userId: any) => {
    try {
      const res = await axiosApi.post("/friend-request/send", userId);
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
export default friendrequestServices;
