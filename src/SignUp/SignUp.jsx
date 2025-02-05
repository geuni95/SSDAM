import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const [formData, setFormData] = useState({
        name: "",
        nick_name: "",
        email: "",
        pass: "",
        role: "",
        termsCheck: false
    });

    // 입력 필드 값 변경 시 상태 업데이트
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // 폼 제출 시 실행되는 함수
    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 방지

        try {
            const response = await fetch("http://localhost:8587/api/regist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    nick_name: formData.nick_name,
                    email: formData.email,
                    pass: formData.pass,
                    role: formData.role || "user"
                })
            });

            const data = await response.json();
            console.log("회원가입 응답:", data);

            if (data.result === 1) {
                alert("회원가입 성공!");
                navigate("/login"); // 회원가입 후 로그인 페이지로 이동
            } else {
                alert("회원가입 실패: 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("회원가입 요청 중 오류 발생:", error);
            alert("서버 오류 발생! 다시 시도해주세요.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src="/src/assets/images/signup-illustration.png" alt="Join Us" />
            </div>
            <div className="signup-form">
                <h2 className="signup-title">회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">이름</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">닉네임</label>
                        <input type="text" className="form-control" name="nick_name" placeholder="Nickname" value={formData.nick_name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">이메일</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input type="password" className="form-control" name="pass" placeholder="Password" value={formData.pass} onChange={handleChange} required />
                    </div>
                    <div className="form-check mb-3">
                        <input type="checkbox" className="form-check-input" id="termsCheck" name="termsCheck" checked={formData.termsCheck} onChange={handleChange} required />
                        <label className="form-check-label" htmlFor="termsCheck">
                            서비스 약관 및 플랫폼 개인 정보 보호 정책에 동의합니다.
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success w-100">확인</button>
                </form>
                <p className="mt-3 text-center">
                    이미 계정이 있으신가요? <a href="/login" className="login-link">로그인</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
