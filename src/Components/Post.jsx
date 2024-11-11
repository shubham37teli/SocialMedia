import { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { PostList } from "../Store/post-list-store";
const Post = ({ Post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title">
          {Post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            <TiDelete onClick={() => deletePost(Post.id)} />
          </span>
        </h5>
        <p className="card-text">{Post.body}</p>
        {Post.tags.map((tag) => (
          <span className="badge text-bg-primary hashtag">{tag}</span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by {Post.views} people
        </div>
      </div>
    </div>
  );
};

export default Post;
