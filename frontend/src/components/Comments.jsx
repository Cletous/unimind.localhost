import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [description, setDescription] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ description, postId });
    setDescription("");
  };

  return (
    <div className="">
      <form onSubmit={handleClick}>
            <div>
            <textarea 
            name="description" 
            id="" 
            required 
            placeholder={`Care to share your comment(s) ${currentUser.anonymous_name}?`}
            onChange={(e) => setDescription(e.target.value)}
            className="full-width"
            rows={2}></textarea>
            </div>
        <button>Send Comment</button>
      </form>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.anonymous_name} says:</span>
                <p>{comment.description}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
