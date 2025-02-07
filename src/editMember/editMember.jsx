import React, { useState } from "react";
import editMemberImage from "../assets/images/editmember.jpg";
import "./editmember.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const EditMember = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
      idx: storedUser ? storedUser.idx : "",
      name: storedUser ? storedUser.name : "",
      nick_name: storedUser ? storedUser.nick_name : "",
      email: storedUser ? storedUser.email : "",
      role: storedUser ? storedUser.role : "",
      pass: ""  // 새 비밀번호는 기본적으로 빈 값
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      // 최신 formData를 기반으로 requestData 생성
      const requestData = { 
          idx: formData.idx, 
          name: formData.name,
          nick_name: formData.nick_name,
          email: formData.email,
          role: formData.role
      };

      // 비밀번호가 입력되었을 경우에만 추가
      if (formData.pass.trim()) {
          requestData.pass = formData.pass;
      }

      console.log(" 서버로 전송할 데이터:", requestData); // 

      try {
          const response = await fetch("http://localhost:8587/api/edit", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestData) // 비밀번호가 없으면 pass 필드 제외됨
          });

          const data = await response.json();
          console.log("회원정보 수정 응답:", data);

          if (data.result === 1) {
              alert("회원정보 수정 성공!");
              navigate("/");
          } else {
              alert("회원정보 수정 실패: 다시 시도해주세요.");
          }
      } catch (error) {
          console.error("회원정보 수정 요청 중 오류 발생:", error);
          alert("서버 오류 발생! 다시 시도해주세요.");
      }
  };

  return (
    <div className="editmember-container">
      <div className="editmember-content">
        <div className="editmember-image">
          <img src={editMemberImage} alt="회원 정보 수정" />
        </div>

        <div className="editmember-form">
          <h2 className="editmember-title">회원정보 수정</h2>
          <p className="editmember-subtitle">회원정보 변경 및 비밀번호 업데이트</p>

          <form onSubmit={handleSubmit}>
           
            <div className="mb-3">
              <label htmlFor="name" className="form-label">이름</label>
              <input type="text" className="form-control" name="name" 
                  placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="nick_name" className="form-label">닉네임</label>
              <input type="text" className="form-control" name="nick_name" 
                  placeholder="Nickname" value={formData.nick_name} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">이메일</label>
              <input type="email" className="form-control" name="email" 
                  placeholder="Email" value={formData.email} onChange={handleChange} disabled />
            </div>

            <div className="mb-3">
              <label htmlFor="pass" className="form-label">새 비밀번호</label>
              <input type="password" className="form-control" name="pass" 
                  placeholder="New password" value={formData.pass}  
                  onChange={(e) => setFormData({ ...formData, pass: e.target.value })} 
                />
            </div>

            <div className="d-flex gap-3 mt-4">
              <button type="submit" className="btn btn-success w-50">수정하기</button>
              <button type="button" className="btn btn-secondary w-50" onClick={() => navigate("/")}>취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMember;
