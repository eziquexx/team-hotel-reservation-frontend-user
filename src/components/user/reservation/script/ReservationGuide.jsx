import { Table } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

const GuideText= [
    {
        title: "예약 문의",
        content: [
            "이용일 20일전: 90% 환불처리",
            "이용일 7일전: 70% 환불처리",
            "이용일 4~6일전: 50% 환불처리",
            "이용일 당일3일전 예약취소시는 환불불가합니다."
        ]
    },
    {
        title: "예약시 체크리스트",
        content: [
            "입실퇴실 시간: 입실 PM 02:00 / 퇴실 AM 11:00",
            "바베큐 숯불/그릴이용: 2인기준 15,000원",
            "바베큐 패키지: 2인기준 50,000원\n(우리돼지 목살 600g+새우5미+된장찌개+고추장+쌈장+쌈채소+공기밥+그릴&참숯)",
            "픽업서비스: 픽업서비스는 팬션지기의 스케줄 조절을 위해 예약시 미리 말씀해주시면 이용가능합니다."
        ]
    },
    {
        title: "기본사항",
        content: [
            "에약신청은 예약금 전액을 입금하셔야 완료됩니다.",
            "예약신청을 기점으로 12시간 내에 입금을 원칙으로 하며, 미입금시 자동으로 취소처리 됩니다.",
            "저희 Shining호텔에서는 애완견 동반입실이 불가능합니다."
        ]
    },
    {
        title: "유의사항",
        content: [
            "인원수는 각 객실의 최대인원을 초과할 수 없습니다.\n*예약인원외의 사전통지없이 추가로 오시는 경우 절대 입실이 불가하며, 환불 또한 불가합니다.",
            "애완동물을 동반한 경우 입실이 불가하며, 이또한 환불불가입니다.",
            "미성년자들끼리의 예약,입실이 안됩니다. 반드시 보호자와 입실해야 합니다.",
            "건물내의 복도에서는 금연을 해야하며, 실내에서는 고기나 생선, 튀김류의 오리를 해서는 안됩니다.",
            "집기나 가구를 파손하셨을 경우 펜션지기에게 알려주세요."
        ]
    },
    {
        title: "환불규정",
        content: [
            "이용일 20일전: 90% 환불처리",
            "이용일 7일전: 70% 환불처리",
            "이용일 4~6일전: 50% 환불처리",
            "이용일 당일3일전 예약취소시는 환불불가합니다."
        ]
    },
]

function ReservationGuide(){

    const {roomTypeDataList} = useOutletContext();

    return(
        <>
        <div className="title">
            <h1 className="text-center my-1">Reservation Info</h1>
        </div>
        <div className="contentsWrap">
            <div className="container border p-2 m-2">
                <Table id="guideTable" bordered>
                <thead>
                    <tr>
                        <th rowSpan="2"><strong>객실명</strong></th>
                        <th colSpan="2"><strong>인원</strong></th>
                        <th rowSpan="2"><strong>1박요금</strong></th>
                    </tr>
                    <tr>
                        <th><strong>기준</strong></th>
                        <th><strong>최대</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                        {roomTypeDataList.map(
                            (item)=>(
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.baseOccupancy}</td>
                                    <td>{item.maxOccupancy}</td>
                                    <td>{item.basePrice}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            </div>
            {GuideText.map((item,index)=>
                (<div key={index} className="container border p-2 m-2">
                    <p id="sample_title" className="p-1">{item.title}</p>
                    <div>
                        {item.content.map((text,secIndex)=>(
                                <p key={secIndex}>{`- ${text}`}</p>
                            )
                        )}
                    </div>
                </div>)
            )}
        </div>
        </>
    );
}

export default ReservationGuide;