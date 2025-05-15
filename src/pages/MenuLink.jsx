import { Link, useNavigate } from "react-router-dom";
import '../components/common/css/MenuLink.css'; 

export default function MenuLink() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
  <div id="Menu_title_wrap">
    <div className="Menu_title">
      <Link to="/main" style={{ textDecoration: 'none'}}>
      {/* <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}> */}
    StarellaHotel</Link>
      <div className="Menu_item_menu">
        <button onClick={goBack}> : Close</button>
        {/* <Link to="/menu"> : Menu</Link> */}
      </div>
    </div>    
    <nav className="menu_container">
      <ul className="menu_list">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/room">Room View</Link></li>
        <li><Link to="/special">Special</Link></li>
        <li><Link to="/reservation">Reservation</Link></li>
        <li><Link to="/community">Community</Link></li>
      </ul>
    </nav>
  </div>
  );
}