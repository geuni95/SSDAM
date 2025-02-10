import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import UploadBox from "./UploadBox/UploadBox";
import FileInfo from './UploadBox/FileInfo';
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import MemberInfo from "./MemberInfo/MemberInfo";
import EditMember from "./editMember/editMember";
import MailSearch from "./AccountSearch/MailSearch";
import PwdSearch from "./pwdSearch/PwdSearch";
import Board from "./CommBoard/Board";
import BoardWrite from "./CommBoard/BoardWrite";
import BoardView from "./CommBoard/BoardView";
import BoardEdit from "./CommBoard/BoardEdit";

function App() {
   // ✅ useState를 `null`이 아닌, `localStorage`에서 불러온 값으로 초기화
   const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  
  // ✅ localStorage에서 로그인 상태 유지
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage user={user} onLogout={handleLogout} />} />
          <Route path="/upload" element={<UploadBox />} />
          <Route path="/file-info" element={<FileInfo />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/edit" element={<EditMember />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/member-info" element={<MemberInfo />} />
          <Route path="/mailSearch" element={<MailSearch />} />
          <Route path="/pwdSearch" element={<PwdSearch />} />
          <Route path="/commBoardList" element={<Board user={user} onLogout={handleLogout}/>} />
          <Route path="/commBoardView/:boardId" element={<BoardView user={user} />} />  
          <Route path="/commBoardEdit/:boardId" element={<BoardEdit user={user} />} />  
          <Route path="/commBoardView/:boardId" element={<BoardView user={user} />} />
          <Route path="/commBoardWrite" element={<BoardWrite user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
