import friendrequestServices from "@/services/friendrequest.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button } from "../ui/button";

const AllFriends = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-friends"],
    queryFn: () => friendrequestServices.getFriendList(),
  });

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div>
      {data &&
        data.map((friend: any) => (
          <div key={friend.id}>
            {capitalizeFirstLetter(friend.first_name)}{" "}
            {capitalizeFirstLetter(friend.last_name)}
            <Button variant={"ghost"}>Unfriend</Button>
          </div>
        ))}
    </div>
  );
};

export default AllFriends;
