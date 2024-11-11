import Post from "./Post";
import Message from "./Message";
import { PostList as PostListData } from "../Store/post-list-store";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";

const PostList = () => {
  const { postList, addinitialposts } = useContext(PostListData);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    
    const controller = new AbortController();
    const signal = controller.signal;
    setloading(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((obj) => obj.json())
      .then((resp) => {
        addinitialposts(resp.posts);
        setloading(false);
      });
    return () => {
      controller.abort();
    }  

  }, []);

  return (
    <>
      {loading && <Loading></Loading>}
      {!loading && postList.length === 0 && <Message></Message>} 
      {!loading && postList.map((post) => <Post key={post.id} Post={post}></Post>)}
    </>
  );
};
export default PostList;
