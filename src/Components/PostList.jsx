import Post from "./Post";
import Message from "./Message";
import { PostList as PostListData } from "../Store/post-list-store";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const PostList = () => {
  const postList = useLoaderData();  

  return (
    <>
      {postList.length === 0 && <Message></Message>} 
      {postList.map((post) => <Post key={post.id} Post={post}></Post>)}
    </>
  );
};

export const postLoader = () => {
  return fetch("https://dummyjson.com/posts")
  .then((obj) => obj.json())
  .then((resp) => {
    return resp.posts;
  });
}

export default PostList;
