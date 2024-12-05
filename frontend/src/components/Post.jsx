import profile_placeholder from '../images/profile/profile-placeholder.jpg'

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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

  // const handleLike = () => {
  //   mutation.mutate(data.includes(currentUser.id));
  // };

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
            <button className="" onClick={handleDelete}>delete post</button>
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
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          
          {commentOpen && <Comments postId={post.id} />}
        </div>
      </div>
    </div>
  );
};

export default Post;
