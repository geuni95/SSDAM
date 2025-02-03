import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserNav.css"; // ✅ 스타일 파일 추가

const UserNav = ({ user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) return null; // ✅ 로그인하지 않았을 경우 보이지 않음

  return (
    <div className="user-nav">
      <h3>환영합니다!</h3>
      <p><strong>{user.name}</strong>님</p>
      <p>이메일: {user.email}</p>
      <button onClick={() => navigate("/update-account")}>정보 수정</button>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
};

export default UserNav;




