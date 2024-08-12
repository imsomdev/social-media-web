"use client";
import { Button } from "@/components/ui/button";
import friendrequestServices from "@/services/friendrequest.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const FindPeople = () => {
  // Track the request status for each user
  const [requestStatus, setRequestStatus] = useState<Record<number, string>>(
    {}
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["find-people"],
    queryFn: () => friendrequestServices.getAllUsersDetails(),
  });

  const SendFriendRequestMutation = useMutation({
    mutationFn: (userId: any) =>
      friendrequestServices.sendFriendRequest(userId),
    onSuccess: (res: any, variables: any) => {
      console.log(res, "success");
      setRequestStatus((prevStatus) => ({
        ...prevStatus,
        [variables.to_user]: "sent",
      }));
    },
    onError: (error: any) => {
      console.error(error, "error");
    },
  });

  const handleSendFriendRequest = (userId: number) => {
    SendFriendRequestMutation.mutate({ to_user: userId });
  };

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users.</div>;
  }

  if (data?.length === 0) {
    return <div>No users found.</div>;
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
                  ? console.log("Cancel request function here")
                  : handleSendFriendRequest(people.id)
              }
            >
              {requestStatus[people.id] === "sent"
                ? "Cancel Request"
                : "Send Friend Request"}
            </Button>
          </div>
        ))}
    </div>
  );
};

export default FindPeople;
