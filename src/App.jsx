
import { Link, Outlet} from "react-router-dom";
import './App.css';
    
    export default function App() {
      return (
        <>
              <nav className="top-navbar">
        <div className="logo">EatOAdmin</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/add-dish">Add Dish</Link>
          <Link to="/orders">Dinning Orders</Link>
          <Link to="/zomato">Zomato Orders</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/setup">SetUp</Link>
          <Link to="/report">Report</Link>
          <Link to="/history">History</Link>
          <Link to="#">Settings</Link>
        </div>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
        </>
      );
    }
 



