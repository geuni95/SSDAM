import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pwdSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import passwordImage from "../assets/images/password.png";
import PwdSearchModal from "./PwdSearchModal"; // ✅ 모달 컴포넌트 임포트

const PwdSearch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8587/api/findPwd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("서버 응답:", data);

      if (data.result === 1) {
        setMessage("임시 비밀번호가 이메일로 발송되었습니다.");

        if (data.tempPassword) {
          console.log("저장할 임시 비밀번호:", data.tempPassword);
          localStorage.setItem("tempPassword", data.tempPassword);
        } else {
          console.warn("서버 응답에 tempPassword가 없습니다.");
        }

        setShowModal(true);
      } else {
        setMessage("일치하는 정보가 없습니다.");
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
      setMessage("서버 오류! 다시 시도해주세요.");
    }
  };

  

  return (
    <div className="password-search-container">
      <div className="image-container">
        <img src={passwordImage} alt="비밀번호 찾기" className="password-image" />
      </div>
      <div className="form-container">
        <h2 className="title">비밀번호 찾기</h2>
        <p className="subtitle">등록된 정보로 비밀번호 찾기</p>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="form-control input-box" 
            placeholder="이름" 
            name="name"
            value={formData.name}
            onChange={handleChange} 
          />
          <input 
            type="email" 
            className="form-control input-box" 
            placeholder="이메일" 
            name="email"
            value={formData.email}
            onChange={handleChange} 
          />

          {message && <p className="response-message">{message}</p>}

          <div className="bottom-buttons">
            <button className="btn password-btn" type="submit">비밀번호 찾기</button>
            <button className="btn login-btn" type="button" onClick={() => navigate("/login")}>로그인화면으로</button>
          </div>
        </form>
      </div>

      {/* ✅ 모달 추가 */}
      <PwdSearchModal 
        showModal={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={() => navigate("/login")} 
      />
    </div>
  );
};

export default PwdSearch;
