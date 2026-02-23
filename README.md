# 🌳 就活の森 (Shūkatsu no Mori)

> 日本就職を目指す求職者向けの **企業情報・企業分析・選考体験共有Webサービス**

---

## 🔖 プロジェクト基本情報

| 項目          | 内容                                        |
| ----------- | ----------------------------------------- |
| **プロジェクト名** | 就活の森 (企業レビューシステム)                         |
| **バージョン**   | 1.0.0                                     |
| **開発期間**    | 2025.12.15 ~ 2026.01.09                   |
| **チーム名**    | 新大阪 (シンオオサカ)                              |
| **チームメンバー** | カン・ドンヒ、キム・ヒョンジョン、ソン・チャンミ、ソン・クンソル、チェ・ジョンミン |

---

## 🧭 プロジェクト概要

### 🎯 目的

* 日本就職を目指す新韓GYC日本課程受講生向けの **企業情報共有Webサービス** を開発する。
* 日本企業情報、企業分析、企業体験談コンテンツに対する **作成・閲覧・編集・削除（CRUD）** 機能を提供する。

### 💡 企画背景

日本就職を準備する過程において、企業情報や面接・選考体験談が複数のコミュニティに分散しており、
言語や文化の違いにより **実体験に基づく情報を体系的に取得することが難しいという課題** を感じた。

そこで、日本就職を目指す学生が企業情報を一箇所で確認し、共有できるサービスを企画した。

---

## 🛠 技術スタック

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

## ✨ 主な機能

* 会員登録 / ログイン (JWT認証)
* 日本企業情報の閲覧および管理
* 個人視点による企業分析の作成
* 書類・面接・最終選考段階別の企業体験談の投稿
* マイページによる自身の投稿コンテンツ管理

---

## 📸 画面プレビュー

> 実際のサービス画面の一部

| メインページ                                                                                                    | 企業詳細                                                                                                      |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/deeb2125-7fa1-4dc1-b6af-bf097714660f" width="420" /> | <img src="https://github.com/user-attachments/assets/eec3480d-aa16-4899-ae37-235cdac00aa1" width="420" /> |

| 企業体験談詳細                                                                                                   | 企業分析詳細                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/b8d865e7-cfb3-4f08-9ca1-dbcf03e170db" width="420" /> | <img src="https://github.com/user-attachments/assets/ca45269a-37a9-4b4a-86e9-d017ad47298c"  width="420" /> |

| 会員登録                                                                                                      | マイページ                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/00c43c0a-d1bd-46e8-956f-6dd0853e4678" width="420" /> | <img src="https://github.com/user-attachments/assets/3c3fbafa-81b5-4d32-baeb-82c723372506" width="420" /> |

---

## 🔗 API ドキュメント

* ドメイン別 CRUD API 提供
  (会員 / 企業 / 企業分析 / 企業体験談)

- 📘 静的 API ドキュメント (Redoc): [`docs/redoc-static.html`](https://raw.githack.com/ShinOsakawaii/shukatsu-no-mori/develop/docs/redoc-static.html)
- 📄 OpenAPI 仕様 (JSON): [`docs/openapi.json`](docs/openApi.json)

---

## 📂 技術ドキュメント

<details>
<summary>技術ドキュメント一覧</summary>

* 📘 [プロジェクト概要書](https://www.notion.so/Web-Application-Project-Overview-2ca1351cd9c280878334d029784782f1)
* 🧾 [要件定義書](https://www.notion.so/2cd1351cd9c28136b96feb9fb4b468ff)
* 🧩 [ユースケース仕様書](https://www.notion.so/2cd1351cd9c281958e4ec2c1ffa4047d)
* 🛠️ [機能仕様書](https://www.notion.so/2d31351cd9c280a6b18eec7b773cac3f)
* 🔌 [API仕様書](https://www.notion.so/API-2cd1351cd9c2811b977ef77996a8947e)
* 🗄️ [DB設計書](https://www.notion.so/DB-2cd1351cd9c28177a8a8eb8efec4ac4b)
* 🖥️ [画面設計書](https://www.notion.so/2d51351cd9c2809d8aecc47291a508be)
* 📐 [シーケンス / クラス図](https://www.notion.so/2d81351cd9c280f78d6eeece85a5baeb)

</details>
