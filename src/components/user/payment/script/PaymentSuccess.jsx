import "../css/PaymentContent.css";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    // 결제 성공 후 부모 창을 리디렉션하고 새 창을 닫는 코드
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    if (countdown === 0) {
      if (window.opener) {
        window.opener.location.href = '/payment/complete';  // 부모 창 리디렉션
        window.close();  // 새 창 닫기
      }
    }
    
    return () => clearInterval(timer); // timer 정리
  }, [countdown]);

  return (
    <div className="PaymentSuccess_container">
      <h2>결제 성공!</h2>
      <p>결제가 완료되었습니다.</p>
      <p>{countdown}초 후 페이지가 닫힙니다...</p>
    </div>
  );
};