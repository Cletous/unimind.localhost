import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Specialist from "./Specialist";
import AddSpecialist from "./AddSpecialist";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Specialists = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["specialists"], () =>
    makeRequest.get("/specialists").then((res) => {
      return res.data;
    })
  );

  console.log(data);
  return (
    <div className="specialists">
      {currentUser.role_id === 1 && <AddSpecialist />}
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((specialist) => (
            <Specialist specialist={specialist} key={specialist.id} />
          ))}
    </div>
  );
};

export default Specialists;
