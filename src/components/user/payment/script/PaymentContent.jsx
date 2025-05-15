import "bootstrap/dist/css/bootstrap.min.css";
import "../css/PaymentContent.css";
import { Outlet } from "react-router-dom";


export default function PaymentContent() {

  return (
    <>
      <Outlet />
    </>
    
  );
}