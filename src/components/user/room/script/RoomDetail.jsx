import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/RoomDetail.css";
import { Link } from "react-router-dom";

const RoomDetail = () => {
  const env_API_BASE_URL = process.env.REACT_APP_API_URL;
  const { roomTypeName } = useParams();
  const [roomDetail, setRoomDetail] = useState(null);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await fetch(`${env_API_BASE_URL}/api/users/rooms/detail/${roomTypeName}`, {
          method: 'GET',
          headers: {
            "Content-Type" : "application/json",
          },
          credentials: 'include',
        });
        const data = await response.json();

        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.roomTypeName]) {
            acc[item.roomTypeName] = {
              ...item,
              amenities: [],
            };
          }
          acc[item.roomTypeName].amenities.push(item.amenityName);
          return acc;
        }, {});

        setRoomDetail(groupedData[roomTypeName]);
      } catch (error) {
        console.error("Error fetching room detail:", error);
      }
    };

    if (roomTypeName) fetchRoomDetail();
  }, [roomTypeName]);

  if (!roomDetail) {
    return <div className="loading">로딩 중...</div>;
  }

  return (<div className="Room-Top">
  <div className="room-total">
    <div className="room-detail">
      <div className="room-title"><h1>{roomDetail.roomTypeName}</h1></div>
      <div className="room-info">
        <img src={roomDetail.imagePath} alt={roomDetail.roomTypeName} className="room-image" />
        <div className="room-description"><h2>{roomDetail.roomTypeDescription}</h2></div>
      </div>
      <div className="room-summary">
        <h2>객실 개요</h2>
        <div className="room-summary-grid">
          <div><strong>최소인원</strong> {roomDetail.baseOccupancy}명</div>
          <div><strong>최대인원</strong> {roomDetail.maxOccupancy}명</div>
          <div><strong>기본가격</strong> {roomDetail.basePrice.toLocaleString()}원</div>
        </div>
      </div>

      <div className="room-special">
        <h2>특별서비스</h2>
        <div className="room-summary-grid">
          <ul>
            <li><p>서울 도심의 환상적인 전망을 감상</p></li>
            <li><p>최신 시설과 현대적인 감각의 럭셔리 디자인</p></li>
            <li><p>호텔 모든 객실 초고속 인터넷 무료 제공 (유선, 와이파이)</p></li>
            <li><p>최상의 숙면을 위한 침대 및 침구류</p></li>
            <li><p>슈퍼프리미엄 베딩시스템 적용(Simmons사 공동개발)</p></li>
            <li><p>Egypt cotton 으로 제작된 Gastaldi 침구(Made in Italy)</p></li>
            <li><p>LG 스타일러 객실내 구비 (Suite 이상)</p></li>

          </ul>
        </div>
      </div>

      <div className="room-amenity">
        <h2>어메니티</h2>
        <div className="room-summary-grid">
          {roomDetail.amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">{amenity}</div>
          ))}
        </div>
      </div>
      <div className="room-extra">
        <h2>추가정보</h2>
        <div className="room-summary-grid">
          <ul>
            <li><p>조식뷔페 06:30~10:00</p></li>
            <li><p>애프터눈 티 15:00~17:00</p></li>
            <li><p>즉석 조리코너서비스</p></li>
            <li><p>최상의 숙면을 위한 침대 및 침구류</p></li>
            <li><p>개별 미팅룸 2시간 무료이용 (6인실, 12인실에 한함)</p></li>
            <li><p>호텔 내 식음업장 이용 시 10% 할인, 최대 투숙객제외 2인까지(식음 일부 품목 제외)</p></li>
            <li><p>세탁물 10% 할인</p></li>

          </ul>
        </div>
      </div>

      <div className="room-telecom">
        <h2>객실예약문의</h2>
        <div className="room-summary-grid">
        <div><strong>TEL</strong> <p className="teleNumber">+82-2-759-7311~5</p></div>
          <div><strong>FAX</strong> <p className="teleNumber">+82-2-773-4910</p></div>
          
        </div>
      </div>
    </div>
    <div className="reservation">
      <div> <strong>{roomDetail.roomTypeName}</strong> 타입 </div>
      <Link to="/reservation" className="reserve-button">예약하기</Link>

    </div>
  </div>
  </div>
  );
};

export default RoomDetail;
