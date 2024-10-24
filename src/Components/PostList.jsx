import Post from "./Post";
import { PostList as PostListData } from "../Store/post-list-store";
import { useContext } from "react";

const PostList = () => {
  const { postList } = useContext(PostListData);

  return (
    <>
      {postList.map((post) => (
        <Post key={post.id} Post={post}></Post>
      ))}
    </>
  );
};
export default PostList;
