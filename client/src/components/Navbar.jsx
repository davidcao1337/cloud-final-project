import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  }

  return (
    <nav className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/dashboard">Dashboard</Link>
        <Link className="btn btn-ghost normal-case text-xl" to="/datapull">Data Pull</Link>
        <Link className="btn btn-ghost normal-case text-xl" to="/dataupload">Data Upload</Link>
        <Link className="btn btn-ghost normal-case text-xl" to="/profile">Profile</Link>
        </div>
        <div className="flex-none">
        <button className="btn btn-ghost normal-case text-xl" onClick={handleClick}>Logout</button>
        </div>
    </nav>
  );
}
 
export default Navbar;