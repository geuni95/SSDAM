import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserNav.css"; // ✅ 스타일 파일 추가

const UserNav = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // ✅ 드롭다운 상태 관리

  if (!user) return null; // ✅ 로그인하지 않았을 경우 보이지 않음

  return (
    <div className="user-nav-container"> {/* ✅ 부모 요소를 relative로 설정 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="user-nav-button"
      >
        👤 {user.name }님
         
      </button>

      {isOpen && (
        <div className="user-nav-dropdown">
          <div className="p-4">
            <p className="text-gray-800 font-semibold">일련번호:{user.idx}번</p>
            <p className="text-gray-800 font-semibold">이름:{user.name}님</p>
            <p className="text-gray-600 text-sm">닉네임:{user.nick_name}</p>
            <p className="text-gray-600 text-sm">이메일:{user.email}</p>
            <p className="text-gray-600 text-sm">등급:{user.role}</p>
            
          </div>
          <hr />
          <button onClick={() => navigate("/edit")} className="w-full text-left px-4 py-2 hover:bg-gray-100">
            정보 수정
          </button>
          <button onClick={onLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNav;
