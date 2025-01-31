import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage"; // MainPage의 경로 수정
import UploadBox from "./UploadBox/UploadBox";
import FileInfo from './UploadBox/FileInfo';
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import MemberInfo from "./MemberInfo/MemberInfo";

function App() {
  return (
    <div className="App">
      <MainPage /> {/* MainPage 컴포넌트를 렌더링 */}
      <UploadBox />
      <FileInfo />
      <Login />
      <SignUp />
      <MemberInfo />
    </div>
  );
}

export default App;