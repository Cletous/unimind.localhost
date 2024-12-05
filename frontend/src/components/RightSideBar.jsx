
import { Link } from "react-router-dom";
const RightSideBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Important Links</span>
          <ul>
            <li>
              <Link to="/my-posts">My Posts</Link>
            </li>
            <li>
              <Link to="/specialists">Specialists</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
