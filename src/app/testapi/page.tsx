"use client";
import friendrequestServices from "@/services/friendrequest.services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const FriendRequestsPage = () => {
  const user = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: () => friendrequestServices.getFriendList(),
  });
  console.log(user, "User");

  if (isLoading) {
    return <div>Loading friend requests...</div>;
  }

  if (error) {
    return <div>Error loading friend requests</div>;
  }
  return (
    <div>
      <h1>Friend Requests</h1>
      {data?.length > 0 ? (
        <ul>
          {data.map((friendRequest: any) => (
            <li key={friendRequest.id}>{friendRequest.username}</li>
          ))}
        </ul>
      ) : (
        <p>No friend requests found</p>
      )}
    </div>
  );
};

export default FriendRequestsPage;
