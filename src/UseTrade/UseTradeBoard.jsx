import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import logo from "../assets/images/logo.svg";
import "../UseTrade/usetradeboard.css";  // ✅ CSS 파일 불러오기

const UseTradeBoard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ boardList: [], totalPages: 1 });
    const [currentPage, setCurrentPage] = useState(0);
    const [searchWord, setSearchWord] = useState(""); 
    const [searchField, setSearchField] = useState("title"); 

    const rowsPerPage = 10;

    useEffect(() => {
        fetchBoardList(searchWord, searchField, currentPage);
    }, [currentPage]);

    // 📡 중고거래 게시판 목록 불러오기 함수
    const fetchBoardList = (query = "", field = "title", page = 0) => {
        let url = `http://localhost:8587/api/tradeBoardList?pageNum=${page + 1}`;
        let options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        };

        if (query.trim()) {
            url = "http://localhost:8587/api/tradeBoardSearch";
            options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    searchField: field,
                    searchWord: [query],
                    pageNum: page + 1,
                }),
            };
        }

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                setData({
                    boardList: data.boardList || data || [],
                    totalPages: data.totalPages || 1,
                    totalCount: data.totalCount || (data.length || 0),
                });
            })
            .catch((error) => console.error("❌ 게시글 불러오기 실패:", error));
    };

    // 🔍 검색어 변경 핸들러
    const handleSearchChange = (e) => {
        setSearchWord(e.target.value);
    };

    // 🔍 검색 필드 변경 핸들러
    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    // 🔍 검색 실행 함수
    const handleSearch = () => {
        if (!searchWord.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }
        setCurrentPage(0);
        fetchBoardList(searchWord, searchField, 0);
    };

    // 📌 페이지 변경 핸들러
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        fetchBoardList(searchWord, searchField, selected);
    };

    return (
        <div className="use-trade-board-container">
            {/* 네비게이션 바 */}
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <div className="logo-text">
                        <p>쓰담</p>
                        <p>중고거래</p>
                    </div>
                </div>
                
                <div className="navbar-links flex-grow flex justify-center">
                  <div className="navbar-item" onClick={() => navigate("/sortDump")}>
                    <span>분류</span><span>및 폐기</span>
                </div>
                  <div className="navbar-item"><span>지역별</span><span>폐기물 처리</span></div>
                  <div className="navbar-item"><span>기부</span><span>및 중고거래</span></div>
                  <div className="navbar-item" onClick={() => navigate("/commBoardList")}>
                    <span>쓰담</span><span>커뮤니티</span>
                  </div>
                  <div className="navbar-item"><span>폐기물</span><span>캘린더</span></div>
              </div>
            </nav>

            <h2 className="use-trade-board-title">중고거래 게시판</h2>

            <div className="search-bar">
                <select className="search-select" value={searchField} onChange={handleSearchFieldChange}>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                    <option value="email">작성자</option>
                </select>

                <input
                    type="text"
                    className="search-input"
                    placeholder="검색어를 입력하세요"
                    value={searchWord}
                    onChange={handleSearchChange}
                />

                <button className="btn btn-primary" onClick={handleSearch}>
                    검색
                </button>
            </div>

            {/* 테이블 */}
            <div className="table-container">
                <Table striped bordered hover className="use-trade-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>작성일</th>
                            <th>작성자</th>
                            <th>거래 상태</th>
                            <th>가격</th>
                            <th>상품명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.boardList.length > 0 ? (
                            data.boardList.map((row, index) => (
                                <tr
                                    key={row.board_idx}
                                    onClick={() => navigate(`/tradeBoardView/${row.board_idx}`)}
                                >
                                    <td>{data.totalCount - currentPage * rowsPerPage - index}</td>
                                    <td>{row.title}</td>
                                    <td>
                                        <span className={`trade-status ${row.category === "나눔" ? "status-free" : "status-sale"}`}>
                                            {row.category}
                                        </span>
                                    </td>
                                    <td>{row.price}원</td>
                                    <td>{row.email}</td>
                                    <td>{row.created_date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-results">검색 결과가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* 페이지네이션 */}
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

            {/* 푸터 */}
            <footer className="use-trade-footer">
                <p>© 2025 SSDAM. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default UseTradeBoard;