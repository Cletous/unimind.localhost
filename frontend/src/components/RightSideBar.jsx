import { Link } from "react-router-dom";
const RightSideBar = () => {
  return (
    <div className="right-sidebar">
      <span className="heading">Important Links</span>
      <ul className="sidebar-nav">
        <li>
          <Link to="/my-profile">My Profile</Link>
        </li>
        <li>
          <Link to="/specialists">Specialists</Link>
        </li>
      </ul>
    </div>
  );
};

export default RightSideBar;
