import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/CommunityContent.css";
import { Link } from "react-router-dom";

//24.11.25 지은 : CommunityContent 작업.
export default function CommunityQna() {
  return (
    <div className="Community_container">
      <ul className='Community_list Community_qna_list'>
        <li className="Community_li">
          <h2>Q&A</h2>
        </li>
        <li className="contents_wrap">
          <p>준비 중입니다.</p>
        </li>
      </ul>
    </div>
  );
}
