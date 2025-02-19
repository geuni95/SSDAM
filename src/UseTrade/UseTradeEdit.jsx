import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo.svg";
import "../UseTrade/usetradeedit.css";  

const UseTradeEdit = ({ user }) => {
  const navigate = useNavigate();
  const { tradeId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "나눔",
    image: null,
    email: ""
  });

  // 기존 상품 데이터 불러오기
  useEffect(() => {
    fetch(`http://localhost:8587/api/useTradeView?trade_idx=${tradeId}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          category: data.category || "나눔",
          image: data.image || null,
          email: data.email
        });
      })
      .catch((error) => console.error(" 데이터 로드 실패:", error));
  }, [tradeId]);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file)
      });
    }
  };

  // 상품 수정 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.email !== formData.email) {
      alert("상품 수정 권한이 없습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8587/api/useTradeUpdate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.result === 1) {
        alert("상품 정보가 수정되었습니다.");
        navigate(`/useTradeView/${tradeId}`);
      } else {
        alert("상품 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(" 수정 실패:", error);
      alert("서버 오류 발생! 다시 시도해주세요.");
    }
  };

  return (
    <div className="use-trade-edit-container">
      {/* 네비게이션 바 */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <div className="logo-text">
            <p>쓰담</p>
            <p>중고거래</p>
          </div>
        </div>
      </nav>

      {/* 수정 폼 */}
      <Container className="edit-form-container">
        <Card className="edit-card">
          <Card.Body>
            <h4 className="text-center">상품 수정</h4>

            {/* 작성자 (읽기 전용) */}
            <Form.Group className="mb-3">
              <Form.Control type="text" value={formData.email} readOnly />
            </Form.Group>

            {/* 제목 입력 */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="title"
                placeholder="상품명을 입력해주세요"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* 내용 입력 */}
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                name="description"
                rows={5}
                placeholder="상품 설명을 입력해주세요"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* 사진 업로드 */}
            <div className="image-upload-container">
              <label className="image-upload-box">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {formData.image ? (
                  <img src={formData.image} alt="첨부된 이미지" className="uploaded-image" />
                ) : (
                  <div className="upload-placeholder">📷 사진 수정</div>
                )}
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
                  checked={formData.category === "나눔"}
                  onChange={() => setFormData({ ...formData, category: "나눔" })}
                />
                <Form.Check
                  inline
                  label="판매"
                  type="radio"
                  name="category"
                  checked={formData.category === "판매"}
                  onChange={() => setFormData({ ...formData, category: "판매" })}
                />
              </div>
            </Form.Group>

            {/* 가격 입력 */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="price"
                placeholder="판매 가격을 입력해주세요 (예: 0원)"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* 버튼 그룹 */}
            <div className="button-group">
              <Button variant="success" className="w-100" onClick={handleSubmit}>수정 완료</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => navigate(-1)}>취소</Button>
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

export default UseTradeEdit;