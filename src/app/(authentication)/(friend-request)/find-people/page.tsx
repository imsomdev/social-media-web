"use client";
import { Button } from "@/components/ui/button";
import friendrequestServices from "@/services/friendrequest.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SendFriendRequest from "@/components/sendFriendRequest/SendFriendRequest";
import GetFriendRequest from "@/components/getFriendRequest/GetFriendRequest";
import AllFriends from "@/components/allFriends/AllFriends";
import Suggestion from "@/components/suggestedFriend/Suggestion";

const FindPeople = () => {
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
          <Suggestion />
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
