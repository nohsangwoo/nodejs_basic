# ToDoList (Coding Apple lecture)

- node를 이용한 간단한 todo List를 구현하며 리마인드

## use

- express, nodemon

## express 이용 서버 생성

## get request의 response 처리

## 요청에대한 응답으로 파일보내기

## apply bootstrap

## create index.html & wirte.html

## bodyparser는 이제 express라이브러리에 기본 포함됐음 따로 설치 필요 x

## form 으로 전송된 변수 받아 출력

## REST API 개념

REST API는 무엇인가

Representational State Transfer 라는 뜻인데 Roy field라는 사람이 주장하는 API 디자인 방법

이라고 하는데 총 6개의 원칙이 있습니다.

1. Uniform Interface

인터페이스는 일관성이 있어야한다

– 하나의 URL로는 하나의 데이터를 가져와야함 (하나를 가져오기 위한 두개의 URL을 만들지 말자)

– 간결하고 예측가능하게 짜라 (URL 하나를 알면 둘을 알게)

– URL 이름짓기 관습을 잘 따라주세요

이름짓기 관습이 뭔지는 밑에 가서 더 알아보도록...

(참고)

다른 곳에서 URL 대신 URI 이런 용어를 많이 쓰기도 하는데

URI는 자료를 넘버링하고 분류하고 지칭하는 방법이라 보면 됨.
URL과 비슷하지만 조금 더 큰 의미.
도서관에서 책 분류할 때 URI에 의해서 분류하기도 함.

2. Client-server 역할 구분하기

고객들은 그냥 URL 하나만 알면 서버에 있는 자료를 갖다쓸 수 있음

고객에게 서버역할을 맡기거나

고객에게 DB에 있는 자료를 직접 꺼내라고 하든지 그런 식으로 코드를 짜면 안됨

3. Stateless

요청들은 각각 독립적으로 처리되어야 한다.

요청1이 성공해야 요청2를 보내주고 그런 식으로 요청간의 의존성이 존재하는 코드를 짜면 안됨

다르게 말하면

요청하나 만으로 자료를 가져오기 충분하도록

요청에 필요한 모든 정보들을 실어 보내는게 좋다는 뜻

4. Cacheable

요청을 통해 보내는 자료들은 캐싱이 가능해야합니다.

그리고 캐싱가능하다고 표시하거나 캐싱 기간을 설정해주어야 한다

- 캐싱?

네이버를 방문하면 크롬 브라우저는 자동으로 자주 사용하는 이미지 파일, CSS 파일 등을 하드에 저장한다

(별로 바뀔일 없는 네이버 로고나 아이콘 등..)

하드에 저장해놓고 네이버 방문할 때 네이버서버에 네이버 로고주세요~라고 요청하지 않고 하드에서 불러온다

이 행위가 캐싱

5. Layered System

요청처리하는곳, DB에 저장하는곳 이런 여러가지 단계를 거쳐서 요청을 처리해도 됨

여러개의 레이어를 거쳐서 요청을 처리하게 만들어도 된다.

6. Code on Demand

서버는 고객에게 실제 실행가능한 코드를 전송해줄 수도 있다

## URL 이름짓기 관습

instagram.com/explore/tags/kpop
instagram.com/explore/tags/food
facebook.com/natgeo/photos
facebook.com/bbc/photos

이 URL들은 페이스북이 매우 잘 만든 API이다. 왜냐하면

facebook.com/bbc/photos 이거 딱봐도 BBC뉴스 페북계정의 사진첩인 느낌이 들기때문이다 (한눈에 딱 느낌이 오는게 중요)

– 단어들을 동사보다는 명사 위주로 구성함

– 응용해서 다른 정보들을 쉽게 가져올 수 있을 정도로 일관성 있음

– 대충 봐도 어떤 정보가 들어올지 예측이 가능함

정리하면 이런 특징을 가지고 있는데 참고하여 따라함

이외에도 이름을 잘 지을 수 있는 방법은

– 띄어쓰기는 언더바\_대신 대시-기호-사용

– 파일 확장자 쓰지 말기 (.html 이런거)

– 하위 문서들을 뜻할 땐 / 기호를 사용함 (하위폴더같은 느낌)

등등 여러가지 존재. 이것만 잘 지켜주시면 예쁜 서버 API들이 완성된다.

## MongoDB atlas 에서 무료 DB사용(500mb한정)

https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_apac_south_korea_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624365&gclid=CjwKCAjwwqaGBhBKEiwAMk-FtDpWMMd4ht5vZ_9bKEKXPMHvUGpqBw7X49veZETWj_3l1Kbbdl5J6hoCwKcQAvD_BwE

```

```

## apply env

## connect to mongoDB

## mongoDB atlas clusters collection 설정

사용하려는 database 추가

## EJS사용법

- npm install ejs

