import { PostCard } from "@/components/component/post-card";
import { PostComposer } from "@/components/component/post-composer";
import { Homepage } from "@/components/homepage/Homepage";

export default function Home() {
  return (
    <div>
      {/* <Homepage /> */}
      <PostComposer />
      <PostCard />
    </div>
  );
}
