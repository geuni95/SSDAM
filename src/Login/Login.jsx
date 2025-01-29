import React from "react";
import computerLoginBro1 from "../assets/images/computer-login-bro-1.png"; // 이미지 경로 수정
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple } from "react-icons/fa";
import { SiNaver, SiKakao } from "react-icons/si";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        {/* 왼쪽 이미지 영역 */}
        <div className="login-image">
          <img src={computerLoginBro1} alt="로그인 화면" />
          {/* 소셜 로그인 아이콘 버튼 추가 */}
          <div className="social-icons">
            <button className="icon-btn kakao" onClick={() => handleSocialLogin("카카오")}>
              <SiKakao />
            </button>
            <button className="icon-btn naver" onClick={() => handleSocialLogin("네이버")}>
              <SiNaver />
            </button>
            <button className="icon-btn google" onClick={() => handleSocialLogin("구글")}>
              <FaGoogle />
            </button>
            <button className="icon-btn apple" onClick={() => handleSocialLogin("애플")}>
              <FaApple />
            </button>
          </div>
        </div>

        {/* 오른쪽 로그인 폼 */}
        <div className="login-form">
          <h2 className="login-title">로그인</h2>
          <p className="login-subtitle">계정에 로그인</p>

          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input type="password" className="form-control" id="password" placeholder="********" />
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
            <a href="#" className="forgot-link">
              이메일을 잊어버렸나요?
            </a>
            <a href="#" className="forgot-link">
              비밀번호를 잊어버렸나요?
            </a>
          </div>

          <p className="signup-text">
            아이디가 없으신가요? <a href="#" className="signup-link">회원가입</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
