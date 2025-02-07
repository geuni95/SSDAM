import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import logo from "../assets/images/logo.svg";
import "./board.css";

const Board = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ boardList: [], totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    console.log(`📡 Fetching page: ${currentPage + 1}`);
    fetch(`http://localhost:8587/api/commBoardList?pageNum=${currentPage + 1}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("📡 API 응답 데이터 확인:", data);
        setData({
          boardList: data.boardList || [],
          totalPages: data.totalPages || 1,
          totalCount: data.totalCount || 0,
        });
      })
      .catch((error) => console.error("❌ 게시글 불러오기 실패:", error));
  }, [currentPage]); // ✅ 페이지 변경 시 API 호출

  const handlePageChange = ({ selected }) => {
    console.log("📌 페이지 변경됨:", selected + 1);
    setCurrentPage(selected);
  };

  return (
    <div className="board-container">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <div className="logo-text">
            <p>쓰담</p>
            <p>커뮤니티</p>
          </div>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate("/")}>홈</button>
          <button>정보</button>
          <button>서비스</button>
          <button className="login-btn">로그인</button>
        </div>
      </nav>

      <h2 className="board-title">자유게시판</h2>

      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {data.boardList.map((row, index) => (
              <tr
                key={row.board_idx}
                onClick={() => navigate(`/board/${row.board_idx}`)}
              >
                {/* ✅ 전체 게시글 개수를 기준으로 번호를 내림차순 정렬 */}
                <td>{data.totalCount - currentPage * rowsPerPage - index}</td>
                <td>{row.title}</td>
                <td>{row.email}</td>
                <td>{row.created_date}</td>
                <td>{row.visit_count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"〈"}
          nextLabel={"〉"}
          breakLabel={"..."}
          pageCount={data.totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"prev-btn"}
          nextClassName={"next-btn"}
        />
      </div>

      <footer className="board-footer">
        <p>© 2025 SSDAM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Board;
