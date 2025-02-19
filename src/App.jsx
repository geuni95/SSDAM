import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import UploadBox from "./UploadBox/UploadBox";
import FileInfo from './UploadBox/FileInfo';
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import EditMember from "./EditMember/EditMember";
import MailSearch from "./AccountSearch/MailSearch";
import PwdSearch from "./pwdSearch/PwdSearch";
import Board from "./CommBoard/Board";
import BoardWrite from "./CommBoard/BoardWrite";
import BoardView from "./CommBoard/BoardView";
import BoardEdit from "./CommBoard/BoardEdit";
import SortDump from "./SortDump/SortDump";
import UseTradeWrite from "./UseTrade/UseTradeWrite";
import UseTradeView from "./UseTrade/UseTradeView";
import UseTradeBoard from "./UseTrade/UseTradeBoard";

function App() {
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  useEffect(() => {
    const getJwtFromCookie = () => {
      const cookies = document.cookie.split("; ");
      const jwtCookie = cookies.find((row) => row.startsWith("jwtToken="));
      return jwtCookie ? jwtCookie.split("=")[1] : null;
    };
    
    const checkAuth = async () => {
      try {
        const jwtToken = getJwtFromCookie(); // ✅ 쿠키에서 JWT 가져오기
        if (!jwtToken) {
          console.warn("🚨 JWT 토큰이 존재하지 않습니다.");
          setUser(null);
          return;
        }
    
        const response = await fetch("http://localhost:8587/api/auth/check", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}` // ✅ JWT 포함
          }
        });
    
        if (!response.ok) {
          console.warn(`🚨 인증 확인 실패! 상태 코드: ${response.status}`);
          setUser(null);
          return;
        }
    
        const data = await response.json();
        if (data.status === "authenticated") {
          const userInfo = {
              email: data.email,
              role: data.role,
              name: data.name,
              nick_name: data.nick_name,
              idx: data.idx,
          };
          setUser(userInfo);
          localStorage.setItem("user", JSON.stringify(userInfo));
      }
      } catch (error) {
        console.error("❌ 로그인 상태 확인 중 오류 발생:", error);
        setUser(null);
      }
    };
    

    checkAuth();
  }, []);

  return (
    <Router>
      <AppRoutes user={user} setUser={setUser} />
    </Router>
  );
}

// ✅ useNavigate()를 `AppRoutes` 내부에서 사용하여 오류 해결
const AppRoutes = ({ user, setUser }) => {
  
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ handleLogout 함수 수정
  const handleLogout = async () => {
    try {
      const previousPage = location.pathname;

      // ✅ 백엔드 로그아웃 요청 (쿠키 삭제)
      await fetch("http://localhost:8587/api/logout", {
        method: "POST",
        credentials: "include",
      });

      // ✅ 쿠키 삭제
      document.cookie = "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  
      // ✅ React 상태 초기화
      localStorage.removeItem("user");
      setUser(null);
  
      // ✅ 로그아웃 후 이전 페이지로 이동
      navigate(previousPage, { replace: true });
    } catch (error) {
      console.error("❌ 로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<MainPage user={user} onLogout={handleLogout} />} />
      <Route path="/upload" element={<UploadBox />} />
      <Route path="/file-info" element={<FileInfo />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/edit" element={<EditMember />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mailSearch" element={<MailSearch />} />
      <Route path="/pwdSearch" element={<PwdSearch />} />
      <Route path="/commBoardList" element={<Board user={user} onLogout={handleLogout}/>} />
      <Route path="/commBoardView/:boardId" element={<BoardView user={user} />} />  
      <Route path="/commBoardEdit/:boardId" element={<BoardEdit user={user} />} />  
      <Route path="/commBoardWrite" element={<BoardWrite user={user} />} />
      <Route path="/sortDump" element={<SortDump />} />
      <Route path="/usetradeview" element={<UseTradeView />} />
      <Route path="/usetradewrite" element={<UseTradeWrite />} />
      <Route path="/usetradeboard" element={<UseTradeBoard />} />
    </Routes>
  );
};

export default App;
