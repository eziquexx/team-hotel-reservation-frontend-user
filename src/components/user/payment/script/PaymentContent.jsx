import "bootstrap/dist/css/bootstrap.min.css";
import "../css/PaymentContent.css";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import PaymentChooseModal from "./PaymentChooseModal";
import { useLocation } from "react-router-dom";


export default function PaymentContent() {
  const env_API_BASE_URL = process.env.REACT_APP_API_URL;
  const [reservationData, setReservationData] = useState(null);
  const [reservationId, setReservationId] = useState("");
  // const [sendReservationId, setSendReservationId] = useState("1");
  const location = useLocation();
  const {resReservationId} = location.state.key;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  // 결제 방식 선택
  const [selectedPayment, setSelectedPayment] = useState(null);

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await fetch(`${env_API_BASE_URL}/api/users/payments/reservationList/${resReservationId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }); // 실제 API URL로 변경
        if (!response.ok) {
          throw new Error('Failed to fetch reservation data');
        }
        const data = await response.json();
        setReservationData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservationData();
  }, []);

  // 로딩, 에러, 예약 데이터가 없을 때 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!reservationData) return <div>No reservation data available.</div>;

  // 임의로 reservationId 지정해주기
  const handleReservationIdChange  = (event) => {
    setReservationId(event.target.value);
  }

  // 조회 버튼 클릭하면 현재 입력된 reservationId값 보내기.
  // const handleReservationIdSend = () => {
  //   setSendReservationId(reservationId)
  // }

  // 결제 방식 선택
  const handlePaymentChange = (e) => {
    if (e.target.checked) {
      setSelectedPayment(e.target.id);
    } else {
      setSelectedPayment(null);
    }
  };

  // 결제 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    if (!selectedPayment) {
      setShow(true);
      // alert('결제방식을 선택해주세요');
      return;
    }

    // PayPal 결제 방식 선택 시
    if (selectedPayment === 'payment_paypal' && resReservationId) {
      try {
        const response = await fetch(`${env_API_BASE_URL}/api/users/paypal/checkout/${resReservationId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('PayPal 결제 요청에 실패했습니다.');
        }

        // 응답을 JSON 형식으로 파싱
        const responseText = await response.text();
        console.log("responseText: ", responseText);
        console.log("responseText222");

        // 'redirect:'로 시작하는지 확인하고 URL 추출
        if (responseText && responseText.startsWith('redirect:')) {
          const approvalUrl = responseText.slice(9); // 'redirect:' 부분을 제외한 URL만 추출
          window.open(approvalUrl, '_blank', 'width=800,height=600');
        } else {
          alert('예상치 못한 응답을 받았습니다.');
        }
      } catch (error) {
        alert('결제 처리 중 오류가 발생했습니다: ' + error.message);
      }
    }
  };

  return (
    <nav className="Payment_container">
      <ul className='Payment_list'>
        <li className="Payment_li">
          <div>Payment</div>
          <div id ="usersPaymentContent">
              <div id="container_payment" className="text-center">
                <div>
                  <h5 className="title">예약 정보</h5>
                  {/* <Form>
                    <Form.Group as={Row} className="mb-3 justify-content-center d-flex gap-2 ">
                      <Col sm="4" className="d-flex justify-content-center align-items-center">
                        <Form.Control 
                          type="text" 
                          value={reservationId}
                          placeholder="예약ID 입력(결제 테스트를 위한 용도)" 
                          style={{marginRight:"10px"}}
                          onChange={handleReservationIdChange}
                        />
                        <Button 
                          size="auto"
                          style={{width:"80px"}}
                          onClick={handleReservationIdSend}
                        >조회</Button>
                      </Col>
                    </Form.Group>
                  </Form> */}
                  <Table responsive="sm" bordered>
                    <thead>
                      <tr>
                        <th>예약ID</th>
                        <th>객실 타입</th>
                        <th>체크인 날짜</th>
                        <th>체크아웃 날짜</th>
                        <th>기본 인원</th>
                        <th>최대 인원</th>
                        <th>총 가격</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(reservationData).map((value, index) => (
                          <td key={index} style={{ padding: '10px' }} >
                            {typeof value === 'string' && value.includes('T') ? (
                              // 날짜 형식일 경우, 'T'를 제거하고 보기 좋게 표시
                              new Date(value).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              }).replace(/\.$/, '')
                            ) : (
                              value
                            )}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="select-payments">
                  <h5 className="title">결제방식 선택</h5>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="paypal" 
                      id="payment_paypal"
                      autocomplete="off"
                      onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="payment_paypal">PayPal</label>
                  </div>
                </div>
                <Button variant="primary" type="submit" onClick={handleSubmit}>결제하기</Button>
              </div>

              <PaymentChooseModal show={show} handleClose={handleClose} />
          </div>
        </li>
      </ul>
    </nav>
    
  );
}