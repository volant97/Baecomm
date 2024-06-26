# Deploy

https://baecomm.vercel.app/

# Dev Notes

### 프로젝트 초기 세팅

- Create React App (TypeScript)
- Styled-Component
- React-Router-Dom
- Recoil

### API

https://dummyjson.com/docs/products

- **try catch문으로 작성**
- **Recoil을 활용하여 상세 페이지 최적화**
  - 홈페이지에서 fetch한 데이터를 활용하여 fetch 중복 방지
    - 데이터 fetch 후 Recoil에 저장
    - 메인에서 fetch한 state 있는지 파악 후 없다면 그때 fetch 진행
- **로딩중 표시**

### 상품 목록 페이지

- 검색 input, Button
  - 검색 결과 반영된 목록 표시
  - 엔터 키 입력 시 동작하도록 로직 form으로 제작
- 상품 목록
  - 최초 접속 시 상품 10개 출력
  - 한 행에 2개씩 배치
    - **반응형 CSS 적용**
  - thumbnail image, brand, title, price 표시
    - 각 항목은 세로로 표시
    - brand, title은 같은 행에 표시
    - 상품 표시 영역 hover 시 brand, title 색상 변경 → blue
    - 상품 클릭 시 상세 페이지로 이동
  - 더보기 버튼
    - 클릭 시 10개의 상품 추가로 표시
      - **현재 표시된 상품수와 전체 상품수 표시**
    - 더 표시할 상품이 있을 때만 버튼 표시
  - **ScrollToTop 버튼**

### 상품 상세 페이지

- 목록으로 돌아가기 버튼
  - 클릭 시 홈페이지로 이동
  - 홈페이지 이전 상태 유지
    - 검색어
    - 검색 결과
    - 스크롤 위치
  - **상태값 관리**
    - 페이지 새로고침, 주소창 입력하여 직접 이동 → window.addEventListener의 beforeunload로 상태값 저장
    - Link 태그를 통해서 이동 → 태그에 onClick 함수로 상태값 저장
- 상품 상세 정보
  - thumbnail image, brand, title, price, description, images 표시

---

### 회고

**보완하면 좋을 항목(UX 향상)**

- Layout Shift 보완 → Skeleton
- 상세 페이지 이미지 배열 Carousel로 표시

# Image

![homepage](https://github.com/volant97/Baecomm/assets/144371827/23fdbb67-ed91-4c88-83fa-5e1b9fda1c53)
![detailpage](https://github.com/volant97/Baecomm/assets/144371827/643eb6cb-6cdc-4ac9-82b8-a2101af351f0)
