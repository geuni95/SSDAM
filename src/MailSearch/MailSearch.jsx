import React from "react";
import { useNavigate } from "react-router-dom";
import "./mail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple } from "react-icons/fa"; // 구글, 애플 아이콘
import { RiKakaoTalkFill } from "react-icons/ri"; // 카카오톡 아이콘
import { SiNaver } from "react-icons/si"; // 네이버 아이콘

import mailImage from "../assets/images/mail.png"; // 메일 이미지 추가

const MailSearch = () => {
  const navigate = useNavigate();

  return (
    <div className="mail-search-container">
      {/* 좌측 메일 이미지 */}
      <div className="image-container">
        <img src={mailImage} alt="메일 찾기" className="mail-image" />
      </div>

      {/* 우측 입력 폼 */}
      <div className="form-container">
        <h2 className="title">이메일 찾기</h2>
        <p className="subtitle">등록된 정보로 이메일 찾기</p>

        <input type="text" className="form-control input-box" placeholder="이름" />
        <input type="text" className="form-control input-box" placeholder="닉네임" />

        {/* 소셜 로그인 아이콘 */}
        <div className="social-icons">
          <div className="social-icon kakao"><RiKakaoTalkFill /></div>
          <div className="social-icon naver"><SiNaver /></div>
          <div className="social-icon google"><FaGoogle /></div>
          <div className="social-icon apple"><FaApple /></div>
        </div>

        <div className="bottom-buttons">
          <button className="btn email-btn">이메일 찾기</button>
          <button className="btn password-btn">비밀번호 찾기</button>
        </div>
      </div>
    </div>
  );
};

export default MailSearch;
