import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple } from "react-icons/fa"; 
import { RiKakaoTalkFill } from "react-icons/ri"; 
import { SiNaver } from "react-icons/si"; 
import EmailPopup from "./EmailPopup"; 
import mailImage from "../assets/images/mail.png"; 

const MailSearch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", nick_name: "" });
  const [email, setEmail] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8587/api/findEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("정보 확인:", data);

      if (data.result === 1) {
        setEmail(data.email); 
        setShowPopup(true);
      } else {
        alert("찾기 실패: 일치하는 정보가 없습니다.");
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
      alert("서버 오류 발생! 다시 시도해주세요.");
    }
  };

  return (
    <div className="mail-search-container">
      <div className="combined-card">
        {/* 📌 왼쪽 이미지 영역 */}
        <div className="image-section">
          <img src={mailImage} alt="메일 찾기" className="mail-image" />
        </div>

        {/* 📌 오른쪽 폼 영역 */}
        <div className="form-section">
          <h2 className="title">이메일 찾기</h2>
          <p className="subtitle">등록된 정보로 이메일 찾기</p>

          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="form-control input-box" 
              name="name" 
              placeholder="이름" 
              value={formData.name} 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              className="form-control input-box" 
              name="nick_name" 
              placeholder="닉네임" 
              value={formData.nick_name} 
              onChange={handleChange} 
            />

            {/* 📌 소셜 로그인 아이콘 */}
            <div className="social-icons">
              <div className="social-icon kakao"><RiKakaoTalkFill /></div>
              <div className="social-icon naver"><SiNaver /></div>
              <div className="social-icon google"><FaGoogle /></div>
              <div className="social-icon apple"><FaApple /></div>
            </div>

            {/* 📌 하단 버튼 */}
            <div className="bottom-buttons">
              <button className="btn email-btn" type="submit">이메일 찾기</button>
              <button className="btn login-btn" type="button" onClick={() => navigate("/login")}>로그인 화면으로</button>
            </div>
          </form>
        </div>
      </div>

      {/* 📌 이메일 찾기 성공 시 모달 표시 */}
      {showPopup && (
        <EmailPopup
          email={email}
          onPass={() => navigate("/pwdSearch")} 
          onLogin={() => navigate("/login")}
        />
      )}
    </div>
  );
};

export default MailSearch;
