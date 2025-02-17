import React, { useState, useEffect } from 'react';

const LikeButton = ({ boardId, email }) => {
  const [likeCount, setLikeCount] = useState('🔄 로딩 중...');
  const [liked, setLiked] = useState(false);

  // ✅ 서버에서 likeCount 가져오고, localStorage에서 liked 상태 설정
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(`http://localhost:8587/api/getLikeCount?board_idx=${boardId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (response.ok) {
          setLikeCount(data.likeCount);
          const localLiked = localStorage.getItem(`liked_${boardId}_${email}`) === 'true';
          setLiked(localLiked);
        } else {
          setLikeCount(0);
        }
      } catch (error) {
        console.error('❌ likeCount 가져오기 실패:', error);
        setLikeCount(0);
      }
    };

    fetchLikeCount();
  }, [boardId, email]);

  // ✅ 좋아요 토글 요청
  const handleLikeToggle = async () => {
    try {
      const response = await fetch(`http://localhost:8587/api/like?board_idx=${boardId}&email=${email}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();

      if (data.result === 1) {
        setLikeCount(data.likeCount);
        const newLiked = !liked;
        setLiked(newLiked);
        // 🎯 localStorage에 좋아요 상태 저장
        localStorage.setItem(`liked_${boardId}_${email}`, newLiked.toString());
      } else {
        alert('❌ 좋아요 변경 실패');
      }
    } catch (error) {
      console.error('❌ 좋아요 요청 실패:', error);
    }
  };

  // 🖼️ UI 출력
  return (
    <button onClick={handleLikeToggle} className={`like-button ${liked ? 'liked' : ''}`}>
      {liked ? '💙' : '🤍'} {likeCount}
    </button>
  );
};

export default LikeButton;
