import { toDate, setMonth } from "date-fns";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { customFetch } from "../../../../util/customFetch";
import ButtonEx from "../../../common/ButtonEx";

function ReservationCheckOut(){
    const env_API_BASE_URL = process.env.REACT_APP_API_URL;
    // props
    const {roomTypeDataList} = useOutletContext();

    const [loadComplete,setLoadComplete] = useState(false);
    const nowDate = toDate(Date.now(), { timeZone: 'Asia/Seoul' });

    const [selectedYearAndMonth, setSelectedYearAndMonth] =
    useState({
        year: nowDate.getFullYear(),
        month: nowDate.getMonth()+1,
    });

    const [selectedTimestamp, setSelectedTimestamp] = useState(nowDate.setHours(0, 0, 0, 0));

    // responseData
    const [reservationSummary , setReservationSummary] = useState([
        {
            roomTypeId : 0,
            reservationDate : null,
            bookedRooms : 0
        },
    ]);

    useEffect(()=>{
        const fetchData = async () => {
            const res = await customFetch(`${env_API_BASE_URL}/api/users/reservation/summary/${selectedTimestamp}`);
    
            if(res !== null){
                setReservationSummary(res);
                setLoadComplete(true);
            }
        };
        fetchData();
    },[selectedYearAndMonth.month]);

    useEffect(()=>{
        const selectedDate = toDate(selectedTimestamp , {timeZone : 'Asia/Seoul'});
        if(selectedDate.getMonth()+1 !== selectedYearAndMonth.month){
            setSelectedYearAndMonth({
                year : selectedDate.getFullYear(),
                month : selectedDate.getMonth()+1
            });
        }
    },[selectedTimestamp]);

    function onClickPrevButtton(){
        // const prevMonth = selectedYearAndMonth;

        // setSelectedYearAndMonth({
        //     year : prevMonth.month-1 > 0 ? prevMonth.year : prevMonth.year-1,
        //     month : prevMonth.month-1 > 0 ? prevMonth.month-1 : 12
        // });
        const prevMonth = toDate(selectedTimestamp, { timeZone: 'Asia/Seoul' });
        const newDate = setMonth(prevMonth, prevMonth.getMonth() - 1);

        if (newDate < setMonth(nowDate, nowDate.getMonth())) {
            return; // 아무 동작도 하지 않음
        }

        setLoadComplete(false);

        setSelectedTimestamp(newDate.getTime());  // selectedTimestamp만 수정
    }

    function onClickNextButtton(){
        // const nextMonth = selectedYearAndMonth;

        // setSelectedYearAndMonth({
        //     year : nextMonth.month+1 <= 12 ? nextMonth.year : nextMonth.year+1,
        //     month : nextMonth.month+1 <= 12 ? nextMonth.month+1 : 1
        // });
        const nextMonth = toDate(selectedTimestamp, { timeZone: 'Asia/Seoul' });
        const newDate = setMonth(nextMonth, nextMonth.getMonth() + 1);

        if (newDate > setMonth(nowDate, nowDate.getMonth() + 12)) {
            return; // 아무 동작도 하지 않음
        }

        setLoadComplete(false);

        setSelectedTimestamp(newDate.getTime());  // selectedTimestamp만 수정
    }

    return(
        <div className={'container text-container'}>
            <div className="row justify-content-md-center">
                <ButtonEx id='prev' className='btn col col-lg-2' action={onClickPrevButtton}>{'<'}</ButtonEx>
                <h1 className='col-md-auto'>{`${selectedYearAndMonth.year}년 ${selectedYearAndMonth.month}월`}</h1>
                <ButtonEx id='next' className='btn col col-lg-2' action={onClickNextButtton}>{'>'}</ButtonEx>
            </div>
            {loadComplete && <Outlet 
                context={{
                    roomTypeDataList: roomTypeDataList,
                    reservationData: reservationSummary,
                    selectedYearAndMonth: selectedYearAndMonth,
                    selectedTimestamp: selectedTimestamp,
                    setSelectedTimestamp: (timestamp)=>setSelectedTimestamp(timestamp)
                }} 
            />}
        </div>
    );
}

export default ReservationCheckOut;