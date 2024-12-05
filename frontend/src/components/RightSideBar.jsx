
import { Link } from "react-router-dom";
const RightSideBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Important Links</span>
          <div className="">
          <Link to="/my-posts">My Posts</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
