import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LikeButton from '../LikeButton';
import "./board.css";
import "./boardView.css";

const BoardView = ({ user }) => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const isMounted = useRef(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetch(`http://localhost:8587/api/commBoardView?board_idx=${boardId}`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((error) => console.error("❌ 게시글 불러오기 실패:", error));
      fetch(`http://localhost:8587/api/comments/${boardId}`)
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((err) => console.error("❌ 댓글 가져오기 실패:", err));
    }
  }, [boardId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return alert("댓글을 입력하세요!");
    try {
      const response = await fetch("http://localhost:8587/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board_idx: boardId,  nick_name: user?.nick_name , role: user?.role || "USER", content: newComment }),
      });
      if (response.ok) {
        setNewComment("");
        fetch(`http://localhost:8587/api/comments/${boardId}`)
          .then((res) => res.json())
          .then((data) => setComments(data));
      }
    } catch (err) {
      alert("❌ 댓글 추가 실패: " + err.message);
    }
  };

  const handleDeleteComment = async (commentIdx) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const response = await fetch(`http://localhost:8587/api/comments/${commentIdx}`, { method: "DELETE" });
      if (response.ok) setComments(comments.filter((c) => c.comment_idx !== commentIdx));
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error);
    }
  };

  if (!post) return <p className="loading-text">게시글을 불러오는 중...</p>;

  return (
    <div className="board-view-container">
      <nav className="navbar">
        <div className="logo">쓰담 커뮤니티</div>
        <div className="nav-links">
          <button onClick={() => navigate('/')}>홈</button>
          <button onClick={() => navigate('/info')}>정보</button>
          <button onClick={() => navigate('/service')}>서비스</button>
        </div>
      </nav>

      <h2 className="board-title">게시글 상세보기</h2>
      <table className="table board-table">
        <tbody>
          <tr><th>번호</th><td>{post.board_idx}</td><th>아이디</th><td>{post.email}</td></tr>
          <tr><th>작성일</th><td>{post.created_date}</td><th>조회수</th><td>{post.visit_count}</td></tr>
          <tr><th>제목</th><td colSpan="3">{post.title}</td></tr>
          <tr>
            <th>내용</th>
            <td colSpan="3" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}></td>
          </tr>
          <tr><th>👍 좋아요</th><td colSpan="3"><LikeButton boardId={post.board_idx} email={user?.email} /></td></tr>
        </tbody>
      </table>

      <div className="comments-section">
        <h3>댓글</h3>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.comment_idx} className="comment-item">
              <p><strong>{comment.nick_name}</strong>: {comment.content}</p>
              {user?.nick_name === comment.nick_name && (
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment.comment_idx)}>삭제</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {user && (
        <div className="comment-input">
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="댓글을 입력하세요"></textarea>
          <button className="btn btn-primary" onClick={handleAddComment}>댓글 작성</button>
        </div>
      )}

      <div className="button-group">
        {user && (
          <>
            <button className="btn btn-primary" onClick={() => navigate(`/commBoardEdit/${boardId}`)}>수정하기</button>
            <button className="btn btn-danger" onClick={() => handleDelete()}>삭제하기</button>
          </>
        )}
        <button className="btn btn-secondary" onClick={() => navigate("/commBoardList")}>목록으로</button>
      </div>
    </div>
  );
};

export default BoardView;