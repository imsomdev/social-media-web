import friendrequestServices from "@/services/friendrequest.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Button } from "../ui/button";

const SendFriendRequest = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sendFriendRequest"],
    queryFn: () => friendrequestServices.getSendFriendRequestList(),
  });

  const CancelFriendRequestMutation = useMutation({
    mutationFn: (data: any) => friendrequestServices.cancelFriendRequest(data),
    onSuccess: (res: any, variables: any) => {
      console.log(res, "success");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const cancelFriendRequest = (userId: number) => {
    CancelFriendRequestMutation.mutate({ to_user: userId });
  };
  return (
    <div>
      {data &&
        (data?.count === 0
          ? "no request sent"
          : data?.friend_requests.map((req: any) => (
              <p key={req.to_user.id}>
                {capitalizeFirstLetter(req.to_user.first_name)}{" "}
                {capitalizeFirstLetter(req.to_user.last_name)}{" "}
                <Button
                  onClick={() => cancelFriendRequest(req.to_user.id)}
                  variant={"destructive"}
                >
                  Cancel request
                </Button>
              </p>
            )))}
    </div>
  );
};

export default SendFriendRequest;
