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
