import React from "react";
import memberInfoImage from "../assets/images/memberinfo.png"; // 이미지 경로 수정
import "./memberinfo.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MemberInfo = () => {
  return (
    <div className="memberinfo-container">
      <div className="memberinfo-content">
        {/* 왼쪽 이미지 영역 */}
        <div className="memberinfo-image">
          <img src={memberInfoImage} alt="회원 정보" />
        </div>

        {/* 오른쪽 회원정보 입력 폼 */}
        <div className="memberinfo-form">
          <h2 className="memberinfo-title">회원정보</h2>
          <p className="memberinfo-subtitle">회원정보 수정 및 탈퇴</p>

          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input type="text" className="form-control" id="name" placeholder="이름 입력" />
            </div>

            <div className="mb-3">
              <label htmlFor="nickname" className="form-label">
                닉네임
              </label>
              <input type="text" className="form-control" id="nickname" placeholder="닉네임 입력" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input type="email" className="form-control" id="email" placeholder="이메일 입력" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input type="password" className="form-control" id="password" placeholder="비밀번호 입력" />
            </div>

            <div className="d-flex gap-3 mt-4">
              <button type="submit" className="btn btn-success w-50">
                회원 정보 수정
              </button>
              <button type="button" className="btn btn-secondary w-50">
                회원 탈퇴
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
