import { Link } from 'react-router-dom';
import '../css/AboutContent.css';

export default function AboutContent() {
  return (
    <nav className="About_container">
      <ul className='About_list'>
        <li className="title">
          <h2>About</h2>
        </li>
        <li className="contents_wrap">
          <p>
            도심의 활기와 자연의 그리너리가 어우러진 곳에 자리한<br/> 우리 호텔은 
            현대적 편리함과 여유로운 휴식을 동시에 제공합니다. 비즈니스와 여가 여행객 <br/>
            모두에게 이상적인 위치로, 주요 도시 중심지와 접근성 자연의 아름다움과<br/> 청량한 내츄럴함을 한 곳에서 
            누릴 수 있습니다. <br/>

            편리한 교통 접근성을 자랑하는<br/> 우리 호텔은  주요 교통 허브와 인접해 있어 
            도심 곳곳을 쉽게 탐험할 수 있습니다.  <br/> 
            동시에, 호텔 가까이에는 푸른 공원과 <br/>
            고즈넉한 산책로가 펼쳐져 있어 바쁜 일상에서 벗어나 자연 속 힐링을 만끽할 수 있습니다.<br/>

            세련된 인테리어와 세계적 수준의 서비스, 맞춤형 고객 케어를 <br/> 자랑하는 
            우리 호텔은 휴식과 활력을 재충전할 수 있는 최고의 공간입니다. <br/>
            품격 있는 여유와 편안함을 찾는 분들께 완벽한 경험을 선사합니다.<br/>

            도심과 자연이 공존하는 이곳에서 특별한 여정을 시작하세요. <br/>
            프라이빗한 장소에서의 편안함과 품격이 <br/> 만나는 순간을 느껴보세요. 
          </p>
        </li>
      </ul>
    </nav>
  );
}
