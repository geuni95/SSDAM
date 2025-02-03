import React from "react";
import { useNavigate } from "react-router-dom";  // useNavigate 훅을 import
import '../MainPage/main.css'; // CSS 파일을 불러옵니다.
import logo from '../assets/images/logo.svg'; // 로고 파일을 import
import UploadBox from '../UploadBox/UploadBox'; // UploadBox 컴포넌트 import
import FileInfo from '../UploadBox/FileInfo'; // FileInfo 컴포넌트 import

export const MainPage = () => {
    const navigate = useNavigate();  // useNavigate 훅을 사용해 navigate 함수 생성
    
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
                <button className="login-btn" onClick={() => navigate("/login")}> {/* 로그인 버튼 클릭 시 navigate 사용 */}
                    로그인
                </button>
            </nav>

            <div className="content">
                {/* FileInfo와 UploadBox를 보여주기 위한 부분 */}
                <UploadBox />
                <FileInfo />
            </div>
        </div>
    );
};

export default MainPage;
