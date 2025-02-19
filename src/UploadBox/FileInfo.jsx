import React from 'react';
import defaultTrashImage from '../assets/images/main.png'; // 기본 이미지 import
import './FileInfo.css'; // 추가된 스타일 파일

const FileInfo = ({ file, info }) => {
  if (!info) return null; // info가 없을 경우 아무것도 렌더링하지 않음

  return (
    <div className="file-info">
      <div className="result-box mt-4">
        <h3 className="mb-3">폐기물 분석 결과</h3>
        {/* 이미지와 설명을 중앙 정렬 */}
        <div className="image-container">
          <img
            src={file ? URL.createObjectURL(file) : defaultTrashImage} // 업로드된 이미지 또는 기본 이미지
            alt="Uploaded file preview"
            className="img-fluid rounded border mb-3"
          />
          <p>
            <strong>설명:</strong> {info.description}
          </p>
        </div>

        <div className="waste-info">
          <h4>유사 폐기물 추천</h4>
          <div className="similar-waste">
            {info.similarWaste && info.similarWaste.length > 0 ? (
              info.similarWaste.map((waste, index) => (
                <div key={index} className="waste-item">
                  <img src={waste.image} alt={waste.name} className="waste-thumbnail" />
                  <p><strong>{waste.name}</strong></p>
                  <p>스티커 가격: {waste.stickerPrice}원</p>
                  <p>처리 방법: {waste.disposalMethod}</p>
                </div>
              ))
            ) : (
              <p>유사한 폐기물 정보 없음</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileInfo;