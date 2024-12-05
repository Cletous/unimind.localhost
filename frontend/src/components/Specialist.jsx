import profile_placeholder from '../images/profile/profile-placeholder.jpg'
import moment from "moment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

import { Link } from "react-router-dom";

const Specialist = ({ specialist }) => {

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const dismissMutation = useMutation(
    (specialistId) => {
      return makeRequest.get("/specialists/dismiss/" + specialistId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["specialists"]);
      },
    }
  );

  const handleDismiss = () => {
    dismissMutation.mutate(specialist.id);
  };

  return (
    <div className="">
      <div className="post-grid">
        <div className="post-profile-box">
          <img src={profile_placeholder} alt="" />
          <span className=""><Link to={"mailto:" + specialist.email}>{specialist.email}</Link></span>
          <div className="">{moment(specialist.createdAt).fromNow()}</div>
          <div className="">
          {currentUser.role_id === 1 && (
            <button className="danger-button" onClick={handleDismiss}>dismiss specialist</button>
          )}
          </div>
        </div>
        <div className="post-description-box">
        <p>{specialist.description}</p>
        </div>
        <div className="">
          
        </div>
      </div>
    </div>
  );
};

export default Specialist;
