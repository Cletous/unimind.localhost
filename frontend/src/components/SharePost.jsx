import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
const SharePost = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

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
    setFile(null);
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <input
              type="text"
              placeholder={`Care to share your problem(s) ${currentUser.anonymous_name}?`}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              value={description}
              required
            />
          </div>
        </div>
        <hr />
        <div className="">
            <button onClick={handleClick}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default SharePost;
