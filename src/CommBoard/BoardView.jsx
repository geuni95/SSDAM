import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo.svg";
import "../CommBoard/boardview.css"; 

const BoardView = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "익명",
    date: "",
  });

  useEffect(() => {
    //게시글 데이터 불러오기 (API 호출)
    fetch(`http://localhost:8587/api/commBoardView?board_idx=${boardId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost({
          title: data.title,
          content: data.content,
          author: data.email || "익명",
          date: data.created_date,
        });
      })
      .catch((error) => console.error("❌ 데이터 불러오기 실패:", error));
  }, [boardId]);

  return (
    <div className="board-view-container">
      {/* 네비게이션 바 */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <div className="logo-text">
            <p>쓰담</p>
            <p>커뮤니티</p>
          </div>
        </div>
        <button className="login-btn" onClick={() => navigate("/login")}>
          로그인
        </button>
      </nav>

      {/* 게시글 상세 보기 */}
      <Container className="view-container">
        <Card className="view-card">
          <Card.Body>
            <h3 className="post-title">{post.title}</h3>
            <div className="post-info">
              <span><strong>작성자:</strong> {post.author}</span>
              <span><strong>작성일:</strong> {post.date}</span>
            </div>
            <hr />
            <p className="post-content">{post.content}</p>
          </Card.Body>
        </Card>

        {/* 버튼 그룹 */}
        <div className="button-group">
          <Button variant="secondary" onClick={() => navigate(-1)}>뒤로가기</Button>
          <Button variant="warning">수정</Button>
          <Button variant="danger">삭제</Button>
        </div>
      </Container>

      {/* 푸터 */}
      <footer className="footer">
        <p>© 2025 SSDAM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BoardView;
