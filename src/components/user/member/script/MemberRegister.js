import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/MemberRegister.css';

const MemberRegister = () => {
    const env_API_BASE_URL = process.env.REACT_APP_API_URL;
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    // 입력값 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 아이디, 이메일, 비밀번호 유효성 검증
        const userIdRegex = /^[a-zA-Z0-9]{5,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

        if (!userIdRegex.test(formData.userId)) {
            setErrorMessage('아이디는 5~20자의 영문 및 숫자만 허용됩니다.');
            return;
        }
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('올바른 이메일 형식을 입력하세요.');
            return;
        }
        if (!phoneRegex.test(formData.phone)) {
            setErrorMessage('올바른 연락처 형식을 입력하세요. (예: 010-1234-5678)');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 서버 요청
        try {
            const response = await fetch(`${env_API_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: formData.userId,
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    phone: formData.phone,
                }),
            });

            if (!response.ok) {
                throw new Error('회원가입에 실패했습니다.');
            }

            // JSON 형식으로 응답 받기
            const result = await response.json();
            setSuccessMessage(result.message); // 성공 메시지 표시
            setErrorMessage('');

            // 페이지 이동
            navigate(`/users/signupcom?name=${formData.name}&userId=${formData.userId}`);
        } catch (error) {
            setErrorMessage(error.message || '회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="Register_container">
            <form onSubmit={handleSubmit} className="register-form">
                <div className="title">
                    <h2>회원 가입</h2>
                    <p className="point"><span>*</span> 표시는 필수로 입력해야 합니다.</p>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>

                <div className="contents">
                    <div className="formGroup_wrap">
                        <div className="form-group">
                            <label htmlFor="userId">아이디 <span>*</span></label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                placeholder="사용할 아이디를 입력하세요"
                                value={formData.userId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">이메일 <span>*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="사용할 이메일을 입력하세요"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group form-password">
                            <label htmlFor="password">비밀번호 <span>*</span></label>
                            <div className="input_group">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="비밀번호를 입력하세요"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="비밀번호를 다시 입력하세요"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">이름 <span>*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="이름을 입력하세요"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">연락처 <span>*</span></label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="연락처를 입력하세요"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <button id="registerSubmit" type="submit" className="custom-button">
                        가입 완료
                    </button>
                </div>
                
            </form>
        </div>
        
    );
};

export default MemberRegister;
