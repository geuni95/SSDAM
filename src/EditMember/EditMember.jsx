import React from "react";
import editMemberImage from "../assets/images/editmember.jpg"; // 이미지 경로 확인
import "./editmember.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditMember = () => {
  return (
    <div className="editmember-container">
      <div className="editmember-content">
        {/* 왼쪽 이미지 영역 */}
        <div className="editmember-image">
          <img src={editMemberImage} alt="회원 정보 수정" />
        </div>

        {/* 오른쪽 회원정보 입력 폼 */}
        <div className="editmember-form">
          <h2 className="editmember-title">회원정보 수정</h2>
          <p className="editmember-subtitle">회원정보 변경 및 비밀번호 업데이트</p>

          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input type="text" className="form-control" id="name" placeholder="Name" />
            </div>

            <div className="mb-3">
              <label htmlFor="nickname" className="form-label">
                닉네임
              </label>
              <input type="text" className="form-control" id="nickname" placeholder="Username" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                새 비밀번호
              </label>
              <input type="password" className="form-control" id="password" placeholder="New password" />
            </div>

            <div className="d-flex gap-3 mt-4">
              <button type="submit" className="btn btn-success w-50">
                수정하기
              </button>
              <button type="button" className="btn btn-secondary w-50">
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMember;