import React, { useState } from 'react';
import { Button, Navbar, Container, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo.svg';
import usetradeImage from '../assets/images/usetrade.png'; 
import '../UseTrade/usetradeview.css';

const product = {
  title: "장농 정리합니다.",
  description: "@년 사용한 장농이고 이사가야 해서 정리하려고 합니다. 지역은 @@동이고 거래 원합니다~~",
  image: usetradeImage,
  category: "나눔 🟦 / 판매 🟥",
  price: "0원",
  author: "작성자닉네임",
  date: "2025-02-12",
  views: 123,
};

const UseTradeView = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="use-trade-container">
      {/* 네비게이션 바 */}
      <nav className="navbar fixed-top">
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
        <button className="login-btn" onClick={() => navigate("/login")}>
          로그인
        </button>
      </nav>

      {/* 본문 */}
      <Container className="mt-5 trade-content">
        <Card className="trade-header">
          <Card.Body>
            <div className="title-section">
              <h4>{product.title}</h4>
              <div className="trade-info">
                <span><strong>작성자:</strong> {product.author}</span>
                <span><strong>조회수:</strong> {product.views}</span>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card className="trade-body mt-3">
          <Card.Body>
            {product.description.split(/(?<=\.|~~)/).map((sentence, index) => (
              sentence.trim() && <p key={index}>{sentence.trim()}</p>
            ))}
            <div className="trade-image-container">
              <img 
                src={product.image} 
                alt="상품 이미지" 
                className="trade-image"
                onClick={() => setShowModal(true)}
              />
            </div>
            <p className="mt-2"><strong>분류:</strong> {product.category}</p>
            <p><strong>판매 가격:</strong> {product.price}</p>
            <Button variant="primary" className="w-100">1:1 채팅</Button>
          </Card.Body>
        </Card>
      </Container>

      {/* 푸터 */}
      <footer className="footer fixed-bottom">
        <p>© 2025.쓰담쓰담</p>
      </footer>

      {/* 이미지 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <img src={product.image} alt="확대 이미지" className="modal-image" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UseTradeView;