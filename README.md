# issue-tracker-web
<p align="center">
<img src="https://user-images.githubusercontent.com/29879110/188896648-bceb2ec8-8f58-4648-b360-1e1d614d2ca9.png" width=150px alt="이슈트래커 로고"/> 
</p>


## 📝 Introduce Our Project
> ✅ 해당 프로젝트는 깃허브의 ISSUE 기능을 착안해서 만들었습니다.

이슈를 쉽게 관리해보자! </br>
프로젝트의 이슈 생성 및 관리를 쉽게 도와주는 웹 어플리케이션입니다.


### 👨‍👩‍👧‍👦 Introduce Our Team

|                                          BE                                           |                                           BE                                           |                                          iOS                                          |                                           FE                                           |                                           FE                                            |
|:-------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------:|
| <img src="https://avatars.githubusercontent.com/u/68011320?v=4" width=400px alt="후"/> | <img src="https://avatars.githubusercontent.com/u/29879110?v=4" width=400px alt="아더"/> | <img src="https://avatars.githubusercontent.com/u/65931336?v=4" width=400px alt="벡"/> | <img src="https://avatars.githubusercontent.com/u/85747667?v=4" width=400px alt="도비"/> | <img src="https://avatars.githubusercontent.com/u/92701121?v=4" width=400px alt="도토리"/> |
|                           [Hoo](https://github.com/who-hoo)                           |                           [Ader](https://github.com/ak2j38)                            |                        [Beck](https://github.com/SangHwi-Back)                        |                        [Dobby](https://github.com/JiminKim-dev)                        |                          [Dotori](https://github.com/mogooee)   


## 🏠 배포 주소
### https://front.issue-tracker.link/
- 백엔드를 통해 배포한 도메인 입니다. (배포 브랜치: deploy-be-test)
- 실제 서버와의 통신이 이루어집니다.
- 현재 배포가 중단 되었습니다.

### https://issue-tracker-web.monster/ (배포 중)
- 프론트엔드 aws 배포 경험을 위해 별도로 생성한 도메인 입니다. (배포 브랜치: deploy)
- 현재 msw를 이용하여 api 통신을 하고 있습니다. 
  - 페이지네이션, Oauth 로그인을 제외한 모든 기능을 사용할 수 있습니다.
- ID: `WebTest` PASSWORD: `test1234`로 일반 로그인이 가능합니다.

### [📖 StoryBook](https://647a280bcb01de70b5e31955-sbqhumwkjy.chromatic.com/?path=/story/%F0%9F%8F%A0-home--initial)
- 프로젝트에 쓰인 컴포넌트를 확인할 수 있습니다.
- msw가 적용되어 api 통신이 이루어집니다.

### [📔 API Document](http://3.36.249.0:8080/swagger-ui/index.html)


## 🏃‍♀️ Getting Started
```
git clone https://github.com/issue-tracker/issue-tracker-web.git
npm install --legacy-peer-deps
npm run dev
```


### ❗️ Local의 서버 통신이 안되는 경우

`App.tsx`의 `axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_URL;` 를 주석처리하면 MSW를 통한 mock api 통신이 이루어집니다.

## 💻 Tech Stack

<img src="https://img.shields.io/badge/Webpack5-8DD6F9?style=flat-square&logo=webpack&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/React-3178C6?style=flat-square&logo=react&logoColor=white"/> 
<img src="https://img.shields.io/badge/Recoil-3178C6?style=flat-square&logo=recoil&logoColor=white">
<img src="https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white]"> <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white">



<img src="https://img.shields.io/badge/Msw-02303A?style=flat-square&logo=msw&logoColor=white"> <img src="https://img.shields.io/badge/StoryBook-FF4785?style=flat-square&logo=storybook&logoColor=white"> <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white"> <img src="https://img.shields.io/badge/Testing Library-C21325?style=flat-square&logo=testinglibrary&logoColor=white"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=flat-square&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-2088FF?style=flat-square&logo=prettier&logoColor=white"> 

<img src="https://img.shields.io/badge/AWS S3-232F3E?style=flat-square&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white"> 


<details>
<summary>🤔 각 기술 스택을 선택한 이유</summary>
<div>

### 프론트엔드 개발 관련
- Webpack5: 플러그인, 로더, 최적화 등 유연성 있는 개발 환경을 직접 구성하기 위해 웹팩을 사용했습니다.
  - 개발 모드에서는 타입 체킹을 하기 위해 ts-loader를 사용했습니다.
  - 배포 모드에서는 babel-loader를 사용해 typescript를 트랜스파일링 과정만 거치도록 했습니다.
- Recoil: 클라이언트의 전역 상태를 관리하며 props drilling을 방지하기 위해 사용했습니다.
  - 리액트의 hook처럼 사용할 수 있고 별도의 보일러 플레이팅 없이 Atom과 selector 두 가지로 상태관리를 할 수 있기 때문에 recoil을 선택했습니다.
- React Query: 서버의 상태를 관리하며 fetching과 에러 핸들링 등 React Query에서 제공하는 다양한 기능을 사용했습니다.

- MSW: 실제 API 통신과 유사한 모의 네트워크 환경을 구성했습니다. 
  - 개발시 서버와의 의존도를 줄이고 StoryBook과 test에서도 Mocking을 적용하여 생산성 있는 개발 환경을 구축했습니다.
- Storybook: UI 컴포넌트 문서화를 위해 도입했습니다.
  - 해당 프로젝트는 Atomic Design pattern을 사용해서 구현했기 때문에 Atoms, Molecules, Organisms에 해당하는 수십개의 컴포넌트 파일이 존재합니다. 이를 효과적으로 관리하기 위해 스토리북을 사용했습니다.
- Jest / Testing Library : 테스트 코드에 따라 해당하는 컴포넌트가 의도대로 동작하는지 테스트하기 위해 사용했습니다.

### 코드 관련
- ESLint: Airbnb 규칙을 사용해서 엄격한 코딩 컨벤션을 유지하여 안티 패턴과 오류를 방지하기 위해 사용했습니다.
- Pritter: 팀원과의 코드 스타일을 일관성 있게 유지하기 위해 사용했습니다.

### 배포 관련
- AWS S3 + CloudFront + route 53 : SPA 프로젝트를 호스팅 하기 위해 사용했습니다.
  - S3은 정적 웹사이트를 배포하기 적합한 버킷이었고, 도메인을 등록하기 위해 Route 53과 CloudFront를 이용했습니다.
- GitHub Actions : 배포 자동화를 위해 사용했습니다. 



</div>
</details>

## ✨ Features

### 1. 로그인 / 회원가입 기능
- 일반 / OAuth (Naver, Kakao, GitHub) 로그인 회원가입 기능 구현
- jwt 토큰을 이용한 로그인 연장(Silent Login) 기능

<details>
<summary>🖥️ Screen</summary>
<div>

| 일반 로그인 | 깃허브 로그인 |  
| --- | --- |
| <img width="500" alt="common_signin" src="https://user-images.githubusercontent.com/85747667/243062209-12195d12-c568-449f-a1eb-2b14295c49a4.gif"> | <img width="500" alt="oauth_signin" src="https://user-images.githubusercontent.com/85747667/243061430-c99f464b-481c-4bc2-a21f-92d63c029675.gif"> | 
- 실제 서버에서는 jwt 토큰을 httpOnly 쿠키로 전송합니다.

| 일반 회원가입 | 
| --- |
|<img width="500" alt="common_signup" src="https://user-images.githubusercontent.com/85747667/243062758-67b58448-11e9-4047-bd08-322a8f3a2821.gif">|

| 로그인 연장 (유효한 토큰) | 토큰 만료시 |  
| --- | --- |
| <img width="500" alt="slient_refresh_success" src="https://user-images.githubusercontent.com/85747667/243063638-4ffa54f8-9798-4ee1-8beb-7a2fd6126237.gif"> | <img width="500" alt="slient_refresh_fail" src="https://user-images.githubusercontent.com/85747667/243063639-700d5cad-c08f-4a3d-aa73-628cc3da60b5.gif"> | 

</div>
</details>

### 2. 이슈 추가 및 편집 삭제 기능
- 이슈 생성시 담당자, 레이블, 마일스톤 지정 가능
- 이슈 편집시 해당하는 히스토리 생성
- 이슈에 대한 유저의 공감도를 표현할 수 있는 리액션 기능
- 작성중인 이슈를 마크다운으로 미리 볼 수 있는 기능

<details>
<summary>🖥️ Screen</summary>
<div>

| 이슈 추가 | 이슈 삭제 |
| --- | --- |
| <img width="500" alt="add-issue" src="https://user-images.githubusercontent.com/85747667/243064816-f1df307a-5f7b-46c1-bbfd-58c2ac8481fc.gif"> | <img width="500" alt="delete-issue" src="https://user-images.githubusercontent.com/85747667/243065085-8766466b-988e-4893-8b9d-447861611e2f.gif"> 

| 코멘트 추가, 담당자 & 레이블 추가 | 코멘트 수정, 이슈 상태 변경 |
| --- | --- |
| <img width="500" alt="modify-issue1" src="https://user-images.githubusercontent.com/85747667/243065478-ad8e5ba8-6f5d-4576-b817-9d6d8b6a28df.gif"> | <img width="500" alt="modify-issue2" src="https://user-images.githubusercontent.com/85747667/243065082-c6932d91-f8d7-46ee-9a71-1fdf1354eda6.gif"> 

</div>
</details>


### 3. 이슈 조회 기능
- 이슈 상태, 레이블, 마일스톤, 담당자, 작성자 등으로 이슈 조회 가능
  - 레이블 또는 마일스톤 클릭시 해당하는 이슈 조회
  - 페이지네이션을 통해 페이지 이동 구현

<details>
<summary>🖥️ Screen</summary>
<div>

| 이슈 상태 조회 | 마일스톤, 레이블 조회 |
| --- | --- |
| <img width="500" alt="search-issue-state" src="https://user-images.githubusercontent.com/85747667/243066095-74d87237-b34d-452c-af74-1d7c63fdf8cf.gif"> | <img width="500" alt="search-milestone-label" src="https://user-images.githubusercontent.com/85747667/243066190-eaa9b237-9534-4977-a32a-369a0d845330.gif"> 

</div>
</details>


### 4. 레이블 추가 및 편집, 삭제 기능
- 레이블 클릭시 관련 이슈 조회 가능
- 레이블의 배경색, 글자색 변경 가능

<details>
<summary>🖥️ Screen</summary>
<div>

| 레이블 생성 | 레이블 수정 |
| --- | --- |
| <img width="500" alt="add-label" src="https://user-images.githubusercontent.com/85747667/243066806-c2e31a58-934b-4448-9ca2-2b4c6ed13d93.gif"> | <img width="500" alt="modify-label" src="https://user-images.githubusercontent.com/85747667/243066923-83544b84-c917-46d3-bbcb-a33ae47f8f7c.gif"> |

| 레이블 제거 |
| --- |
| <img width="500" alt="delete-label" src="https://user-images.githubusercontent.com/85747667/243067446-b1994c33-bc9e-4cc5-abcf-0c39de5f6411.gif"> |

</div>
</details>

### 5. 마일스톤 추가 및 편집, 삭제 기능
- 마일스톤 이름 클릭시 관련 이슈 조회 가능
- 이슈의 상태에 따라 마일스톤의 진도율 변화

<details>
<summary>🖥️ Screen</summary>
<div>

| 마일스톤 생성 | 마일스톤 수정 | 
| --- | --- | 
| <img width="500" alt="add-milestone" src="https://user-images.githubusercontent.com/85747667/243068913-ef37c5ea-2931-4ba3-a5e8-f180444960b5.gif"> | <img width="500" alt="modify-milestone" src="https://user-images.githubusercontent.com/85747667/243069844-aa21c5e0-7cc4-44c1-934a-88b5327a220d.gif"> |

| 마일스톤 진도율 |
| --- | 
| <img width="500" alt="count-milestone" src="https://user-images.githubusercontent.com/85747667/243069992-485ea2f2-0d6e-4d68-9b00-d2e96e70be79.gif"> |

| 마일스톤 제거 |
| --- |
| <img width="500" alt="delete-milestone" src="https://user-images.githubusercontent.com/85747667/243069182-e5cd0f25-1197-4e22-bd4d-2eca8599d27b.gif"> |


</div>
</details>

### 6. 기타 기능
#### - 앱 링크 기능
  - iOS와 iPadOS에서만 동작
  - 어플 ⭕️ -> 모바일 이슈트래커로 이동
  - 어플 ❌ -> 루트 페이지로 이동

<details>
<summary>🖥️ Screen</summary>
<div>

<img width="200" alt="delete-milestone" src="https://user-images.githubusercontent.com/85747667/243080715-c75d1354-80b1-4489-a816-81b152a0d82f.jpg"> 

</div>
</details>

#### - 반응형 웹 최적화
디바이스의 크기에 따라 자동으로 재조정 되는 화면을 구현하기 위해 브레이크 포인트 설정

```tsx
const DEVICE = {
  MOBILE: `screen and (max-width: ${DEVICE_SIZE.TABLET - 1}px)`,
  TABLET: `screen and (min-width: ${DEVICE_SIZE.TABLET}px) and (max-width: ${DEVICE_SIZE.DESKTOP - 1}px)`,
  MOBILE_OR_TABLET: `screen and (max-width: ${DEVICE_SIZE.DESKTOP - 1}px)`,
  DESKTOP: `screen and (min-width: ${DEVICE_SIZE.DESKTOP}px)`,
};
```

| Web | Tablet | Mobile | 
| --- | --- | --- | 
| <img width="1428" alt="Web" src="https://user-images.githubusercontent.com/85747667/243053964-12b9661d-22c1-4a73-af0d-d48c7da62535.png"> | <img width="600" alt="Tablet" src="https://user-images.githubusercontent.com/85747667/243053965-a4c04178-3dd0-443c-90e4-7f77413214bb.jpg"> | <img width="373" alt="Mobile" src="https://user-images.githubusercontent.com/85747667/243053962-976f174c-8678-40fa-bbff-f5e037dd093f.png"> | 


#### - 각 에러코드에 대한 에러 처리 구현
  - TroubleShooring - Custom ErrorCode & Custom ErrorBoundary 참조

## ❗️ TroubleShooting

### 1. Slient Login (로그인 연장)
- 작성자: [Dotori](https://github.com/mogooee) 
```
유저가 웹페이지를 재접속(새로고침, 새탭)할 때 로그인이 해제되는 문제가 있었다. 
 -> 웹페이지를 접속할 때 마다 로그인을 하게 된다면 사용자 경험이 저하된다.
```
    
발급받은 refreshToken의 유효기간 만큼 유저가 서비스를 재접속할 때 자동으로 로그인 연장이 되도록 `useSlientLogin` 훅을 생성했다.

1. hook은 조건문 안에서 실행할 수 없으므로 useQuery의 enabled 옵션을 통해 조건부 API 요청을 실행한다.
    - enabled 옵션으로 **로그인 경험이 있는 유저**이고 **앱이 최초 실행**되었는지를 조건으로 설정한다
        - **로그인 경험 확인**: 로그인 성공시 생성되는 로컬스토리지의 Authentication: `true` 값
        - **앱 최초 실행 여부**: appComponentDidMount 상태의 `false` 값
2. 조건을 모두 충족하면 `reissue` API 요청을 한다. 이때 요청 헤더에는 쿠키에 저장한 refreshToken이 전달된다.
    - 유효한 refreshToken : 자동 로그인이 수행되어 새로운 refreshToken, accessToken을 발급 받는다.
    - 만료된 refreshToken : 로그인 페이지로 이동해 유저에게 로그인을 유도한다.

Routers 컴포넌트는 silentLogin 로직을 거친 뒤, isOAuth 상태에 따라 PrivateRouter, PublicRouter를 리턴한다.

### 2. Custom ErrorCode & Custom ErrorBoundary
- 작성자: [Dotori](https://github.com/mogooee)  
- 추가 작성: [Dobby](https://github.com/JiminKim-dev)
```
같은 400 에러이더라도 다른 fallback 화면을 처리해야 하는 경우가 생기는데, 
기존에는 response.data.message로 에러를 구분했지만 
서버측에서 메시지를 변경하게 되면 클라이언트의 코드를 수정해야 하는 문제가 생겼다. 
이런 방식은 컴포넌트의 수가 많아질수록 에러 핸들링에 혼란을 가져온다. 
```
이를 해결하기 위해서 각 에러에 대한 고유한 Custom ErrorCode를 부여했다. 

| | |
|--|--|
|<img width="500" alt="errorcode-image1" src="https://user-images.githubusercontent.com/85747667/243079209-90196dfd-1a2b-462f-9a98-3f8c57a0ef14.png">| <img width="500" alt="errorcode-image2" src="https://user-images.githubusercontent.com/85747667/243078577-44e87047-9a9e-4a7f-adf2-c0b91d82d9e5.png">|

토큰과 관련된 ErrorCode는 여러곳에서 쓰이기 때문에 일괄적으로 관리하기 위해서 ErrorBoundary를 만들었다. 

> ErrorBoundary를 만들기 위해서는 클래스의 `getDerivedStateFromError` 메서드를 사용해야 하는데 아직까지 hook에서는 이러한 에러 관련된 라이프 사이클이 구현되어 있지 않으므로 클래스형 컴포넌트로 구현했다.

- `static getDerivedStateFromError` : 하위 컴포넌트에서 오류가 발생했을 때 호출되며 매개변수로 오류를 전달받고 해당 값을 반환한다.
- `resetState` : 에러 상태를 초기화 한다.
- `resetQueryClient`: 에러 상태 초기화와 함께 모든 쿼리키를 삭제한다.
- `fallbackUIRender`: CustomErrorboundary 내부의 메서드를 넘겨서 해당 메서드를 통해 에러를 리셋할 수 있게 한다.
- `render`: 반환받은 에러의 data를 이용해서 해당하는 에러코드에 대한 UI를 리턴한다.
    - fallback으로 넘겨받은 UI가 있다면 `fallbackUIRender` 메서드에서 관련 로직을 처리하도록 했다.

ErrorBoundary 내부에서 처리되지 않는 에러코드는 각 mutation의 onError 내부에서 useNotifyError 훅을 통해 alert창을 띄워 메시지를 보여주었다.


<details>
<summary>🖥️ 다양한 에러 예시</summary>
<div>

#### 유효하지 않은 refresh 토큰 (1002, 1004)
- msw 환경에서 cookie의 토큰을 직접 삭제하면 해당 에러를 구현할 수 있다.

| fallbackUI ❌ |  fallbackUI ⭕️ |
| --- | --- |
| <img width="505" alt="1004" src="https://user-images.githubusercontent.com/85747667/243079378-420c30aa-b3a6-4693-bf9d-672bf66b3768.gif"> | <img width="505" alt="1004" src="https://user-images.githubusercontent.com/85747667/243079398-792e619b-bd51-4fc8-8f44-367b4cb303b7.gif"> |

#### 그 외 에러

| Internal Server Error (500) | NotExistIssue (3000) |   NotValidRedirectCode (2001) |
| --- | --- | --- |
| <img width="505" alt="스크린샷 2023-03-17 오후 1 24 48" src="https://user-images.githubusercontent.com/92701121/225812357-2c32bfa9-2146-4d79-9290-00520c402fc7.png"> | <img width="505" alt="스크린샷 2023-03-17 오후 1 33 40" src="https://user-images.githubusercontent.com/92701121/225813377-f3362ec3-2d33-4698-b6e4-66ffef2440c4.png"> | <img width="505" alt="스크린샷 2023-03-17 오후 1 24 56" src="https://user-images.githubusercontent.com/92701121/225812389-95dc0287-5d74-455e-9338-00c414840831.png"> |

</div>
</details>

### 3. Atomic Design Pattern
- 작성자: [Dotori](https://github.com/mogooee)  
```
프로젝트에 새로운 기능을 더해가고 컴포넌트가 늘어나면서 같은 기능을 하지만 다른 디자인을 갖는 경우가 많아졌다.
```
이러한 컴포넌트들의 재사용성을 높이기 위해 Atomic Design Pattern을 적극 활용했다.
    
Dropdown 컴포넌트는 클릭하면 컴포넌트의 근처에 숨겨져있던 모달창이 등장한다. 유저는 나타난 모달창을 통해 여러 옵션을 선택할 수 있다. 해당 컴포넌트는 기본적으로 정보 공개 위젯을 생성하는 `<details>` 태그로 이루어져있다. 하지만 각 컴포넌트의 디자인은 다음과 같이 매우 다양하다.
    
| FilterBar | SideBar | Reaction | Bubble | Error |
| --- | --- | --- | --- | --- |
| <img width="282" alt="스크린샷 2023-03-17 오후 1 54 56" src="https://user-images.githubusercontent.com/92701121/225816072-69e2141f-ea82-4a38-9e71-67184e4b6f80.png"> | <img width="321" alt="스크린샷 2023-03-17 오후 1 55 52" src="https://user-images.githubusercontent.com/92701121/225816265-29f7afc9-20c8-472e-8824-0aaeadd32155.png"> | <img width="346" alt="스크린샷 2023-03-17 오후 1 01 01" src="https://user-images.githubusercontent.com/92701121/225809862-de92bfb3-8d99-446b-a69f-e8e46ae70e8f.png"> | <img width="346" alt="스크린샷 2023-03-17 오후 1 01 07" src="https://user-images.githubusercontent.com/92701121/225809901-fa503f07-022a-42d3-8aba-7dea6ee93ebf.png"> | <img width="346" alt="스크린샷 2023-03-17 오후 1 01 12" src="https://user-images.githubusercontent.com/92701121/225809918-9992e8c2-30ba-4c09-9fe5-4dba41becb66.png"> |
    
Dropdown 컴포넌트는 크게 indicator, panel로 구성되어있고 clickHandler와 indicator props, panel props를 전달받게 된다.
    
```jsx
const Dropdown = <Panel extends ReactionPanelTypes | ListPanelTypes | BubblePanelTypes | ErrorPanelTypes>({
    indicatorProps,
    type,
    panelProps,
    isActive,
    handleOnDropdownClick,
  }: DropdownTypes<Panel>): JSX.Element => (
    <S.Dropdown dropdownStyle={indicatorProps.indicatorStyle} onClick={handleOnDropdownClick}>
      <DropdownIndicator isActive={isActive} {...indicatorProps} />
      <DropdownPanel type={type} prop={panelProps} />
    </S.Dropdown>
);
    
```
    
indicator에 비해 panel은 디자인에 따라 다양한 props을 갖게 된다. typescript에 위배되지 않기 위해 panel에 type이라는 prop을 두어 올바른 prop type을 갖는 Panel 컴포넌트를 리턴하도록 했다.

```jsx
const DropdownPanel = ({ type, prop }: DropdownPanelTypes): JSX.Element => {
  switch (type) {
    case 'Bubble':
      return <panels.Bubble {...(prop as BubblePanelTypes)} />;
    case 'List':
      return <panels.List {...(prop as ListPanelTypes)} />;
    case 'Reaction':
      return <panels.Reaction {...(prop as ReactionPanelTypes)} />;
    case 'Error':
      return <panels.Error {...(prop as ErrorPanelTypes)} />;
  }
};
```

### 4. 폰트 최적화
- 작성자: [Dobby](https://github.com/JiminKim-dev)

``` 
렌더링이 된 이후에 폰트가 적용되는 FOUT 문제가 있었다. 
폰트를 cdn에서 불러왔기 때문에 bundle.js 보다 늦게 폰트 리소스를 받아오는게 원인이었다.
```

이를 해결하기 위해 로컬에서 폰트를 import 하는 방식으로 변경한 후, 번들 파일보다 먼저 preload 되도록 수정해서 이러한 문제를 해결했다.
- 이 과정에서 경량화된 웹 폰트를 사용하여 리소스의 용량을 줄였다.
- 관련 PR [⚡️ 웹폰트 최적화 적용 #56](https://github.com/issue-tracker/issue-tracker-web/pull/56)

### 5. 웹팩 최적화

- 작성자 : [Dobby](https://github.com/JiminKim-dev)

```tsx
- development 모드나 production 모드에서 웹팩 빌드 속도가 느린 문제가 발생했다.
- 기존에 코드 스플리팅을 적용하지 않았기 때문에 최종적으로 번들되는 파일의 크기가 컸다.
```

이를 해결하기 위해 웹팩의 일부 설정을 변경했다.

- common: optimization을 이용해서 중복된 모듈을 별도의 파일로 분리하여 번들 크기를 줄이도록 했다.
    - output `filename: 'js/[name]-[chunkhash].js'` :파일에 변경사항이 없으면 동일한 해시 값이 유지되므로 변경이 일어난 entry의 청크만 변경되도록 수정했다.
- development: ts-loader의 옵션을 `{transpileOnly: true}`로 수정해서 트랜스파일링만 진행하고 forkTsCheckerWebpackPlugin을 통해서 별도의 프로세스에서 타입체킹을 진행하도록 수정했다.
- production:
    - `devtool: false` : 소스맵을 생성하지 않고 번들 크기를 축소하고 속도가 향상된다.
    - @babel/preset-env의 옵션을 `{modules: false loose: true}`로 수정했다.
        - `modules: false`: 모듈 시스템 처리를 웹팩에게 수행하게 한다.
        - `loose: true` : 느슨한 변환 규칙을 사용하여 코드를 변환하므로, 변환된 코드의 크기가 더 작아지
- 초기 로드 시간을 줄이기 위해 루트 경로에 해당하는 Home, Login 컴포넌트를 제외한 Page 컴포넌트를 React.lazy를 사용해서 동적으로 불러오도록 했다.

#### 결과

| development 최적화 전 후 |  production 최적화 전 후 |
| --- | --- |
| <img width="500" alt="development" src="https://user-images.githubusercontent.com/85747667/243123769-d13dd603-b01a-40af-8a36-9d5ee178c303.png"> | <img width="500" alt="production" src="https://user-images.githubusercontent.com/85747667/243123764-b17fd6b3-5b19-4dbf-a8a7-875b8e65696f.png"> |

- development은 빌드 속도는 4000ms 정도 개선되었지만 전체 용량의 차이가 없었다.
- production은 빌드 속도가 4000ms 개선되었고 파일 크기도 1MB 정도 줄어들었다.
- 둘 다 Lazy.loading를 사용한 후로 main에 해당하는 파일의 크기가 축소되었다.

## 🗂 Activations

[🦾 이슈 트래커 프로젝트 - Notion](https://www.notion.so/FE-17b4f7cd8d1448eca9d8b29fe78a27ec?pvs=21)에서 프로젝트 기간동안 작성한 회의록, 회고 및 활동 기록 등을 확인할 수 있습니다.