import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Specialist from "./Specialist";

const Specialists = () => {
  const { isLoading, error, data } = useQuery(["specialists"], () =>
    makeRequest.get("/specialists").then((res) => {
      return res.data;
    })
  );

  console.log(data)
  return (
    <div className="specialists">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((specialist) => <Specialist specialist={specialist} key={specialist.id} />)}
    </div>
  );
};

export default Specialists;
