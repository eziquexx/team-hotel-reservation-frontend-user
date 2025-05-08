import "bootstrap/dist/css/bootstrap.min.css";
import "../css/PaymentContent.css";
import { useNavigate } from "react-router-dom";

export default function PaymentComplete() {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
  }

  return (
    <>
      <div className="Payment_container PaymentComp_container">
        <ul className='Payment_list PaymentComp_list'>
          <li className="PaymentComp_li">
            <div className="title">
              <h3>결제 완료</h3>
            </div>
            <div className ="Payment_complete">
              <p>
                결제가 완료 되었습니다.
              </p>
              <button onClick={gotoHome}>홈으로 이동</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}