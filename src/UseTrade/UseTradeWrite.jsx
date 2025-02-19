import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo.svg";
import "../UseTrade/usetradewrite.css";  

const UseTradeWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("나눔");
  const [image, setImage] = useState(null);

  // 파일 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="use-trade-write-container">
      {/* 네비게이션 바 (고정) */}
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
        <button className="login-btn" onClick={() => navigate("/login")}>
          로그인
        </button>
      </nav>

      {/* 글쓰기 폼 */}
      <Container className="write-form-container">
        <Card className="write-card">
          <Card.Body>
            {/* 작성자 */}
            <Form.Group className="mb-3">
              <Form.Control type="text" value="닉네임" readOnly />
            </Form.Group>

            {/* 제목 입력 */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="게시판 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            {/* 내용 입력 */}
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="게시판 내용을 입력해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {/* 사진 첨부 */}
            <div className="image-upload-container">
              <label className="image-upload-box">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {image ? <img src={image} alt="첨부된 이미지" className="uploaded-image" /> :
                  <div className="upload-placeholder">📷 사진 첨부</div>
                }
              </label>
            </div>

            {/* 분류 및 가격 입력 */}
            <Form.Group className="mb-3">
              <div className="category-container">
                <Form.Label><strong>분류:</strong></Form.Label>
                <Form.Check
                  inline
                  label="나눔"
                  type="radio"
                  name="category"
                  checked={category === "나눔"}
                  onChange={() => setCategory("나눔")}
                />
                <Form.Check
                  inline
                  label="판매"
                  type="radio"
                  name="category"
                  checked={category === "판매"}
                  onChange={() => setCategory("판매")}
                />
              </div>
            </Form.Group>

            {/* 판매 가격 입력 */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="판매 가격을 입력해주세요 (예: 0원)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            {/* 버튼 그룹 */}
            <div className="button-group">
              <Button variant="secondary">첨부파일</Button>
              <Button variant="success">글쓰기</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* 푸터 */}
      <footer className="footer">
        <p>© 2025 쓰담쓰담</p>
      </footer>
    </div>
  );
};

export default UseTradeWrite;