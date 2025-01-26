import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './UploadBox.css';
import FileInfo from './FileInfo';

const UploadBox = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('Dropped file:', file);
      setUploadedFile(file); // 업로드된 파일 상태 업데이트
    }
  };

  // 기본 쓰레기 이미지 정보
  const defaultInfo = {
    file: null,
    info: {
      type: '쓰레기',
      description: '업로드된 파일이 없습니다. 대신 기본 쓰레기 이미지를 표시합니다.',
      tips: [
        { title: '쓰레기 분리수거 팁', content: '쓰레기를 적절히 분리하는 방법.', link: '#' },
        { title: '재활용 가능한 물품 리스트', content: '재활용 가능한 품목들에 대한 자세한 설명.', link: '#' },
      ],
    },
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <h2 className="text-center mb-3">사진 업로드</h2>
      <p className="text-center text-muted mb-4">폐기물 사진을 업로드 해주세요.</p>

      {/* Upload Box */}
      <div
        className={`upload-box mx-auto ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <i className="upload-icon bi bi-cloud-upload"></i>
        <p className="mt-2">사진 파일을 선택하거나 드래그하여 업로드하세요.</p>
        <button className="btn btn-success mt-3">업로드</button>
      </div>

      {/* FileInfo 컴포넌트 렌더링 */}
      <FileInfo
        file={uploadedFile || new Blob(['default'], { type: 'image/png' })} // 기본 이미지 Blob 설정
        info={uploadedFile ? {
          type: 'Kardus',
          description: 'Gambar yang Anda unggah adalah sampah kardus. Jenis sampah ini dapat didaur ulang.',
          tips: [
            { title: 'Cara Daur Ulang Kardus', content: 'Langkah-langkah sederhana...', link: '#' },
            { title: 'Solusi Pengolahan Limbah Kardus', content: 'Metode inovatif...', link: '#' },
          ],
        } : defaultInfo.info}
      />
    </div>
  );
};

export default UploadBox;
