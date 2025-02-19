import React, { useEffect, useState } from "react";

const PwdSearchModal = ({ showModal, onClose, onConfirm }) => {
  const [tempPassword, setTempPassword] = useState("");

  useEffect(() => {
    if (showModal) {
      const storedTempPassword = localStorage.getItem("tempPassword");
      console.log("모달 열림 - 저장된 임시 비밀번호:", storedTempPassword);
    }
  }, [showModal]);

  const handleConfirm = () => {
    const storedTempPassword = localStorage.getItem("tempPassword");
    console.log("입력한 임시 비밀번호:", tempPassword);
    console.log("저장된 임시 비밀번호:", storedTempPassword);

    if (tempPassword.trim() === storedTempPassword?.trim()) {
      onConfirm(); // 비밀번호 일치 시 부모 컴포넌트에서 페이지 이동 처리
    } else {
      alert("임시 비밀번호가 올바르지 않습니다.");
    }
  };

  if (!showModal) return null; // 모달이 닫혀 있으면 아무것도 렌더링하지 않음

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>임시 비밀번호 입력</h3>
        <p>이메일로 전송된 임시 비밀번호를 입력하세요.</p>
        <input 
          type="text" 
          className="form-control input-box" 
          placeholder="임시 비밀번호" 
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
        />
        <button className="btn confirm-btn" onClick={handleConfirm}>확인</button>
        <button className="btn close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default PwdSearchModal;