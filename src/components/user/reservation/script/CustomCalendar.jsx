import{ setDate, setMonth, toDate } from "date-fns";
import CustomCalendarCell from "./CustomCalendarCell";

function CustomCalendar({year, month, customContent, onCellClick}){

    const dayArr = ['일','월','화','수','목','금','토'];
    const bTest = false;
    //To make CalendarData Arr
    function getTimestampArrForCalendar(year,month){
        const startDayOfDate = toDate(new Date(year,month,1),{timeZone : 'Asia/Seoul'});
        const lastDayOfDate = setDate(setMonth(startDayOfDate, startDayOfDate.getMonth()+1),0);
    
        const timeStampArrForCurrentMonth = Array.from(
            { length: lastDayOfDate.getDate() },
            (_, index) => startDayOfDate.valueOf() + 24 * 60 * 60 * 1000 * index
        );
    
        const beforeBlankArrForCurrentMonth = Array.from(
            {length: startDayOfDate.getDay()},
            () => null
        );
    
        const nextBlankArrForCurrentMonth = Array.from(
            // {length: 6-lastDayOfDate.getDay() === 0 ? 7 : 6-lastDayOfDate.getDay()},
            {length: 6-lastDayOfDate.getDay()},
            ()=> null
        );
    
        const ArrForCalendar = beforeBlankArrForCurrentMonth
        .concat(timeStampArrForCurrentMonth, nextBlankArrForCurrentMonth);
        console.log(ArrForCalendar);
        return ArrForCalendar;
    }

    return (
        <div className={'row row-cols-7 calrow'}>
            {dayArr.map((day,index)=>(
                    <div className='col' key={index}>
                        <p>{day}</p>
                    </div>
                ))
            }
            {/*onClick={(timestamp)=>onClickSelectDay(timestamp)}*/}
            {getTimestampArrForCalendar(year,month)
                .map((timestamp,index)=>(
                    <div className="col border border-secondary" key={index}>
                        {timestamp ? (<>
                                {bTest ?  (<>
                                    <p>{toDate(timestamp, { timeZone: 'Asia/Seoul' }).getDay()}</p>
                                    <p>{toDate(timestamp, { timeZone: 'Asia/Seoul' }).getDate()}</p>
                                </>) : (<CustomCalendarCell 
                                    date={toDate(timestamp, { timeZone: 'Asia/Seoul' }).getDate()}
                                    customContent={customContent(timestamp)}
                                    onClickHandler={() => onCellClick(timestamp)}
                                />)
                                }
                            </>) : null
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default CustomCalendar;