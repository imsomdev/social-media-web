import friendrequestServices from "@/services/friendrequest.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button } from "../ui/button";

const GetFriendRequest = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getFriendRequest"],
    queryFn: () => friendrequestServices.getFriendRequestList(),
  });

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const FreindRequestActionMutation = useMutation({
    mutationFn: (data: any) => friendrequestServices.friendRequestAction(data),
    onSuccess: () => {
      console.log("cancelled");
      queryClient.invalidateQueries({ queryKey: ["getFriendRequest"] });
    },
    onError: (error) => {
      console.error("Error accepting friend request", error);
    },
  });

  const friendRequestAction = (userId: string, action: string) => {
    FreindRequestActionMutation.mutate({ user_id: userId, action: action });
  };

  return (
    <div>
      <div>
        {data &&
          (data?.count === 0
            ? "no request sent"
            : data?.friend_requests.map((req: any) => (
                <p key={req.from_user.id}>
                  {capitalizeFirstLetter(req.from_user.first_name)}{" "}
                  {capitalizeFirstLetter(req.from_user.last_name)}
                  <Button
                    onClick={() =>
                      friendRequestAction(req.from_user.id, "accept")
                    }
                    variant={"default"}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() =>
                      friendRequestAction(req.from_user.id, "reject")
                    }
                    variant={"destructive"}
                  >
                    Reject
                  </Button>
                </p>
              )))}
      </div>
    </div>
  );
};

export default GetFriendRequest;
