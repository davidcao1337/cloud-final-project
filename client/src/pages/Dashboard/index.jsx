import './dashboard.css';
import { useLogout } from "../../hooks/useLogout";

const Dashboard = () => {
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
      }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Dashboard