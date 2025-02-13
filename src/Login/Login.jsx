import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import computerLoginBro1 from "../assets/images/computer-login-bro-1.png"; // 이미지 경로 수정
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple } from "react-icons/fa";
import { SiNaver, SiKakao } from "react-icons/si";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => { // ✅ props로 setUser 받기
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 이전 페이지 정보 가져오기
  
  const [formData, setFormData] = useState({
    email: "",
    pass: ""
  });

  // 입력 필드 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 로그인 요청 함수
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
      const response = await fetch("http://localhost:8587/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.result === 1) {
          alert("로그인 성공!");

          const userData = {
              idx: data.idx,
              email: data.email,
              name: data.name,
              nick_name: data.nick_name,
              role: data.role || "user"
          };

          // ✅ 로그인 사용자 정보 저장
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);

          // ✅ 로그인 이전 페이지로 이동
          const redirectTo = location.state?.from || "/";
          console.log("🔄 이전 페이지로 이동:", redirectTo);
          navigate(redirectTo, { replace: true });

      } else {
          alert("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
      }
  } catch (error) {
      console.error("❌ 로그인 요청 중 오류 발생:", error);
      alert("서버 오류 발생! 다시 시도해주세요.");
  }
};

  return (
    <div className="login-container">
      <div className="login-content">
        {/* 왼쪽 이미지 영역 */}
        <div className="login-image">
          <img src={computerLoginBro1} alt="로그인 화면" />
          {/* 소셜 로그인 아이콘 버튼 */}
          <div className="social-icons">
            <button className="icon-btn kakao" onClick={() => alert("카카오 로그인 준비 중")}>
              <SiKakao />
            </button>
            <button className="icon-btn naver" onClick={() => alert("네이버 로그인 준비 중")}>
              <SiNaver />
            </button>
            <button className="icon-btn google" onClick={() => alert("구글 로그인 준비 중")}>
              <FaGoogle />
            </button>
            <button className="icon-btn apple" onClick={() => alert("애플 로그인 준비 중")}>
              <FaApple />
            </button>
          </div>
        </div>

        {/* 오른쪽 로그인 폼 */}
        <div className="login-form">
          <h2 className="login-title">로그인</h2>
          <p className="login-subtitle">계정에 로그인</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                아이디(email)
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="email 입력"
                pattern=".+@.+\..+"  
                title="올바른 이메일 주소를 입력해주세요 (예: example@email.com)"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                className="form-control"
                name="pass"
                placeholder="password 입력"
                value={formData.pass}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                아이디 기억하기
              </label>
            </div>

            <button type="submit" className="btn btn-success w-100">
              로그인
            </button>
          </form>

          <div className="login-links">
            <a href="/mailSearch" className="forgot-link">
              이메일을 잊어버렸나요?
            </a>
  
            <a href="/pwdSearch" className="forgot-link">
              비밀번호를 잊어버렸나요?
            </a>
          </div>

          <p className="signup-text">
            아이디가 없으신가요?{" "}
            <Link to="/signup" className="signup-link">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
