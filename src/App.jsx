import React from "react";
import MainPage from "./MainPage/MainPage"; // MainPage의 경로 수정
import UploadBox from "./UploadBox/UploadBox";
import FileInfo from './UploadBox/FileInfo';

function App() {
  return (
    <div className="App">
      <MainPage /> {/* MainPage 컴포넌트를 렌더링 */}
      <UploadBox />
      <FileInfo />
    </div>
  );
}

export default App;