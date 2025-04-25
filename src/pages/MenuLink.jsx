import { Link } from "react-router-dom";
import '../components/common/css/MenuLink.css'; 

export default function MenuLink() {
  return (
  <>
    <div className="Menu_title"><Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
    StarellaHOTEL</Link>
    
   <span className="Menu_item_menu">
   <Link to="/menu"> : Menu</Link></span></div>    
    <nav className="menu_container">
      <ul className="menu_list">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/room">Room View</Link></li>
        <li><Link to="/special">Special</Link></li>
        <li><Link to="/reservation">Reservation</Link></li>
        <li><Link to="/community">Community</Link></li>
      </ul>
    </nav>
  </>
  );
}