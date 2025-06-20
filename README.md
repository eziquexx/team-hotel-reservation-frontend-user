# Team Project - Hotel PMS (User Page)
이 레포지토리는 풀스택 개발 교육 과정 중 진행된 팀 프로젝트 **Hotel PMS**의 **사용자 페이지(User Page)** 전체 소스코드를 포함하고 있으며,  
본인이 별도로 정리하여 업로드한 저장소입니다.
<br><br>
관리자 페이지(Admin Page) 및 비즈니스 로직(API)는 아래 별도 레포지토리에서 확인할 수 있습니다:<br><br>
👉 [사용자 페이지 레포지토리 이동하기](https://github.com/eziquexx/team-hotel-reservation-frontend-user) <br>
👉 [관리자 페이지 레포지토리 이동하기](https://github.com/eziquexx/team-hotel-reservation-frontend-admin) <br>
👉 [비즈니스 로직 API 레포지토리 이동하기](https://github.com/eziquexx/team-hotel-reservation-backend) <br>

<br>

:star: [JELEE Notion (Click!)](https://dev-jelee.notion.site/dev-jelee-5686cfa35c1b4c859a27de25d5fad5dd?pvs=4) 로 이동하면 해당 프로젝트 또는 다른 프로젝트의 내용과 저의 이력서를 볼 수 있습니다. :star:

<br/>

## 	:speech_balloon: 프로젝트 소개
**Hotel PMS 사용자 페이지**입니다.<br>
회원가입 및 로그인 후, 원하는 날짜에 원하는 객실을 선택해 예약하고, 결제까지 진행할 수 있는 사용자 기능을 구현했습니다.<br><br>

※ 팀 프로젝트였으며 사용자 페이지는 여러 명이 함께 개발했습니다.<br>
이 저장소에는 **본인이 맡은 작업 중심으로 정리**되어 있습니다.<br><br>
> [!CAUTION]
> 경고: 이 팀 프로젝트는 상업적인 용도가 아닙니다.

<br/>

## :walking: 프로젝트 목적
- 팀 협업 경험을 쌓고, 학원에서 배운 내용을 기반으로 취업 포트폴리오용 프로젝트를 완성하는 것이 목표였습니다.

<br/>

## :calendar: 개발 기간 (프로젝트 전체 일정)
2024-11-11 ~ 2024-12-31
- 11/11 ~ 11/12: 프로젝트 기획 및 주제 정하기, 요구사항 분석, 아이디어 선정, 데이터 수집
- 11/13 ~ 11/13: DB 설계를 위한 속성 정의 및 호텔 관련 레퍼런스 조사
- 11/14 ~ 11/15: 데이터 모델링 및 비즈니스 로직 구조 정리
- 11/18 ~ 12/13: 각자 담당한 비즈니스 로직 구현 (API, 사용자/관리자 페이지 UI 개발 등)
- 12/16 ~ 12/25: 기능 테스트, 버그 수정, 사용자 피드백 반영
- 12/25 ~ 12/31: 최종 발표 준비 및 프로젝트 마무리

<br/>

## 	:star: 팀원 (Programmers)
- **JELEE** (팀장/본인)
- Kim YH
- Lim SY
- Ahn SJ
- Gong HT
- Kim JJ

<br/>

## 🔧 주요 기여 (JELEE)
- 결제 화면 UI 및 PayPal 연동
- 공지사항 조회 UI 구성
- 팀장 역할: Git 레포지토리 관리, 브랜치 통합(Merge), 일정 조율, 회의 진행

<br/>

## ✅ 프로젝트 종료 이후 개인적으로 진행한 개선 작업:
- 사용자 페이지 전반의 UI 구성 정리 및 스타일 개선
- 예약 페이지 기능 개선:
  - 로그인한 사용자 정보를 예약 시 자동 반영되도록 구현
  - 예약 완료 후 결제 페이지로 자연스럽게 연동되도록 처리
- PayPal 결제 UX 개선:
  - 팝업 결제 성공 시 3초 후 자동 종료 및 본창에서 결제 완료 페이지로 자동으로 이동 되도록 구현

<br/>

## :computer: 개발 환경
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
- Visual Studio Code
- GitHub

<br/>

## :clipboard: 기술 스택
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Bootstrap](https://img.shields.io/badge/React%20Bootstrap-%2339C4DD.svg?style=for-the-badge&logo=reactbootstrap&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-%236332F6.svg?style=for-the-badge&logo=swiper&logoColor=white)
![date-fns](https://img.shields.io/badge/date--fns-%23770C56.svg?style=for-the-badge&logo=datefns&logoColor=white)
- React: 프론트엔드 프레임워크
- React Bootstrap: UI 컴포넌트 스타일링
- Swiper: 메인 페이지의 이미지 슬라이더 구현
- date-fns: 날짜 및 시간 처리 라이브러리

<br/>

## :gear: 주요 기능
- 회원가입 및 로그인 (JWT 인증)
- 객실 목록 및 상세 정보 조회
- 객실 예약 현황 확인 및 예약 진행
- 예약 결제 기능 (PayPal)
- 공지사항 열람

<br/>

## :label: 저작권 및 사용권 정보
- 취업 포트폴리오용 팀 프로젝트이며 상업적이 용도가 아닙니다.
