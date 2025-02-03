import React, { useEffect, useState } from "react";
import "./main.css"; // CSS 파일을 불러옵니다.
import logo from "../assets/images/logo.svg"; // 로고 파일을 import
import { useNavigate } from "react-router-dom";
import UploadBox from "../UploadBox/UploadBox";
import FileInfo from "../UploadBox/FileInfo";
import UserNav from "./UserNav.jsx"; // ✅ 새로운 네비게이션 바 추가
import "./UserNav.css"; // CSS 파일을 불러옵니다.

export const MainPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // 사용자 정보를 저장할 상태
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      console.log("Stored User:", storedUser); // ✅ localStorage에서 가져온 값 확인
  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log("User State Updated:", JSON.parse(storedUser)); // ✅ 상태 업데이트 확인
      }
    }, []);
  
    // 로그아웃 함수
    const handleLogout = () => {
      localStorage.removeItem("user"); // ✅ localStorage에서 사용자 정보 삭제
      setUser(null); // 상태 초기화
      navigate("/"); // 메인 페이지로 이동
    };
  
    return (
      <div className="main-page">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
            <div className="logo-text">
              <p>쓰담</p>
              <p>쓰담</p>
            </div>
          </div>
  
          <div className="navbar-links">
            <div className="navbar-item"><span>분류</span><span>및 폐기</span></div>
            <div className="navbar-item"><span>지역별</span><span>폐기물 처리</span></div>
            <div className="navbar-item"><span>기부</span><span>및 중고거래</span></div>
            <div className="navbar-item"><span>쓰담</span><span>커뮤니티</span></div>
            <div className="navbar-item"><span>폐기물</span><span>캘린더</span></div>
          </div>
  
          {/* ✅ 로그인 상태에 따라 로그인 버튼 숨기기 */}
          <div className="user-info">
            {!user && (
              <button className="login-button" onClick={() => navigate("/login")}>
                로그인
              </button>
            )}
          </div>
        </nav>
  
        {/* ✅ 로그인하면 새로운 UserNav 네비게이션 바 표시 */}
        {user && <UserNav user={user} onLogout={handleLogout} />}
  
        <div className="content">
          <UploadBox />
          <FileInfo />
        </div>
      </div>
    );
  };
  
  export default MainPage;