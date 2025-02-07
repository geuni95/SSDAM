import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import logo from '../assets/images/logo.svg';
import "./board.css";

const Board = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ boardList: [], totalPages: 1 });
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; // 한 페이지당 보여줄 행 개수

    useEffect(() => {
        fetch(`http://localhost:8587/api/commBoardList`)
            .then(response => response.json())
            .then(data => {
                console.log("API 데이터 확인:", data); // 🚨 콘솔로 응답 데이터 확인
                setData({
                    boardList: data.boardList || [], // 🚨 배열만 저장
                    totalPages: data.totalPages || 1
                });
            })
            .catch(error => console.error("게시글 불러오기 실패:", error));
    }, []);

    // 🔥 `boardList`에서 slice를 사용하도록 변경
    const currentRows = data.boardList.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage
    );

    // 페이지 변경 핸들러
    const handlePageChange = ({ selected }) => {
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
                        {currentRows.map((row, index) => (
                            <tr key={row.board_idx} onClick={() => navigate(`/board/${row.board_idx}`)}>
                                <td>{index + 1 + currentPage * rowsPerPage}</td>
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
