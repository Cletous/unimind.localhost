import profile_placeholder from '../images/profile/profile-placeholder.jpg'
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { useState } from "react";
import moment from "moment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="">
      <div className="post-grid">
        <div className="post-profile-box">
          <img src={profile_placeholder} alt="" />
          <Link
            to={`/profile/${post.userId}`}
          >
            <span className="">{post.anonymous_name}</span>
          </Link>
          <div className="">{moment(post.createdAt).fromNow()}</div>
          <div className="">
          {post.userId === currentUser.id && (
            <button className="danger-button" onClick={handleDelete}>delete post</button>
          )}
          </div>
        </div>
        <div className="post-description-box">
        <p>{post.description}</p>
        </div>
        <div className="">
          
        </div>
        <div className="post-comments-box">
          <div className="" onClick={() => setCommentOpen(!commentOpen)}>
            View All Comments
          </div>
          
          {commentOpen && <Comments postId={post.id} />}
        </div>
      </div>
    </div>
  );
};

export default Post;
