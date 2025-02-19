import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./board.css";

const BoardWrite = ({ user }) => {
    const navigate = useNavigate();

    // ✅ 로그인 확인 후 비로그인 상태면 로그인 페이지로 이동
    useEffect(() => {
        if (!user || !user.email) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    }, [user, navigate]);

    // 🔹 formData 상태 (파일 포함)
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        email: user?.email || "", 
    });

    const [selectedFile, setSelectedFile] = useState(null); // 파일 상태 추가
    const [isUploading, setIsUploading] = useState(false); // 업로드 상태

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024); // MB 단위로 변환
            const allowedTypes = ['image/jpeg', 'image/png']; // 허용되는 파일 형식

            // 파일 크기 체크
            if (fileSizeInMB > 5) {
                alert('파일 크기는 5MB 이하로 업로드해야 합니다.');
                return;
            }

            // 파일 형식 체크
            if (!allowedTypes.includes(file.type)) {
                alert('JPEG 또는 PNG 파일만 업로드 가능합니다.');
                return;
            }

            setSelectedFile(file); // 파일 상태 업데이트
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!formData.title || !formData.content) {
            alert("제목과 내용은 필수 입력 사항입니다.");
            return;
        }

        setIsUploading(true); // 업로드 시작
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("content", formData.content);
            formDataToSend.append("email", formData.email);
            if (selectedFile) {
                formDataToSend.append("file", selectedFile);
            }

            const response = await fetch("http://localhost:8587/api/commBoardWrite", {
                method: "POST",
                body: formDataToSend, // ✅ FormData로 전송
            });

            const data = await response.json();
            console.log("서버 응답 데이터:", data);
            if (data.result === 1) {
                alert("게시글이 등록되었습니다.");
                navigate("/commBoardList");
                setSelectedFile(null); // 파일 상태 초기화
            } else {
                alert("등록 실패: 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("❌ 게시글 등록 실패:", error);
            alert("서버 오류 발생! 다시 시도해주세요.");
        } finally {
            setIsUploading(false); // 업로드 완료
        }
    };

    return (
        <div className="board-write-container">
            <h2 className="board-title">게시글 작성</h2>
            <form className="board-form" onSubmit={handleSubmit} encType="multipart/form-data">
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
                <div className="form-group">
                    <label>파일 첨부</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                    {/* 선택된 파일 이름 표시 */}
                    {selectedFile && <div>선택된 파일: {selectedFile.name}</div>}
                </div>
                {isUploading && <div>업로드 중...</div>} {/* 업로드 상태 표시 */}
                <button type="submit" className="btn btn-success w-100">
                    작성 완료
                </button>
            </form>
        </div>
    );
};

export default BoardWrite;