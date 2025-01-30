import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';

const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src="/src/assets/images/signup-illustration.png" alt="Join Us" />
            </div>
            <div className="signup-form">
                <h2 className="signup-title">회원가입</h2>
                <form>
                    <div className="mb-3">
                        <label className="form-label">이름</label>
                        <input type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">닉네임</label>
                        <input type="text" className="form-control" placeholder="Username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">이메일</label>
                        <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-check mb-3">
                        <input type="checkbox" className="form-check-input" id="termsCheck" />
                        <label className="form-check-label" htmlFor="termsCheck">
                            서비스 약관 및 플랫폼 개인 정보 보호 정책에 동의합니다.
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success w-100">확인</button>
                </form>
                <p className="mt-3 text-center">
                    이미 계정이 있으신가요? <a href="/login" className="login-link">로그인</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
