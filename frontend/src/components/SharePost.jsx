import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
const SharePost = () => {
  const [description, setDescription] = useState("");

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    
    mutation.mutate({ description });
    setDescription("");
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder={`Care to share your problem(s) ${currentUser.anonymous_name}?`}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              value={description}
              className="full-width-input"
              required
            />
            <button>Share</button>
          </form>
        </div>
        <hr />
        <div className="">
        </div>
      </div>
    </div>
  );
};

export default SharePost;
