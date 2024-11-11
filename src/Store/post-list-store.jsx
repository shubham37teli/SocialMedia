import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  addinitialposts: () => {},
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

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "Add",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
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

  return (
    <PostList.Provider
      value={{ postList, addPost, deletePost, addinitialposts }}
    >
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
