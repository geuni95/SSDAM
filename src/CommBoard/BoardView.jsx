import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.svg';
import LikeButton from '../LikeButton';
import "./board.css";
import "./boardView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
        .catch((error) => console.error(" 게시글 불러오기 실패:", error));
      fetch(`http://localhost:8587/api/comments/${boardId}`)
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((err) => console.error(" 댓글 가져오기 실패:", err));
    }
  }, [boardId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return alert("댓글을 입력하세요!");
    try {
      const response = await fetch("http://localhost:8587/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board_idx: boardId, nick_name: user?.nick_name, role: user?.role || "USER", content: newComment }),
      });
      if (response.ok) {
        setNewComment("");
        fetch(`http://localhost:8587/api/comments/${boardId}`)
          .then((res) => res.json())
          .then((data) => setComments(data));
      }
    } catch (err) {
      alert(" 댓글 추가 실패: " + err.message);
    }
  };

  const handleDeleteComment = async (commentIdx) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const response = await fetch(`http://localhost:8587/api/comments/${commentIdx}`, { method: "DELETE" });
      if (response.ok) setComments(comments.filter((c) => c.comment_idx !== commentIdx));
    } catch (error) {
      console.error(" 댓글 삭제 실패:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(
        'http://localhost:8587/api/commBoardDelete',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ board_idx: boardId })
        }
      );

      const data = await response.json();
      console.log("서버 응답 데이터:", data); // 삭제 요청 후 서버 응답 확인

      if (data.result === 1) {
        alert("게시글이 삭제되었습니다.");
        navigate("/commBoardList");
      } else {
        alert("삭제 실패: 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(" 게시글 삭제 실패:", error);
    }
  };

  const renderFileContent = (filePath) => {
    const fileExtension = filePath.split(".").pop().toLowerCase();

    // 이미지 파일 처리
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return <img src={`http://localhost:8587${filePath}`} alt="첨부파일" className="file-preview" />;
    }

    // 비디오 파일 처리
    if (["mp4", "avi", "mov"].includes(fileExtension)) {
      return (
        <video controls className="file-preview">
          <source src={`http://localhost:8587${filePath}`} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    }

    // 오디오 파일 처리
    if (["mp3", "wav", "ogg"].includes(fileExtension)) {
      return (
        <audio controls className="file-preview">
          <source src={`http://localhost:8587${filePath}`} type={`audio/${fileExtension}`} />
          Your browser does not support the audio element.
        </audio>
      );
    }

    return <a href={`http://localhost:8587${filePath}`} target="_blank" rel="noopener noreferrer">파일 다운로드</a>;
  };

  if (!post) return <p className="loading-text">게시글을 불러오는 중...</p>;

  return (
    <div className="board-view-container">
      <nav className="navbar fixed-top">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <div className="logo-text">
            <p>쓰담</p>
            <p>커뮤니티</p>
          </div>
        </div>
        <div className="navbar-links">
          <div className="navbar-item"><span>분류</span><span>및 폐기</span></div>
          <div className="navbar-item"><span>지역별</span><span>폐기물 처리</span></div>
          <div className="navbar-item"><span>기부</span><span>및 중고거래</span></div>
          <div className="navbar-item"><span>쓰담</span><span>커뮤니티</span></div>
          <div className="navbar-item"><span>폐기물</span><span>캘린더</span></div>
        </div>
      </nav>

      <h2 className="board-title">게시글 상세보기</h2>
      <table className="table board-table">
        <tbody>
          <tr><th>번호</th><td>{post.board_idx}</td><th>아이디</th><td>{post.email}</td></tr>
          <tr><th>작성일</th><td>{post.created_date}</td><th>조회수</th><td>{post.visit_count}</td></tr>
          <tr><th>제목</th><td colSpan="3">{post.title}</td></tr>
          <tr><th>내용</th><td colSpan="3">{post.content}</td></tr>
          {post.ofile && (
            <tr>
              <th>첨부파일</th>
              <td>
                {renderFileContent(post.ofile)}
              </td>
            </tr>
          )}
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
      {/* 좋아요 버튼과 댓글 입력창을 한 줄에 배치 */}
      <div className="like-comment-container">
        {/* 좋아요 버튼 */}
        <div className="like-section">
          <LikeButton boardId={post.board_idx} email={user?.email} />
        </div>

        {user && (
          <div className="comment-input">
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="댓글을 입력하세요"></textarea>
            <button className="btn btn-primary" onClick={handleAddComment}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        )}
      </div>
      <div className="button-group">
        {user && (
          <>
            <button className="btn btn-primary" onClick={() => navigate(`/commBoardEdit/${boardId}`)}>수정하기</button>
            <button className="btn btn-danger" onClick={handleDelete}>삭제하기</button>
          </>
        )}
        <button className="btn btn-secondary" onClick={() => navigate("/commBoardList")}>목록으로</button>
      </div>
    </div>
  );
};

export default BoardView;