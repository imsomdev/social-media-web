"use client";
import { Button } from "@/components/ui/button";
import friendrequestServices from "@/services/friendrequest.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SendFriendRequest from "@/components/sendFriendRequest/SendFriendRequest";

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

  const handleSendFriendRequest = (userId: number) => {
    SendFriendRequestMutation.mutate({ to_user: userId });
  };

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (isError) {
    return <div>Error fetching users.</div>;
  }

  if (data?.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <Tabs defaultValue="Find people">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Find people">Find people</TabsTrigger>
          <TabsTrigger value="Friend requests">Friend requests</TabsTrigger>
          <TabsTrigger value="Sent requests">Sent requests</TabsTrigger>
          <TabsTrigger value="Your Friends">Your Friends</TabsTrigger>
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
        </TabsContent>
        <TabsContent value="Friend requests"></TabsContent>
        <TabsContent value="Sent requests">
          <SendFriendRequest />
        </TabsContent>
        <TabsContent value="Your Friends"></TabsContent>
      </Tabs>
    </div>
  );
};

export default FindPeople;
