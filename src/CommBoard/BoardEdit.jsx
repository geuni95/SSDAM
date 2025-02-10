import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./board.css";

const BoardEdit = ({ user }) => {
    const navigate = useNavigate();
    const { boardId } = useParams();

    const [formData, setFormData] = useState({
        board_idx: "",
        title: "",
        content: "",
        email: ""
    });

    // ✅ 게시글 데이터 불러오기
    useEffect(() => {
        fetch(`http://localhost:8587/api/commBoardView?board_idx=${boardId}`)
            .then(response => response.json())
            .then(data => {
                setFormData({
                    board_idx: data.board_idx,
                    title: data.title,
                    content: data.content,
                    email: data.email
                });
            })
            .catch(error => console.error("❌ 데이터 로드 실패:", error));
    }, [boardId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || user.email !== formData.email) {
            alert("게시글 수정 권한이 없습니다.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8587/api/commBoardUpdate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            if (data.result === 1) {
                alert("게시글이 수정되었습니다.");
                navigate(`/commBoardView/${boardId}`);
            } else {
                alert("게시글 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("❌ 수정 실패:", error);
            alert("서버 오류 발생! 다시 시도해주세요.");
        }
    };

    return (
        <div className="board-edit-container">
            <h2 className="board-title">게시글 수정</h2>
            <form className="board-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
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
                        rows="5"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>이메일</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.email}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">
                    수정 완료
                </button>
                <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary w-100 mt-2">
                    취소
                </button>
            </form>
        </div>
    );
};

export default BoardEdit;
