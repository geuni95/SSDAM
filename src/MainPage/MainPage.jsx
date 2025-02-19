import React from "react";
import "./main.css"; 
import logo from "../assets/images/logo.svg"; 
import { useNavigate } from "react-router-dom";
import UploadBox from "../UploadBox/UploadBox";
import FileInfo from "../UploadBox/FileInfo";
import UserNav from "./UserNav.jsx";
import "./UserNav.css"; 

export const MainPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  

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

              {/* 네비게이션 바 중앙 메뉴 */}
              <div className="navbar-links flex-grow flex justify-center">
                  <div className="navbar-item" onClick={() => navigate("/sortDump")}>
                    <span>분류</span><span>및 폐기</span>
                </div>
                  <div className="navbar-item"><span>지역별</span><span>폐기물 처리</span></div>
                  <div className="navbar-item"><span>기부</span><span>및 중고거래</span></div>
                  <div className="navbar-item" onClick={() => navigate("/commBoardList")}>
                    <span>쓰담</span><span>커뮤니티</span>
                  </div>
                  <div className="navbar-item"><span>폐기물</span><span>캘린더</span></div>
              </div>

              {/* 로그인 여부에 따라 프로필 or 로그인 버튼 */}
              <div className="navbar-right flex items-center">
                  {!user ? (
                      <button className="login-btn" onClick={() => navigate("/login", { state: { from: window.location.pathname } })}>
                      로그인
                  </button>                  
                  ) : (
                      <UserNav user={user} onLogout={onLogout} />
                  )}
              </div>
          </nav>

          <div className="content">
              <UploadBox />
              <FileInfo />
          </div>
      </div>
  );
};

export default MainPage;