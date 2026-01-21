import Post from "./Post";
import Message from "./Message";
import { PostList as PostListData } from "../Store/post-list-store";
import { useContext } from "react";
import Loading from "./Loading";

const PostList = () => {
  const { postList , loading } = useContext(PostListData);
  

  return (
    <>
      {loading && <Loading></Loading>}
      {!loading && postList.length === 0 && <Message></Message>} 
      {!loading && postList.map((post) => <Post key={post.id} Post={post}></Post>)}
    </>
  );
};
export default PostList;
