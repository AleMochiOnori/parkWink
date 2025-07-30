import "./DashBoard.css"
import SideBar from "../Common/Sidebar/SideBar";
import Header from "../Common/Header/Header";
import { Outlet } from "react-router-dom";



const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <SideBar /> 
      <div className="main-content-wrapper">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}; export default DashBoard;