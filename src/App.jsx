import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage"; // MainPage의 경로 수정
import UploadBox from "./UploadBox/UploadBox";
import FileInfo from './UploadBox/FileInfo';
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import MemberInfo from "./MemberInfo/MemberInfo";
import MailSearch from "./MailSearch/MailSearch";
import PassWord from "./PassWord/PassWord";
import Board from "./Board/Board";
import InforMation from "./InforMation/InforMation";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/upload" element={<UploadBox />} />
          <Route path="/file-info" element={<FileInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/member-info" element={<MemberInfo />} />
          <Route path="/mail-search" element={<MailSearch />} />
          <Route path="/password" element={<PassWord />} />
          <Route path="/board" element={<Board />} />
          <Route path="/information" element={<InforMation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
