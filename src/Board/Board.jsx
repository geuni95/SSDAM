import React, { useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate"; // react-paginate 추가
import logo from '../assets/images/logo.svg'; // 로고 파일을 import
import "./board.css";

const Board = () => {
    const navigate = useNavigate();

    // 샘플 데이터 (API 연동 가능)
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; // 한 페이지당 보여줄 행 개수

    useEffect(() => {
        // API 호출 대신 샘플 데이터 사용
        const sampleData = Array.from({ length: 150 }, (_, index) => ({
            year: 2023,
            province: "D.I. Yogyakarta",
            city: `Kab. ${index + 1}`,
            facility: `TPA Facility ${index + 1}`,
            type: "TPA Pemda (Non Regional)",
            wasteIn: (Math.random() * 10000).toFixed(2),
            wasteLandfill: (Math.random() * 10000).toFixed(2),
            openHour: "06:00 - 12:00 WIB",
        }));

        setData(sampleData);
    }, []);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // 현재 페이지 데이터 계산
    const indexOfLastRow = (currentPage + 1) * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    // 페이지 변경 핸들러
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="board-container">
            {/* 네비게이션 바 */}
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <div className="logo-text">
                        <p>쓰담</p>
                        <p>쓰담</p>
                    </div>
                </div>
                <div className="nav-links">
                    <button onClick={() => navigate("/")}>홈</button>
                    <button>정보</button>
                    <button>서비스</button>
                    <button className="login-btn">로그인</button>
                </div>
            </nav>

            {/* 제목 */}
            <h2 className="board-title">자유게시판</h2>

            {/* 필터 옵션 */}
            <div className="filters">
                <Dropdown>
                    <Dropdown.Toggle variant="success">년도</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>2025</Dropdown.Item>
                        <Dropdown.Item>2024</Dropdown.Item>
                        <Dropdown.Item>2023</Dropdown.Item>
                        <Dropdown.Item>2022</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="success">지역</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>서울</Dropdown.Item>
                        <Dropdown.Item>부산</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* 데이터 테이블 */}
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
                            <tr key={index}>
                                <td>{index + 1 + currentPage * rowsPerPage}</td> {/* 게시물 번호 */}
                                <td>{row.province}</td> {/* 제목 */}
                                <td>{row.city}</td> {/* 작성자 */}
                                <td>{row.facility}</td> {/* 작성일 */}
                                <td>{row.wasteIn}</td> {/* 조회수 */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* 페이지네이션 */}
            <div className="pagination-container">
                <ReactPaginate
                    previousLabel={"〈"} // 이전 버튼
                    nextLabel={"〉"} // 다음 버튼
                    breakLabel={"..."}
                    pageCount={totalPages} // 전체 페이지 수
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5} // 한 번에 보여줄 페이지 개수
                    onPageChange={handlePageChange} // 페이지 변경 핸들러
                    containerClassName={"pagination"} // 전체 스타일
                    activeClassName={"active"} // 선택된 페이지 스타일
                    previousClassName={"prev-btn"}
                    nextClassName={"next-btn"}
                />
            </div>

            {/* 푸터 */}
            <footer className="board-footer">
                <p>© 2025 SSDAM. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Board;