## mongoDB에서 data 가져오고 list.ejs로 가져온 데이터 전달하기

## 가져온 데이터 렌더링 하기 with ejs

## mongoDB에서 auto increament 사용방법

- 수동으로 총 갯수 세어주고 따로 db에 저장해두는 방법 사용
- id를 이제 총게시물 수 +1 로 지정

## fix css

## use AJAX

- 새로고침 없이 서버에 요청하는걸 도와주는 JS문법

## ajax와 jquery를 조합하여 server api로 변수를 전달하고 해당 변수를 기준으로 mongoDB에 있는 데이터 삭제

## 요청 성공과 실패시 핸들링

## 서버에서 삭제된 현황 프론트에서 사용자경험이 좋게 dom 제어

## navigation 모듈화

## ejs include방식 3에서 변경됨

- include 문법
  xx - <% include ./nav.ejs %> // 이방식은 이제 더이상 사용안됨
  oo - <%- include('nav') %> // 이런 방식으로 사용됨
  oo - <%- include('./nav.ejs') %> // 또는 이런방식으로도 사용됨

## 모든파일 ejs파일로 변경

## notFound page 처리

## parameter 전달 및 받아오는법 리마인드

## fix css(set layout)

## create edit page

## html 에서 put ,delete 사용하고싶을때

npm install method-override

## edit 구현

## 기본적인 스크립트 공격 방어

https://www.npmjs.com/package/sanitize-html

- npm i sanitize-html

## sessoion 인증 방식 로그인 구현

npm install passport passport-local express-session

- 사용 방식대로 세션관련 미들웨어 사용 설정

## 로그인 페이지 제작

## 세션 미들웨어 적용

## password의 암호화는 나중에 적용

## 암호화를 구현 by bcrypt

- 근데 이거 토이프로젝트라 그냥 넘어갈꺼임

## 로그인 한 유저만 접속 가능한 mypage 제작

## 로그인 단계

1. 로그인 페이지에서 로그인
2. app.post로 login데이터를 넘기고 passport를 사용하여 local방식으로 로그인
   (이때 서버는 로그인한 유저의 세션데이터를 서버에 저장해둔다)
3. passport.serializeUser를 사용하여 세션 데이터를 만들어서 브라우저의 쿠키로 보냄

4. 이제 항상 브라우저에 쿠키에 저장된 세션데이터를 서버에 req에 포함하여 전송

5. 서버는 req를 받을때 마다 항상 세션데이터가 유효한지 이전에 저장해둔 세션데이터를 비교하여 판별한다
   (2번에서 저장한 세션데이터)

6. 저장된 세션데이터와 일치한다면 이후 처리 진행

- 여기선 세션데이터가 일치한다면 아이디를 기준으로 DB에서 사용자 정보를 불러오고 req.user에 해당 사용자 정보를 저장한다

- 이후 내용은 사용자가 로그인했는지 체크하려면 아래와 같이 진행한다

7. isLogin 이란 함수로 req.user가 존재하는지 유효성 체크를 진행

8. 유효성 체크가 진행됐다면 이후 관련내용 진행한다.

(위 내용은 토이 프로젝트라서 간단하게 진행됨 실제 prod에선 다르게 진행됨)

## query string으로 변수 전달하기 (search)

server에서 받아올땐 req.query

## Home("/") route만 로그인해야만 접속가능하게 설정

- 다른 부분도 이와 마찬가지 방법으로 로그인 인증 설정 가능
- 토이프로젝트라서 임시로 넘김

## post collection의 title필드를 인덱싱하기

- for search

## mongoDB 에서의 검색 조건 주기 search부분 참고

- search index 생성후 사용가능

## 해당 글을 쓴사람만 삭제 가능하게 구햔

## route 관리 (directory 관리)

- 여러개의 api들을 각 종률별로 분류하기

## 분할한 api에 각각 미들웨어 적용 또는 일괄 미들웨어 적용 방법

## google cloude에 배포해보기

- app.yaml: 구글 클라우드 세팅 파일
- 기본 포트번호 8080 로 설정하기

## google cloud platform에서

- 프로젝트 선택
- app engine선택 후 진행
- google sdk 설치(gcloud 명령어 생성됨)
- gcloud init 진행(로컬 컴퓨터 로그인 및 프로젝트 선택)
- gcloud app deploy 진행
- 결제 카드 관리

## google cloud update

- gcloud init 진행(로컬 컴퓨터 로그인 및 프로젝트 선택)
- gcloud app deploy 진행

## 주소 확인

App Engine – 대시보드에서 확인가능

## image upload server

- upload.ejs

## form 에서 일반 파일 업로드시 속성 설정

```
<form method="POST" action="/upload" enctype="multipart/form-data">
```

## 이미지 서버로 전송을 위한 multer설치

npm install multer

## image 서버에 업로드 후 업로드된 이미지 로드

## finish
