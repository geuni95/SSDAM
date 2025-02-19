import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserNav.css"; 

const UserNav = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="user-nav-container">
      <button className="user-nav-button" onClick={() => setIsOpen(!isOpen)}>
        👤 {user.name}님
      </button>

      {isOpen && (
        <div className="user-nav-dropdown">
          <p><strong>일련번호:</strong> {user.idx}</p>
          <p><strong>이름:</strong> {user.name}</p>
          <p><strong>닉네임:</strong> {user.nick_name}</p>
          <p><strong>이메일:</strong> {user.email}</p>
          <p><strong>등급:</strong> {user.role}</p>

          <button className="edit-button" onClick={() => navigate("/edit")}>정보 수정</button>
          <button className="logout-button" onClick={onLogout}>로그아웃</button>
        </div>
      )}
    </div>
  );
};

export default UserNav;