import { Outlet , useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../../../../util/customFetch";
import '../css/ReservationContent.css';
//24.11.25 지은 [완료] : ReservationContent 테스트.
export default function ReservationContent() {
  const [loadContentComplete,setLoadComplete] = useState(false);

  // public class CountTypeDto {
  //   private Integer roomTypeId;
  //   private String name;
  //   private String description;
  //   private Integer baseOccupancy;
  //   private Integer maxOccupancy;
  //   private BigDecimal basePrice;
  //   private Integer roomCount;
  // }
  const env_API_BASE_URL = process.env.REACT_APP_API_URL;
  const [roomData, setRoomData] = useState([
    {
        roomTypeId : 0,
        name : "",
        description : "",
        baseOccupancy : 0,
        maxOccupancy : 0,
        basePrice : 0,
        roomCount : 0,
        imagePath : ""
    },
  ]);

  useEffect(()=>{
    const fetchData = async () => {
      const res = await customFetch(`${env_API_BASE_URL}/api/users/rooms/types/count`);
      if (res !== null){
        setRoomData(res);
        setLoadComplete(true);
      }
    };
    setLoadComplete(false);
    fetchData();
  },[])

  return (
    <div className="Reservation_container">
      <div id="rservationContent">
        <div className="container p-5 text-light">
        {
          loadContentComplete && 
              <Outlet 
                context={{
                  roomTypeDataList: roomData
                }} 
              />
        }
        </div>
      </div>
    </div>
  );
}

