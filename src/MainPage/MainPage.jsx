import React from "react";
import '../MainPage/main.css'; // CSS 파일을 불러옵니다.
import logo from '../assets/images/logo.svg'; // 로고 파일을 import

export const MainPage = () => {
    return (
        <div className="main-page">
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" /> {/* 로고를 src={logo}로 수정 */}
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
                <button className="login-btn">로그인</button>
            </nav>
        </div>
    );
};

export default MainPage;
