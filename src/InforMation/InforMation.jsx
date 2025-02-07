import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./information.css";
import logo from '../assets/images/logo.svg';
import infor1 from "../assets/images/infor1.png";
import infor2 from "../assets/images/infor2.png";
import infor3 from "../assets/images/infor3.png";
import infor4 from "../assets/images/infor4.png";
import infor5 from "../assets/images/infor5.png";
import infor6 from "../assets/images/infor6.png";
import infor7 from "../assets/images/infor7.png";
import infor8 from "../assets/images/infor8.png";
import infor9 from "../assets/images/infor9.png";
import infor10 from "../assets/images/infor10.png";
import infor11 from "../assets/images/infor11.png";

const InforMation = () => {
    const navigate = useNavigate();

    const images = [infor5, infor6, infor7, infor8, infor9, infor10, infor11];
    
    return (
        <div className="container main-page">
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

            {/* 메인 이미지 */}
            <div className="hero">
                <img src={infor1} alt="Main Banner" />
            </div>

            {/* 인트로 섹션 */}
            <section className="intro">
                <h1>안녕하세요!</h1>
                <p>
                    재질별, 품목별 재활용품의 올바른 분리배출 <br />
                    '쓰담쓰담'을 통해 확인할 수 있습니다!
                </p>
            </section>

            {/* 소개 섹션  */}
            <section className="about">
                <h2>쓰담쓰담은..</h2>
                <p>
                    에코 정렬 기술은 업로드된 쓰레기 사진을 통해 유형별로 쓰레기를 분류하고,<br />
                    지역별로 여러 지역에서 대형폐기물 스티커 가격, <br />
                    용량 및 일정에 대한 정보를 제공하도록 설계되었습니다.
                </p>
            </section>

            {/* 특징 섹션 */}
            <section className="features">
                <h2>특색</h2>
                <p>모든 한국인을 위한 에코 정렬의 재활용 혁신.</p>
                <div className="row text-center">
                    <div className="col-md-4">
                        <img src={infor2} alt="분류" />
                        <h3>분류</h3>
                        <p>재활용 쓰레기 사진을 공유하면 폐기물 유형이 식별됩니다.</p>
                    </div>
                    <div className="col-md-4">
                        <img src={infor3} alt="중고거래/나눔" />
                        <h3>중고거래/나눔</h3>
                        <p>버리기 아까운 물건들을 중고거래/나눔할 수 있습니다.</p>
                    </div>
                    <div className="col-md-4">
                        <img src={infor4} alt="커뮤니티" />
                        <h3>커뮤니티</h3>
                        <p>분리배출 꿀팁과 실생활 정보를 공유하는 공간.</p>
                    </div>
                </div>
            </section>


            {/* 종류 섹션 */}
            <section className="categories">
                <h2>종류</h2>
                <p>쓰담쓰담이 탐지할 수 있는 다양한 폐기물 종류</p>
                <div className="row text-center">
                    {["플라스틱", "재활용", "유리", "종이", "고철", "식물", "기타"].map(
                        (category, index) => (
                            <div className="col-md-3" key={index}>
                                <img src={images[index]} alt={category} />
                                <h3>{category}</h3>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* 푸터 */}
            <footer className="footer">
                <p>© 2025. 쓰담쓰담</p>
            </footer>
        </div>
    );
};

export default InforMation;
