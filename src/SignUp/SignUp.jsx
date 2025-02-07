import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        nick_name: "",
        email: "",
        pass: "",
        confirmPass: "",
        role: "",
        termsCheck: false
    });

    // 입력 값 변경 시 상태 업데이트
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

        validateField(e.target);
    };

    // 🔹 실시간 입력 유효성 검사 (브라우저 기본 메시지 적용)
    const validateField = (input) => {
        let error = "";
        const { name, value } = input;

        switch (name) {
            case "name":
                if (!/^[가-힣a-zA-Z]{1,10}$/.test(value)) {
                    error = "이름은 10자 이내의 문자만 입력 가능합니다.";
                }
                break;
            case "nick_name":
                if (value.length > 10) {
                    error = "닉네임은 최대 10자까지 입력 가능합니다.";
                }
                break;
            case "email":
                if (value.length > 30 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "올바른 이메일 형식을 입력하세요.";
                }
                break;
            case "pass":
                if (value.length < 9 || value.length > 30 || !/[A-Z]/.test(value) || !/[!@#$%^&*]/.test(value)) {
                    error = "비밀번호는 9~30자이며, 대문자와 특수문자를 포함해야 합니다.";
                }
                break;
            case "confirmPass":
                if (value !== formData.pass) {
                    error = "비밀번호가 일치하지 않습니다.";
                }
                break;
            default:
                break;
        }

        // 🔹 브라우저 기본 유효성 검사 메시지 적용
        input.setCustomValidity(error);
    };

    // 🚀 폼 제출 시 실행되는 함수
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.termsCheck) {
            alert("서비스 약관에 동의해야 합니다.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8587/api/regist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                navigate("/login");
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
                        <input type="text" className="form-control" name="name" placeholder="Name"
                            value={formData.name} onChange={handleChange} onInput={(e) => validateField(e.target)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">닉네임</label>
                        <input type="text" className="form-control" name="nick_name" placeholder="Nickname"
                            value={formData.nick_name} onChange={handleChange} onInput={(e) => validateField(e.target)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">이메일</label>
                        <input type="email" className="form-control" name="email" placeholder="Email"
                            value={formData.email} onChange={handleChange} onInput={(e) => validateField(e.target)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input type="password" className="form-control" name="pass" placeholder="Password"
                            value={formData.pass} onChange={handleChange} onInput={(e) => validateField(e.target)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">비밀번호 확인</label>
                        <input type="password" className="form-control" name="confirmPass" placeholder="Confirm Password"
                            value={formData.confirmPass} onChange={handleChange} onInput={(e) => validateField(e.target)} required />
                    </div>

                    <div className="form-check mb-3">
                        <input type="checkbox" className="form-check-input" id="termsCheck" name="termsCheck"
                            checked={formData.termsCheck} onChange={handleChange} required />
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
