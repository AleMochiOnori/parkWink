import { Link } from "react-router-dom";
import "./sideBar.css";

const SideBar = () => {
  return (
    <div className="sideBar-container">
      <div className="top-content">
        <p></p>
      </div>

      <div className="middle-content">
        <div className="outer_">
          <Link to="/auto">
            <div className="carSvg"></div>
          </Link>
        </div>

        <div className="outer_">
          <Link to="/parcheggi">
            <div className="Psvg"></div>
          </Link>
        </div>
        <div className="outer_">
          <Link to="/prenotazioni">
            <div className="NoteSvg"></div>
          </Link>
        </div>
      </div>

      <div className="bottom-content"></div>
    </div>
  );
};

export default SideBar;
