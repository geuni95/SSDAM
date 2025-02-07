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
  const [user, setUser] = useState(null);

  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
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

              {/* ✅ 네비게이션 바 중앙 메뉴 */}
              <div className="navbar-links flex-grow flex justify-center">
                  <div className="navbar-item"><span>분류</span><span>및 폐기</span></div>
                  <div className="navbar-item"><span>지역별</span><span>폐기물 처리</span></div>
                  <div className="navbar-item"><span>기부</span><span>및 중고거래</span></div>
                  <div className="navbar-item" onClick={() => navigate("/commBoardList")}>
                    <span>쓰담</span><span>커뮤니티</span>
                  </div>
                  <div className="navbar-item"><span>폐기물</span><span>캘린더</span></div>
              </div>

              {/* ✅ 로그인 여부에 따라 프로필 or 로그인 버튼 */}
              <div className="navbar-right flex items-center">
                  {!user ? (
                      <button className="login-button" onClick={() => navigate("/login")}>
                          로그인
                      </button>
                  ) : (
                    
                      <UserNav user={user} onLogout={handleLogout} />
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