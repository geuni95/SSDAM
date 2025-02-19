import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./boardedit.css";

const BoardEdit = ({ user }) => {
    const navigate = useNavigate();
    const { boardId } = useParams();

    const [formData, setFormData] = useState({
        board_idx: "",
        title: "",
        content: "",
        email: "",
        existingFile: "",
    });

    const [selectedFile, setSelectedFile] = useState(null); // 새 파일 업로드 상태 추가
    const [filePreview, setFilePreview] = useState(""); // 파일 미리보기 URL

    //게시글 데이터 불러오기
    useEffect(() => {
        fetch(`http://localhost:8587/api/commBoardView?board_idx=${boardId}`)
            .then(response => response.json())
            .then(data => {
                setFormData({
                    board_idx: data.board_idx,
                    title: data.title,
                    content: data.content,
                    email: data.email,
                    existingFile: data.ofile || "",
                });

                //기존 파일 미리보기 설정
                if (data.ofile) {
                    setFilePreview(`http://localhost:8587${data.ofile}`);
                }
            })
            .catch(error => console.error(" 데이터 로드 실패:", error));
    }, [boardId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file)); //새 파일 미리보기 업데이트
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || user.email !== formData.email) {
            alert("게시글 수정 권한이 없습니다.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("board_idx", formData.board_idx);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("email", formData.email);

        if (selectedFile) {
            formDataToSend.append("file", selectedFile); //새 파일 업로드 추가
        }

        try {
            const response = await fetch("http://localhost:8587/api/commBoardUpdate", {
                method: "POST",
                body: formDataToSend, //FormData로 전송
            });

            const data = await response.json();
            if (data.result === 1) {
                alert("게시글이 수정되었습니다.");
                navigate(`/commBoardView/${boardId}`);
            } else {
                alert("게시글 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error(" 수정 실패:", error);
            alert("서버 오류 발생! 다시 시도해주세요.");
        }
    };

    return (
        <div className="board-edit-container">
            <h2 className="board-title">게시글 수정</h2>
            <form className="board-form" onSubmit={handleSubmit} encType="multipart/form-data">
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
                
                {/* 파일 업로드 추가 */}
                <div className="form-group">
                    <label>파일 첨부</label>
                    <div className="file-upload">
                        <input type="file" id="file" className="file-input" onChange={handleFileChange} />
                        <label htmlFor="file">파일 선택</label>
                        <span className="file-name">{selectedFile ? selectedFile.name : "선택된 파일 없음"}</span>
                    </div>

                    {/* 기존 파일 미리보기 */}
                    {filePreview && (
                        <div className="file-preview-container">
                            <p>현재 파일:</p>
                            {filePreview.match(/\.(jpeg|jpg|png|gif)$/) ? (
                                <img src={filePreview} alt="첨부파일 미리보기" className="file-preview" />
                            ) : (
                                <a href={filePreview} target="_blank" rel="noopener noreferrer">파일 다운로드</a>
                            )}
                        </div>
                    )}
                </div>

                <div className="button-container">
                    <button type="submit" className="btn btn-success">수정 완료</button>
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">취소</button>
                </div>
            </form>
        </div>
    );
};

export default BoardEdit;