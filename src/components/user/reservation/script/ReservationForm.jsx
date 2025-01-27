import { toDate, setDay } from "date-fns";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import CustomCalendar from "./CustomCalendar";
import { useEffect, useState } from "react";
import { customFetch, REST } from "../../../../util/customFetch";

function ReservationForm(){
    const env_API_BASE_URL = process.env.REACT_APP_API_URL;
    const{
        roomTypeDataList, 
        reservationData,
        selectedYearAndMonth,
        selectedTimestamp, 
        setSelectedTimestamp // function
    } = useOutletContext();

    const [reservationPeriodList,setReservationPeriodList] = useState(new Array(roomTypeDataList.length));

    const [selectedRoom,setSelectedRoom] = useState(0);

    const [occupancy,setOccupancy] = useState(
        {
            adult : 0,
            kid : 0
        }
    );

    const navi = useNavigate();

    useEffect(()=>{
        const initList = [...reservationPeriodList];
        for(let i = 0; i< initList.length; i++){
            initList[i] = 1;
        }
        setReservationPeriodList(initList);
    },[roomTypeDataList])

    function onClickSelectDay(timestamp){
        setSelectedTimestamp(timestamp);
    }

    // 24.12.06 한택 [미완] : 해당 객실 타입이 사용자가 선택한 예약기간 중에 예약이 이미 있는경우 어떻게 처리할지 생각해야 됨 
    //                          - 예약하기를 백에서 일단 받고 예약넣기전에 판별해서 실패룰 보내야 되나? 아니면 미리 판별해서 없애야될까?
    //                      이부분은 백에서 처리해야겠다. 프론트에서 보여주는건 선택한 날짜에 해당 객실을 예약가능한지 불가능한지만 체크하는거로                          
    function renderReservePeriodList(){
        const renderResult = [];
        for(let i = 0; i < 6; i++){
            if(i !== 0)
                renderResult.push(<option value={i+1}>{i+1}박{i+2}일</option>)
            else{    
                renderResult.push(<option selected value={i+1}>{i+1}박{i+2}일</option>);
            }
        }

        return renderResult;
    }

    function renderOccupancyOptionList(roomTypeData, bAdult){

        const renderResult = [];
        for(let i = 0; i<roomTypeData.maxOccupancy; i++)
            renderResult.push(
                bAdult ? 
                    roomTypeData.baseOccupancy !== i+1 ? <option value={i+1}>{i+1}명</option> : <option selected value={i+1}>{i+1}명</option> :
                    i !== 0 ? <option value={i}>{i}명</option> : <option selected value={i}>{i}명</option>
            );

        return renderResult;
    }

    function onChangePeriod(period, index){
        const list = [...reservationPeriodList];
        list[index] = period.target.value;
        setReservationPeriodList(list);
    }

    function onCheckedRoom(index){
        setSelectedRoom(index);
    }

    // public static class Create{
    //     public int memberId;
    //     public int roomId;
    //     public Timestamp checkIn;
    //     public Timestamp checkOut;
    //     public int totalAmount;
    // }
    function onClickReservation(){
        const checkInTimestamp = selectedTimestamp;
        const checkOutTimestamp = toDate(selectedTimestamp, { timeZone: 'Asia/Seoul' });
        setDay(checkOutTimestamp, checkOutTimestamp.getDay() + reservationPeriodList[selectedRoom]);
        const data = {
            memberId : 1,
            roomId : 3,
            checkIn : checkInTimestamp,
            checkOut : checkOutTimestamp.getTime(),
            totalAmount : reservationPeriodList[selectedRoom]*roomTypeDataList[selectedRoom].basePrice
        };

        console.log(data);
        const fetchReservation = async () => {
            const res = await customFetch(`${env_API_BASE_URL}/api/users/reservation`,data,REST.POST);

            // if(res !== null){
            //     console.log(res.message);
            //     console.log(res.reservationId);
            // }

            navi("/payment",{state:{key:{resReservationId : res.reservationId}}});
        }
        
        fetchReservation();
    }

    
    return(
        <>
            {/* 미니 달력 / 선택한 날짜 */}
            <div className="row row-cols-2">
                <div>
                    <CustomCalendar
                        year={selectedYearAndMonth.year} 
                        month={selectedYearAndMonth.month-1} 
                        customContent={(timestamp)=>{}} 
                        onCellClick={(timestamp)=>onClickSelectDay(timestamp)}
                    />    
                </div>
                <div>
                    <div>
                        <h1>{
                            `선택일 ${selectedYearAndMonth.year}년 ${selectedYearAndMonth.month}월 
                            ${toDate(selectedTimestamp, { timeZone: 'Asia/Seoul' }).getDate()}일`
                        }</h1>
                    </div>
                    <div>
                        <p><b>예약문의</b> 1544-6062</p>
                        <p><b>기타사항</b> 만 19세 미만은 보호자가 동반해야 예약이 가능합니다.</p>
                    </div>
                </div>               
            </div>
            
            <div>
                {/* 객실 선택 */}
                <div>
                    <div><h4>객실선택<span>현재 예약 가능한 객실 입니다.</span></h4></div>
                    <div>
                        {roomTypeDataList.map((item,index)=>(
                                <div className="p-3 m-2 row border" key={index}>
                                    <div className="col-8">
                                        <div>{`${item.name} / ${item.description}`}</div>
                                    
                                        <div className="row">
                                            <div className="col">
                                                <div className="input-group mb-3">
                                                    <label className="input-group-text" for="reserve_period_select">숙박기간</label>
                                                    <select className="form-select" id="reserve_period_select" onChange={(e)=>onChangePeriod(e,index)}>
                                                        {renderReservePeriodList()}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="input-group mb-3">
                                                    <label className="input-group-text" for="occupancy_adult_select">성인</label>
                                                    <select className="form-select" id="occupancy_adult_select">
                                                        {renderOccupancyOptionList(item,true)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="input-group mb-3">
                                                    <label className="input-group-text" for="occupancy_kid_select">미성년자</label>
                                                    <select className="form-select" id="occupancy_kid_select">
                                                        {renderOccupancyOptionList(item, false)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 row justify-content-center">
                                        <div className="col-4">
                                            <p>결제금액</p>
                                            <h2>{reservationPeriodList[index]*item.basePrice}</h2>
                                        </div>
                                        <div className="col-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="select_room" id="selectRoom" value={index} checked={selectedRoom === index} onChange={()=>onCheckedRoom(index)}/>   
                                                <label class="form-check-label" htmlFor="selectRoom">
                                                   선택
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                {/* 예약자 정보입력 / 총 결제금액 안내 */}
                <div className="row row-cols-2">
                    <div>
                        <h4>예약자 정보입력</h4>
                        <div>
                            <div className="row row-cols-2">
                                <div className="col">
                                    <input type="text" name="wr_name" required placeholder="예약자의 이름을 입력해주세요."/>
                                </div>
                                <div className="col">
                                    <input type="text" name="sh_phone" required placeholder="예약자 연락처"/>
                                </div>
                                <div className="col">
                                    {/* 뭘넣지...? */}
                                </div>
                                <div className="col">
                                    <Link to="">환불규정 및 약관</Link>
                                    <span>
                                        <label htmlFor="all_agr">전체 동의</label>
                                        <input type="checkbox" id="all_agr"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>결제금액 안내</h4>
                        <div>
                            <div>
                                최종결제금액
                                <p><span>{reservationPeriodList[selectedRoom]*roomTypeDataList[selectedRoom].basePrice}</span>원</p>
                            </div>
                            <div>
                                <p><b>예약문의</b>{`    1544-6062`}</p>
                                <p><b>결제기한</b>{`    예약 후 24시간 이내 (${setDay(
                                                    toDate(selectedTimestamp, { timeZone: 'Asia/Seoul' }), 
                                                    toDate(selectedTimestamp, { timeZone: 'Asia/Seoul' }).getDay() + 1)}까지)`
                                                }
                                </p>
                                <p>
                                    결제 기한 내 결제확인 되지 않으면 예약이 자동 취소됩니다. <br />
                                    결제확인 되면 예약완료 문자가 휴대폰으로 전송됩니다. <br />
                                    결제하실 때 예약자명으로 결제하셔야 빠른 확인이 가능합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 취소 / 예약하기 버튼 */}
                <div className="container px-5">
                    <div className="row gx-5 justify-content-center">
                        <Link to="/reservation/check_out" className="col-2 p-3 m-3 btn bg-light border">취소</Link>
                        <div className="col-2 p-3 m-3 btn bg-light border" onClick={onClickReservation}>예약하기</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReservationForm;