import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonEx from '../../../common/ButtonEx';
import '../css/MemberSignUpComplete.css';
import headImage from '../../../../assets/images/head.png';

function MemberSignUpComplete() {
    const location = useLocation();
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    // URL 쿼리 파라미터에서 데이터 추출
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');   // ?name=값
    const userId = searchParams.get('userId'); // ?userId=값

    // 홈으로 이동하는 함수
    const handleHomeClick = () => {
        navigate('/'); // '/' 경로로 이동
    };

    return (
        <div className="SignupComplete_container">
            <div className="signup-complete-page">
                <div className="title">
                    <h1>가입 완료</h1>
                    <div className="signup-steps">
                        <span>1 약관 동의</span>
                        <span>2 회원 정보 입력</span>
                        <span>3 가입 완료</span>
                    </div>
                </div>

                <div className="contents">
                    <div className="rewards-card">
                        <img src={headImage} alt="리워즈 카드" />
                        <div className="user-info">
                            <p>이&nbsp;&nbsp;&nbsp;름: {name || '정보 없음'}</p>
                            <p>아이디: {userId || '정보 없음'}</p>
                        </div>
                    </div>

                    <p className="special-offer">잘바즈 회원만의 특별한 혜택을 누려보세요</p>
                    <div className="buttons">
                        {/* 홈으로 이동 버튼 */}
                        <ButtonEx id="home-button" action={handleHomeClick}>홈으로 이동</ButtonEx>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberSignUpComplete;
