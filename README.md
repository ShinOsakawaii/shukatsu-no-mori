# 🌳 就活の森 (Shūkatsu no Mori)

> 일본 취업을 준비하는 구직자를 위한 **기업 정보 · 기업 분석 · 후기 공유 웹 서비스**

---

## 🔖 프로젝트 기본 정보

| 항목        | 내용                      |
| --------- | ----------------------- |
| **프로젝트명** | 就活の森 (기업 리뷰 시스템)        |
| **버전**    | 1.0.0                   |
| **개발 기간** | 2025.12.15 ~ 2026.01.09 |
| **팀명**    | 新大阪 (신오사카)              |
| **팀원**    | 강동희, 김현정, 성찬미, 손큰솔, 최정민 |

---

## 🧭 프로젝트 개요

### 🎯 목표

* 일본 취업을 준비하는 신한 GYC 일본과정 수강생을 위한 **기업 정보 공유 웹 서비스**를 구현한다.
* 일본 기업 정보, 기업 분석, 기업 후기 콘텐츠에 대한 **작성·조회·수정·삭제(CRUD)** 기능을 제공한다.

### 💡 기획 배경

일본 취업을 준비하는 과정에서 기업 정보와 면접·선고 후기가
여러 커뮤니티에 분산되어 있고, 언어와 문화 차이로 인해
**실제 경험 기반 정보를 체계적으로 얻기 어렵다는 문제**를 느꼈다.
이에 일본 취업 준비생들이 기업 정보를 한 곳에서 확인하고 공유할 수 있는 서비스를 기획하였다.

---

## 🛠 기술 스택

### 🔙 Backend

<div align="left">

<img src="https://img.shields.io/badge/Java-17-007396?style=flat-square&logo=java&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring%20Boot-4.0.1-6DB33F?style=flat-square&logo=springboot&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring%20Web%20MVC-REST-6DB33F?style=flat-square"/>

<br/>

<img src="https://img.shields.io/badge/JPA-Hibernate-59666C?style=flat-square&logo=hibernate&logoColor=white"/>
<img src="https://img.shields.io/badge/Oracle%20DB-ojdbc11-F80000?style=flat-square&logo=oracle&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring%20Security-JWT-6DB33F?style=flat-square&logo=springsecurity&logoColor=white"/>
<img src="https://img.shields.io/badge/JJWT-0.12.5-000000?style=flat-square"/>

<br/>

<img src="https://img.shields.io/badge/Gradle-Build-02303A?style=flat-square&logo=gradle&logoColor=white"/>
<img src="https://img.shields.io/badge/Lombok-Utility-BC4521?style=flat-square"/>
<img src="https://img.shields.io/badge/DevTools-Spring-6DB33F?style=flat-square"/>

</div>

### 🔜 Frontend

<div align="left">

<img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/React%20Router-7.11.0-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-7.2.2-646CFF?style=flat-square&logo=vite&logoColor=white"/>

<br/>

<img src="https://img.shields.io/badge/TanStack%20Query-5.90.16-FF4154?style=flat-square&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-1.13.2-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/dayjs-1.11.19-000000?style=flat-square"/>

<br/>

<img src="https://img.shields.io/badge/MUI-7.3.6-007FFF?style=flat-square&logo=mui&logoColor=white"/>
<img src="https://img.shields.io/badge/Emotion-styling-DB7093?style=flat-square"/>
<img src="https://img.shields.io/badge/Icons-lucide%20%2F%20react--icons-555555?style=flat-square"/>

</div>

---

## ✨ 주요 기능

* 회원가입 / 로그인 (JWT 기반 인증)
* 일본 기업 정보 조회 및 관리
* 개인 관점의 기업 분석 작성
* 서류 · 면접 · 최종 선고 단계별 기업 후기 작성
* 마이페이지를 통한 본인 작성 콘텐츠 관리

---

## 📸 화면 미리보기
> 실제 서비스 화면 일부

| 메인 페이지 | 기업 상세 |
| --- | --- |
| <img src="https://github.com/user-attachments/assets/deeb2125-7fa1-4dc1-b6af-bf097714660f" width="420" /> | <img src="https://github.com/user-attachments/assets/eec3480d-aa16-4899-ae37-235cdac00aa1" width="420" /> |

| 기업 후기 상세 | 기업 분석 상세 |
| --- | --- |
| <img src="https://github.com/user-attachments/assets/b8d865e7-cfb3-4f08-9ca1-dbcf03e170db" width="420" /> | <img width="420" height="911" alt="image" src="https://github.com/user-attachments/assets/59d11b49-c834-4596-9035-983145cdf8a5" />
 |

| 회원 가입 | 마이페이지 |
| --- | --- |
| <img src="https://github.com/user-attachments/assets/00c43c0a-d1bd-46e8-956f-6dd0853e4678" width="420" /> | <img src="https://github.com/user-attachments/assets/3c3fbafa-81b5-4d32-baeb-82c723372506" width="420" /> |

## 🔗 API 문서

* 도메인별 CRUD API 제공
  (회원 / 기업 / 기업 분석 / 기업 후기)

- 📘 정적 API 문서 (Redoc): [`docs/redoc-static.html`](docs/redoc-static.html)
- 📄 OpenAPI 스펙(JSON): [`docs/openapi.json`](docs/openapi.json)

> 본 프로젝트는 서버를 상시 운영하지 않으므로,  
> OpenAPI 기반 **정적 API 문서**를 레포에 포함하여 언제든 확인할 수 있도록 했다.


## 🔗 API 개요
* 도메인별 CRUD API 제공
  (회원 / 기업 / 기업 분석 / 기업 후기)

📎 API 명세서: `docs/api.md`
📎 Swagger UI: (선택, 있을 경우 링크)


