import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage"; // MainPage의 경로 수정
import UploadBox from "./UploadBox/UploadBox";
import FileInfo from './UploadBox/FileInfo';
import Login from "./Login/Login";

function App() {
  return (
    <div className="App">
      <MainPage /> {/* MainPage 컴포넌트를 렌더링 */}
      <UploadBox />
      <FileInfo />
      <Login />
    </div>
  );
}

export default App;