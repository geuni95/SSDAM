import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./board.css";

const BoardView = ({ user }) => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8587/api/commBoardView?board_idx=${boardId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => console.error("❌ 게시글 불러오기 실패:", error));
  }, [boardId]);

  const handleEdit = () => {
    navigate(`/commBoardEdit/${boardId}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(
        `http://localhost:8587/api/commBoardDelete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ board_idx: boardId })
        }
      );

      const data = await response.json();
      console.log("서버 응답 데이터:", data); // ✅ 삭제 요청 후 서버 응답 확인

      if (data.result === 1) {
        alert("게시글이 삭제되었습니다.");
        navigate("/commBoardList");
      } else {
        alert("삭제 실패: 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("❌ 게시글 삭제 실패:", error);
    }
  };

  if (!post) {
    return <p className="loading-text">게시글을 불러오는 중...</p>;
  }

  return (
    <div className="board-view-container">
      <h2 className="board-title">게시글 상세보기</h2>
      <table className="table board-table">
        <tbody>
          <tr>
            <th>번호</th> <td>{post.board_idx}</td>
            <th>아이디</th> <td>{post.email}</td>
          </tr>
          <tr>
            <th>작성일</th> <td>{post.created_date}</td>
            <th>조회수</th> <td>{post.visit_count}</td>
          </tr>
          <tr>
            <th>제목</th> <td colSpan="3">{post.title}</td>
          </tr>
          <tr>
            <th>내용</th> <td colSpan="3">{post.content}</td>
          </tr>
        </tbody>
      </table>

      <div className="button-group">
        {user && (
          <>
            <button className="btn btn-primary" onClick={handleEdit}>
              수정하기
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              삭제하기
            </button>
          </>
        )}
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/commBoardList")}
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default BoardView;
