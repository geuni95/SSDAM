import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple } from "react-icons/fa"; // 구글, 애플 아이콘
import { RiKakaoTalkFill } from "react-icons/ri"; // 카카오톡 아이콘
import { SiNaver } from "react-icons/si"; // 네이버 아이콘
import EmailPopup from "./EmailPopup"; // 모달 컴포넌트 추가
import mailImage from "../assets/images/mail.png"; // 메일 이미지 추가

const MailSearch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", nick_name: "" });
  const [email, setEmail] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // 모달 상태 추가

  // 입력 필드 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 이메일 찾기 요청 함수
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
        setEmail(data.email); // 이메일 저장
        setShowPopup(true); // 모달 표시
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
      <div className="image-container">
        <img src={mailImage} alt="메일 찾기" className="mail-image" />
      </div>

      <div className="form-container">
        <h2 className="title">이메일 찾기</h2>
        <p className="subtitle">등록된 정보로 이메일 찾기</p>

        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control input-box" name="name" placeholder="이름" value={formData.name} onChange={handleChange} />
          <input type="text" className="form-control input-box" name="nick_name" placeholder="닉네임" value={formData.nick_name} onChange={handleChange} />

          <div className="social-icons">
            <div className="social-icon kakao"><RiKakaoTalkFill /></div>
            <div className="social-icon naver"><SiNaver /></div>
            <div className="social-icon google"><FaGoogle /></div>
            <div className="social-icon apple"><FaApple /></div>
          </div>

          <div className="bottom-buttons">
          <button className="btn email-btn" type="submit">이메일 찾기</button>
          <button className="btn login-btn" type="button" onClick={() => navigate("/login")}>로그인화면 으로</button>
          </div>
        </form>
      </div>

      {/* 이메일 찾기 성공 시 모달 표시 */}
      {showPopup && (
        <EmailPopup
          email={email}
          onPass={() => navigate("/pwdSearch")} // 클릭 시 비번찾기 화면 이동
          onLogin={() => navigate("/login")} // 클릭 시 로그인 화면 이동
        />
      )}
    </div>
  );
};

export default MailSearch;
