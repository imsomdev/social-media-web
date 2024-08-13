"use client";
import { Button } from "@/components/ui/button";
import friendrequestServices from "@/services/friendrequest.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SendFriendRequest from "@/components/sendFriendRequest/SendFriendRequest";
import GetFriendRequest from "@/components/getFriendRequest/GetFriendRequest";
import AllFriends from "@/components/allFriends/AllFriends";

const FindPeople = () => {
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
      <Tabs defaultValue="Find people">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Find people">Find people</TabsTrigger>
          <TabsTrigger value="Friend requests">Friend requests</TabsTrigger>
          <TabsTrigger value="Sent requests">Sent requests</TabsTrigger>
          <TabsTrigger value="All Friends">All Friends</TabsTrigger>
        </TabsList>
        <TabsContent value="Find people">
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
        </TabsContent>
        <TabsContent value="Friend requests">
          <GetFriendRequest />
        </TabsContent>
        <TabsContent value="Sent requests">
          <SendFriendRequest />
        </TabsContent>
        <TabsContent value="All Friends">
          <AllFriends />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FindPeople;
