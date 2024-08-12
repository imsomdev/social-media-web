import friendrequestServices from "@/services/friendrequest.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SendFriendRequest = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sendFriendRequest"],
    queryFn: () => friendrequestServices.getSendFriendRequestList(),
  });

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  return (
    <div>
      {data &&
        (data?.count === 0
          ? "no request sent"
          : data?.friend_requests.map((req: any) => (
              <p key={req.to_user.id}>
                {capitalizeFirstLetter(req.to_user.first_name)}{" "}
                {capitalizeFirstLetter(req.to_user.last_name)}
              </p>
            )))}
    </div>
  );
};

export default SendFriendRequest;
