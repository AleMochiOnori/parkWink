import { Link } from "react-router-dom";
import "./sideBar.css";



const SideBar = () => {
  return (
    <div className="sideBar-container">
      <div className="top-content">
          <div className="collapseSvg"></div>
      </div>
      <div className="middle-content">
        <Link to="/auto">
          <div className="outer_">
              <div className="carSvg"></div>
          </div>
        </Link>
        <Link to="/parcheggi">
          <div className="outer_">
              <div className="Psvg"></div>
          </div>
        </Link>
        <Link to="/prenotazioniTable">
          <div className="outer_">
              <div className="NoteSvg"></div>
          </div>
        </Link>
      </div>
      <div className="bottom-content"></div>
    </div>
  );
};

export default SideBar;
