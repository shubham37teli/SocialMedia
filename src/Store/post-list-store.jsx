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

const DFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacation. Hope to enjoy a lot. Peace Out",
    reactions: 2,
    userId: "User-9",
    tags: ["vacation", "Mumbai", "Enjoy"],
  },
  {
    id: "2",
    title: "Pass Ho Bhai",
    body: "4 saal ki masti ke baad bhi ho gaye hain pass. Hard to believe.",
    reactions: 15,
    userId: "Useradda",
    tags: ["Graduting", "Enjoyable"],
  },
];

export default PostListProvider;
