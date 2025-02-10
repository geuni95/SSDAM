import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./board.css";

const BoardWrite = ({ user }) => { // ✅ user를 props로 받음
    const navigate = useNavigate();

    // ✅ 현재 user 값 확인 (콘솔 출력)
    console.log("📌 BoardWrite.jsx에서 받은 user 값:", user);

    // ✅ 로그인하지 않은 경우 자동으로 로그인 페이지로 이동
    useEffect(() => {
        if (!user || !user.email) {  // 🚨 user가 null이거나 email이 없는 경우 로그인 필요
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    }, [user, navigate]);

    // 🔹 이메일 필드는 로그인된 사용자 정보를 활용
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        email: user?.email || "", // ✅ 자동으로 로그인된 이메일 사용
    });

    useEffect(() => {
        console.log("📌 현재 formData 값:", formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ 이메일 값이 비어있는 경우 체크
        if (!formData.email) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8587/api/commBoardWrite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.result === 1) {
                alert("게시글이 등록되었습니다.");
                navigate("/commBoardList");
            } else {
                alert("등록 실패: 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("❌ 게시글 등록 실패:", error);
            alert("서버 오류 발생! 다시 시도해주세요.");
        }
    };

    return (
        <div className="board-write-container">
            <h2 className="board-title">게시글 작성</h2>
            <form className="board-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="제목을 입력하세요"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        name="content"
                        className="form-control"
                        placeholder="내용을 입력하세요"
                        rows="5"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">
                    작성 완료
                </button>
            </form>
        </div>
    );
};

export default BoardWrite;
