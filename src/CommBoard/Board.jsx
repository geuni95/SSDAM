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
    const [searchWord, setSearchWord] = useState(""); // 검색어 상태 추가
    const [searchField, setSearchField] = useState("title"); // 검색 필드 (기본값: 제목 검색)
    const [user, setUser] = useState(null); // 로그인 상태 추가
    const rowsPerPage = 10;

    // 쿠키에서 JWT 가져오기
    const getJwtFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((row) => row.startsWith("jwtToken="));
    return jwtCookie ? jwtCookie.split("=")[1] : null;
    };

      // 로그인 여부 확인
      useEffect(() => {
        const jwtToken = getJwtFromCookie();
        if (jwtToken) {
            fetch("http://localhost:8587/api/auth/check", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "authenticated") {
                    setUser({ email: data.email, role: data.role });
                } else {
                    setUser(null);
                }
            })
            .catch((error) => {
                console.error(" 로그인 상태 확인 중 오류 발생:", error);
                setUser(null);
            });
        } else {
            setUser(null);
        }
    }, []);

   // 로그아웃 함수
   const handleLogout = () => {
    document.cookie = "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("user");
    setUser(null);
    navigate("/commBoardList");
    };

    useEffect(() => {
        fetchBoardList(searchWord, searchField, currentPage);
    }, [currentPage]);

    
    // 게시판 목록 불러오기 함수 (검색 포함)
    const fetchBoardList = (query = "", field = "title", page = 0) => {
        let url = "http://localhost:8587/api/commBoardList?pageNum=" + (page + 1);
        let options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        };

        if (query.trim()) {
            url = "http://localhost:8587/api/commBoardSearch";
            options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    searchField: field,
                    searchWord: [query],
                    pageNum: page + 1, // 검색 요청에도 `pageNum` 추가
                }),
            };
        }

        console.log(`📡 Fetching URL: ${url}`, options);

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log("📡 API 응답 데이터 확인:", data);
                setData({
                    boardList: data.boardList || data || [], // 검색 결과 반영
                    totalPages: data.totalPages || 1, // 검색 결과도 페이징 가능하도록 수정
                    totalCount: data.totalCount || (data.length || 0),
                });
            })
            .catch((error) => console.error(" 게시글 불러오기 실패:", error));
    };

    // 검색어 변경 핸들러
    const handleSearchChange = (e) => {
        setSearchWord(e.target.value);
    };

    // 검색 필드 변경 핸들러
    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    // 검색 실행 함수
    const handleSearch = () => {
        if (!searchWord.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }
        setCurrentPage(0); // 검색 시 첫 페이지부터 조회
        fetchBoardList(searchWord, searchField, 0);
    };

    // 페이지 변경 핸들러
    const handlePageChange = ({ selected }) => {
        console.log("페이지 변경됨:", selected + 1);
        setCurrentPage(selected);
        fetchBoardList(searchWord, searchField, selected);
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
               
                <div className="navbar-item" onClick={() => navigate("/")}>
                    <span>홈</span>
                </div>    
                <div className="navbar-item"><span>분류</span><span>및 폐기</span></div>
                  <div className="navbar-item"><span>지역별</span><span>폐기물 처리</span></div>
                  <div className="navbar-item"><span>기부</span><span>및 중고거래</span></div>
                  
                  <div className="navbar-item"><span>폐기물</span><span>캘린더</span></div>

                <div className="navbar-right flex items-center">
                  {!user ? (
                        <button className="login-btn" onClick={() => navigate("/login", { state: { from: location.pathname } })}>
                        로그인
                        </button>
                    ) : (
                        <button className="logout-btn" onClick={handleLogout}>
                            로그아웃
                        </button>
                    )}
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
                        {data.boardList.length > 0 ? (
                            data.boardList.map((row, index) => (
                                <tr
                                    key={row.board_idx}
                                    onClick={() => navigate(`/commBoardView/${row.board_idx}`)}
                                >
                                    <td>{data.totalCount - currentPage * rowsPerPage - index}</td>
                                    <td>{row.title}</td>
                                    <td>{row.email}</td>
                                    <td>{row.created_date}</td>
                                    <td>{row.visit_count}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-results">검색 결과가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                
                {/* 검색 입력 필드 & 버튼 추가 */}
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

                <div className="btn-write">
                    <button className="btn btn-primary" onClick={() => navigate("/commBoardWrite")}>
                        게시글 작성
                    </button>
                </div>
            </div>

            <div className="pagination-container">
                <ReactPaginate
                    previousLabel={"〈"}
                    nextLabel={"〉"}
                    breakLabel={"..."}
                    pageCount={data.totalPages} // 검색 결과에도 페이징 적용
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