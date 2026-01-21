import { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
  postList: [],
  loading: false,
  addPost: () => {},
  deletePost: () => {},
});

function postreducer(postList, { payload, type }) {
  if (type == "Delete") return postList.filter((post) => payload !== post.id);
  else if (type == "Add") {
    return [payload, ...postList];
  } else if (type == "All Post") {
    return payload.posts;
  }
}

// eslint-disable-next-line react/prop-types
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postreducer, []);
  const [loading, setloading] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "Add",
      payload: post,
    });
  };

  const deletePost = (id) => {
    dispatchPostList({
      type: "Delete",
      payload: id,
    });
  };

  const addinitialposts = (posts) => {
    dispatchPostList({
      type: "All Post",
      payload: { posts },
    });
  };

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
    };
  }, []);

  return (
    <PostList.Provider value={{ postList, loading, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
