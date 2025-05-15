import './css/Header.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '0';
    setTimeout(() => {
      navigate('/main');
      document.body.style.opacity = '1';
    }, 500);
  };
  return (
    <div id="header">
      <h1 className="header_title"><Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
      StarellaHotel</Link></h1>
      <div className="header_menu_navbar">

        <ul className="nav_item">
          <Link to="/about">About</Link>
          <li className="dropdown">
            <Link to="/about">About</Link>
          </li>
        </ul>

        <ul className="nav_item">
          <Link to="/room">Roomview</Link>
          <li className="dropdown">
            <Link to="/room/스탠다드">Standard</Link>
          </li>
          <li className="dropdown">
            <Link to="/room/디럭스">Deluxe</Link>
          </li>
          <li className="dropdown">
            <Link to="/room/스위트">Suite</Link>
          </li>
          <li className="dropdown">
            <Link to="/room/패밀리">Family</Link>
          </li>
          <li className="dropdown">
            <Link to="/room/프레지덴셜">Presidential</Link>
          </li>
        </ul>

        <ul className="nav_item">
        <Link to="/reservation/guide">Reservation</Link>
          <li className="dropdown">
            <Link to="/reservation/guide">Reservation Info</Link>
          </li>
          <li className="dropdown">
            <Link to="/reservation/check_out">Real-Time Reservation</Link>
          </li>
        </ul>

        <ul className="nav_item">
          <Link to="/special">Special</Link>
          <li className="dropdown">
            <Link to="/special">Special</Link>
          </li>
          <li className="dropdown">
            <Link to="/special/event">Event</Link>
          </li>
          <li className="dropdown">
            <Link to="/special/breakfast">Breakfast</Link>
          </li>
        </ul>

        <ul className="nav_item">
          <Link to="/community/notice">Community</Link>
          <li className="dropdown">
            <Link to="/community/notice">Notice</Link>
          </li>
          <li className="dropdown">
            <Link to="/community/qna">Q&A</Link>
          </li>
        </ul>
      </div>
      {/* <div className="header_item_menu">
        <Link to="/menu"> :Menu</Link>
      </div> */}
    </div>
  );
};
export default Header;


