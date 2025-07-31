import { Link } from "react-router-dom";
import "./sideBar.css";
import { useEffect, useRef, useState } from "react";



const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);


   function toggleSidebar() {
    setIsOpen(prev => !prev);
  }

   

  return (
    <div className={`sideBar-container ${isOpen ? "open" : "collapsed"}`}>
      <div className="top-content">
          <div onClick={toggleSidebar} className={`${isOpen ? "whiteCollapseSvg" : "blackSvg"}`}></div>
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
