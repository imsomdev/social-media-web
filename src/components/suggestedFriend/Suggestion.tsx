import friendrequestServices from "@/services/friendrequest.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Suggestion = () => {
  const queryClient = useQueryClient();
  const [requestStatus, setRequestStatus] = useState<Record<number, string>>(
    {}
  );
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["find-people"],
    queryFn: () => friendrequestServices.getAllUsersDetails(),
  });

  const SendFriendRequestMutation = useMutation({
    mutationFn: (userId: any) =>
      friendrequestServices.sendFriendRequest(userId),
    onSuccess: (res: any, variables: any) => {
      console.log(res, "success");
      queryClient.invalidateQueries({ queryKey: ["find-people"] });
      setRequestStatus((prevStatus) => ({
        ...prevStatus,
        [variables.to_user]: "sent",
      }));
    },
    onError: (error: any) => {
      console.error(error, "error");
    },
  });

  const CancelFriendRequestMutation = useMutation({
    mutationFn: (data: any) => friendrequestServices.cancelFriendRequest(data),
    onSuccess: (res: any) => {
      console.log(res, "success");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleSendFriendRequest = (userId: number) => {
    SendFriendRequestMutation.mutate({ to_user: userId });
  };
  const handleCancelFriendRequest = (userId: number) => {
    CancelFriendRequestMutation.mutate({ to_user: userId });
  };

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (isError) {
    return <div>Error fetching users.</div>;
  }
  return (
    <div>
      {data &&
        data.map((people: any) => (
          <div key={people.id}>
            {capitalizeFirstLetter(people.first_name)}{" "}
            {capitalizeFirstLetter(people.last_name)}
            <Button
              variant={"ghost"}
              onClick={() =>
                requestStatus[people.id] === "sent"
                  ? handleCancelFriendRequest(people.id)
                  : handleSendFriendRequest(people.id)
              }
            >
              {requestStatus[people.id] === "sent"
                ? "Cancel Request"
                : "Send Friend Request"}
            </Button>
          </div>
        ))}
      {data?.length === 0 && "wow! thereis no one for you"}
    </div>
  );
};

export default Suggestion;
