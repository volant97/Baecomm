# Dev Notes

### 프로젝트 초기 세팅

- Create React App (TypeScript)
- Styled-Component
- React-Router-Dom
- Recoil

### 상품 목록 페이지

- 검색 input, Button
  - 검색 결과 반영된 목록 표시
  - 엔터 키 입력 시 동작하도록 로직 form으로 제작
- 상품 목록
  - 최초 접속 시 상품 10개 출력
  - thumbnail image, brand, title, price 표시
    - 각 항목은 세로로 표시
    - brand, title은 같은 행에 표시
    - 상품 표시 영역 hover 시 brand, title 색상 변경 → blue
    - 상품 클릭 시 상세 페이지로 이동

### 상품 상세 페이지

- 목록으로 돌아가기 버튼
  - 클릭 시 홈페이지로 이동
- 상품 상세 정보
  - thumbnail image, brand, title, price, description, images 표시

### 업데이트 예정

**상품 목록 페이지**

- 상품 목록
  - 한 행에 2개씩 배치
  - 더보기 버튼
    - 클릭 시 10개의 상품 추가로 표시
    - 더 표시할 상품이 있을 때만 버튼 표시

**상품 상세 페이지**

- 목록으로 돌아가기 버튼
  - 홈페이지의 이전 검색어, 검색 결과, 스크롤 위치 유지
- 상품 상세 정보
  - images 모두 표시
