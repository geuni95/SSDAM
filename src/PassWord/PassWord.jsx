import React from "react";
import { useNavigate } from "react-router-dom";
import "./password.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple } from "react-icons/fa"; // 구글, 애플 아이콘
import { RiKakaoTalkFill } from "react-icons/ri"; // 카카오톡 아이콘
import { SiNaver } from "react-icons/si"; // 네이버 아이콘

import passwordImage from "../assets/images/password.png"; // 비밀번호 찾기 이미지

const PassWord = () => {
  const navigate = useNavigate();

  return (
    <div className="password-search-container">
      {/* 좌측 패스워드 이미지 */}
      <div className="image-container">
        <img src={passwordImage} alt="비밀번호 찾기" className="password-image" />
      </div>

      {/* 우측 입력 폼 */}
      <div className="form-container">
        <h2 className="title">비밀번호 찾기</h2>
        <p className="subtitle">등록된 정보로 비밀번호 찾기</p>

        <input type="text" className="form-control input-box" placeholder="이름" />
        <input type="text" className="form-control input-box" placeholder="닉네임" />
        <input type="email" className="form-control input-box" placeholder="이메일" />

        {/* 소셜 로그인 아이콘 */}
        <div className="social-icons">
          <div className="social-icon kakao"><RiKakaoTalkFill /></div>
          <div className="social-icon naver"><SiNaver /></div>
          <div className="social-icon google"><FaGoogle /></div>
          <div className="social-icon apple"><FaApple /></div>
        </div>

        {/* 하단 버튼 */}
        <div className="bottom-buttons">
          <button className="btn password-btn">비밀번호 찾기</button>
          <button className="btn login-btn">로그인</button>
        </div>
      </div>
    </div>
  );
};

export default PassWord;