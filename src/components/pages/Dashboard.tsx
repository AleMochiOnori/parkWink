import "./DashBoard.css"
import SideBar from "../Common/Sidebar/SideBar";
import Header from "../Common/Header/Header";
const DashBoard = () => {
    return (
        <> 
            <div className="dashboard-container">
                <SideBar />
                 <Header />
                <main className="main-content">
   
                 </main>
            </div>



        </>
    )
}; export default DashBoard;