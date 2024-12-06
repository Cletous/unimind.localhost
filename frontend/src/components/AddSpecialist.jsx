import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
const AddSpecialist = () => {
  const [email, setEmail] = useState("");

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const addMutation = useMutation(
    (specialistEmail) => {
      return makeRequest.post("/specialists/promote/" + specialistEmail);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["specialists"]);
      },
    }
  );

  const handleAddSpecialist = async (e) => {
    e.preventDefault();
    
    addMutation.mutate(email);
  };

  return (
      <div className="share-post">
        <h1>Promote a user to specialist</h1>
        <div className="">
          <form onSubmit={handleAddSpecialist}>
            <div>
            <input 
            name="email" 
            type="email"
            id="" 
            required 
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="full-width-input"
            rows={5}/>
            </div>
            
            <button className="button">Promote</button>
          </form>
        </div>
        <hr />
        <div className="">
        </div>
      </div>
  );
};

export default AddSpecialist;
