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

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case 'name':
                if (value.length > 10 || /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
                    error = '이름은 10자 이내, 특수문자 불가';
                }
                break;
           
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const [emailStatus, setEmailStatus] = useState(""); // ✅ 이메일 검사 결과 메시지 저장

    // 입력 값 변경 시 상태 업데이트
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setFormData({
            ...formData,
            [name]: val
        });
        validateField(name, val);
    };

    // 이메일 중복 및 유효성 검사 함수
    const handleEmailCheck = async () => {
        const email = formData.email;

        // 1️이메일 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailStatus("⚠️ 올바른 이메일 형식을 입력해 주세요!");
            return;
        }

        // 2️이메일 중복 체크 요청
        try {
            const response = await fetch(`http://localhost:8587/api/checkEmail?email=${email}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            if (response.status === 200) {
                setEmailStatus("✅ 사용 가능한 이메일입니다!");
            } else if (response.status === 409) {
                setEmailStatus("🚨 이미 사용 중인 이메일입니다!");
            }
        } catch (error) {
            console.error("❌ 이메일 중복 확인 중 오류 발생:", error);
            setEmailStatus("🔌 서버 오류 발생. 다시 시도해 주세요.");
        }
    };

// 닉네임 상태 변수 추가
const [nickNameStatus, setNickNameStatus] = useState("");

// 닉네임 중복 검사 함수
const handleNickNameCheck = async () => {
    const nick_name = formData.nick_name;

    if (nick_name.length === 0) {
        setNickNameStatus("⚠️ 닉네임을 입력해 주세요!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8587/api/checkNickName?nick_name=${nick_name}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (response.status === 200) {
            setNickNameStatus("사용 가능한 닉네임입니다!");
        } else if (response.status === 409) {
            setNickNameStatus("이미 사용 중인 닉네임입니다!");
        }
    } catch (error) {
        console.error("닉네임 중복 확인 중 오류 발생:", error);
        setNickNameStatus("서버 오류 발생. 다시 시도해 주세요.");
    }
};


    // 폼 제출 시 실행되는 함수
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
                    confirmPass: formData.confirmPass,  // confirmPass 추가
                    role: formData.role || "user"
                })
            });
    
            const data = await response.json();
            console.log("회원가입 응답:", data);
    
            if (data.result === 1) {
                alert("회원가입 성공!");
                navigate("/login");
            } else {
                alert(`회원가입 실패: ${data.message}`);
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
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="name"
                            value={formData.name}
                            onChange={handleChange}
                            onInput={(e) => validateField(e.target.name, e.target.value)}
                            required
                        />
                        {/* 이름 유효성 검사 결과 메시지 출력 */}
                        {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">닉네임</label>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                name="nick_name"
                                placeholder="nick_name"
                                value={formData.nick_name}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-primary ms-2"
                                onClick={handleNickNameCheck}
                            >
                                중복{`\n`}닉네임{`\n`}확인
                            </button>
                        </div>
                        {/* 닉네임 검사 결과 메시지 출력 */}
                        <div className="mt-2" style={{ color: nickNameStatus.startsWith("✅") ? "green" : "red" }}>
                            {nickNameStatus}
                        </div>
                    </div>

                    {/* 이메일 입력 */}
                    <div className="mb-3">
                        <label className="form-label">이메일</label>
                        <div className="d-flex">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-primary ms-2"
                                onClick={handleEmailCheck}
                            >
                                 중복{`\n`}이메일{`\n`}확인
                            </button>
                        </div>
                        {/* 이메일 검사 결과 메시지 출력 */}
                        <div className="mt-2" style={{ color: emailStatus.startsWith("✅") ? "green" : "red" }}>
                            {emailStatus}
                        </div>
                    </div>


                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input type="password" className="form-control" name="pass" placeholder="password"
                            value={formData.pass} onChange={handleChange} onInput={(e) => validateField(e.target)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">비밀번호 확인</label>
                        <input type="password" className="form-control" name="confirmPass" placeholder="confirm password"
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