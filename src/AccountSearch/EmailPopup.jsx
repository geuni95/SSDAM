import React, { useEffect } from "react";
import "./emailPopup.css";

const maskEmail = (email) => {
  if (!email || !email.includes("@")) return email;
  const [id, domain] = email.split("@");

  if (id.length <= 2) {
    return `${id}@${domain}`;
  }

  const maskedId = id.slice(0, 2) + "*".repeat(id.length - 2);
  return `${maskedId}@${domain}`;
};

const EmailPopup = ({ email, onClose, onLogin, onPass }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!email) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>이메일 찾기 완료</h3>
        <p>회원님의 이메일은 <strong>{maskEmail(email)}</strong> 입니다.</p>
        <button className="pass-btn" onClick={onPass}>비밀번호 찾기</button>
        <button className="login-btn" onClick={onLogin}>로그인하러 가기</button>
      </div>
    </div>
  );
};

export default EmailPopup;