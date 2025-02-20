import React, { useState, useEffect } from "react";
import axios from "axios";
import "./calendar.css";
import logo from "../assets/images/logo.svg";

const CalenDar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [wasteData, setWasteData] = useState([]);
    const today = new Date(); // 현재 날짜 가져오기

    useEffect(() => {
        fetchWasteData();
    }, [currentDate]);

    const fetchWasteData = async () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        try {
            const response = await axios.get(`http://localhost:8080/api/calendar/${year}/${month}`);
            setWasteData(response.data);
        } catch (error) {
            console.error("폐기물 데이터를 가져오는 중 오류 발생", error);
        }
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();

    return (
        <div className="calendar-container">
            {/* 네비게이션 바 */}
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <div className="logo-text">
                        <p>쓰담</p>
                        <p>쓰담</p>
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

            <div className="calendar-header">
                <button onClick={handlePrevMonth}>{"<"}</button>
                <h2>{year}년 {month + 1}월</h2>
                <button onClick={handleNextMonth}>{">"}</button>
            </div>
            <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="calendar-day">{day}</div>
                ))}
                {Array(firstDay).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} className="empty-day" />
                ))}
                {Array(daysInMonth).fill(null).map((_, i) => {
                    const day = i + 1;
                    const waste = wasteData.find(w => w.day === day);
                    const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
                    
                    return (
                        <div key={day} className={`calendar-day-number ${isToday ? "today" : ""} ${waste ? "waste-day" : ""}`}>
                            {day}
                            {waste && <span className="waste-label">{waste.wasteType}</span>}
                        </div>
                    );
                })}
            </div>
            {/* 푸터 */}
            <footer className="calendar-footer">
                <p>© 2025 SSDAM. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CalenDar;