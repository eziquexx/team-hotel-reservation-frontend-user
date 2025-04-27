import { Outlet } from 'react-router-dom';
import '../css/SpecialContent.css';

//24.11.25 지은 [완료] : SpecialContent 테스트.
export default function SpecialContent() {
  return (
    <div>
      <Outlet />
      {/* <ul className="Special_list">
        <li className="title">
          <h2>Special</h2>
        </li>
        <li className="contents_wrap">
          <p>준비 중입니다.</p>
        </li>
      </ul> */}
    </div>
  );
}
