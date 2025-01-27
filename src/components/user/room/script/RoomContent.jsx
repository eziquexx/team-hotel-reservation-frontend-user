
import React, { useState, useEffect } from "react";
import RoomType from "./RoomType";
import '../css/RoomContent.css'

// RoomContent 컴포넌트
export default function RoomContent() {
  const env_API_BASE_URL = process.env.REACT_APP_API_URL;
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(`${env_API_BASE_URL}/api/users/rooms`, {
          method: 'GET',
          headers: {
            "Content-Type" : "application/json",
          },
          credentials: 'include',
        });
        const data = await response.json();
        setRoomTypes(data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  return (
    <div className="RoomView_Top">
    <nav className="RoomView_container">
      <h2>RoomView</h2>
      <div className="room-content">
      <div className="room-header">
        <h1>객실</h1>
        <p>서울의 역사와 비즈니스의 중심 소공동에 위치한 HJ호텔은 최대의 규모를 갖춘 한국 최고의 럭셔리 호텔입니다.<br/>
           서울 다운타운의 중심에서 남산과 명동, 스카이라인을 감상할 수 있는 롯데호텔 서울은 세계적인 인테리어 회사들이 참가하여 설계한 독창적인 객실을 갖추고 있으며 성공적인 비즈니스를 위한 최적의 공간입니다.</p>
      </div>
      <div className="room-type-list">
        {/* roomTypes 배열을 map을 사용하여 각 객실 타입에 대해 RoomType 컴포넌트를 렌더링 */}
        {roomTypes.map((roomType) => (
          <RoomType key={roomType.roomTypeId} roomType={roomType} />
        ))}
      </div>
    </div>
     
    </nav>
    </div>

  );
}