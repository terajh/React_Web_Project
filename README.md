[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/terajh/React_Web_Project)](https://hits.seeyoufarm.com) 

### 프로젝트 목적
- Node.js, Socket.io, MongoDB, React, Bootstrap 이용해보기

### 프로젝트 주요 기능
- 파일 매니저 기능
  - 파일/폴더 구조를 가진 프로젝트를 업로드 합니다.
    - zip, tar를 지원합니다.
  - 업로드 된 프로젝트를 풀어 ul과 li를 이용해 리스트를 만듭니다.
    - 디렉토리 구조는 [폴더1]/[폴더2]/파일 과 같이 하여 리스트업합니다.
      - 폴더1 안에 폴더2가 있고, 그 안에 파일이 있는 구조입니다.
    - 예를 들어, abc폴더 안에 def 폴더가 있고, 그 안에 main.c, main.py 파일들이 있다면,
      - abc/def/main.c
      - abc/def/main.py
      - 이렇게 두 파일이 보여야 합니다.
  - 해당 디렉토리 밑에 있는 파일에 대해 [읽기/쓰기] 가능하도록 합니다.
    - 읽기 - 파일명을 클릭하면 textarea에 파일 내용이 보입니다.
    - 쓰기 -  textarea에서 내용을 편집하고 저장 버튼을 눌러 저장합니다.
	
- 채팅 기능
  - 채팅을 할 수 있습니다.
  - 소켓을 이용하여 실시간으로 메시지를 주고 받습니다.
  - 새로고침이나 재접속을 하여도 채팅 내역은 남습니다.
  - 귓속말을 통해 1:1 메시지 교환도 가능합니다.
    - (서버) 귓속말 구현 시, 내용을 모든 상대에게 보내면 안됩니다. 
    - 반드시 <받는 사람>만 내용을 받아야 합니다.
	
### 프로젝트 UI
- 메인 화면
  - 파일매니저, 채팅 기능과 관련하여 알맞는 UI와 기능들이 구현되어 있으면 됩니다.
  - 구성은 자유로우며 각 화면을 single 페이지 또는 multiple 페이지로 구현하는 것도 자유입니다.

### 프로젝트 기술 스택
- Back-end
  - Node.js, Socket.io, MongoDB, Redis, ExpressJs 사용
  
- Front-end
  - React, Bootsrap, Reactstrap, React-router 사용
  - Redux, MobX 등을 사용하지 않고 state를 관리합니다.
  
- 개발 환경
  - OS: Ubuntu 14.04.5 LTS
  - 브라우저: 크롬
  - Nodejs: 10.15.3
  
### 템플릿 실행
- 실행 전 작업
  - DB 설치
    - `cd scripts && ./installDb.sh` 명령어로 Mongodb, Redis를 설치합니다.
  - npm package 설치
    - `npm install` 명령어로 npm package를 설치합니다.
	
- 실행
  - DB 실행
    - `./scripts/startDb.sh` 명령어로 Mongodb, Redis를 시작합니다.
  - App Build
    - `npm run build:prd`로 Production 모드로 빌드합니다.
    - 또는 `npm run build:dev`로 Development 모드로 빌드합니다.
  - App Start
    - `npm run start:prd`로 Production 모드로 실행합니다.
    - 또는 `npm run start:dev`로 Development 모드로 실행합니다.

- 실행 결과 확인
  - 상단 메뉴 [프로젝트] -> [실행 URL과 포트]에서 실행되고 있는 Port(기본 포트는 3000)와 관련된 URL를 브라우저 검색창에 입력하면 실행 결과를 확인할 수 있습니다.
  


---
### 아주대학교 소프트웨어학과 16학번 박주현 

- 구현 및 미구현 기능들
	1. 파일 매니저 기능
		- 파일/폴더 구조를 가진 프로젝트를 업로드할 수 있도록 구현
			- zip, tar 파일은 업로드까지만 (unzip은 구현 X)
		- 업로드 된 프로젝트를 풀어 표 모양으로 리스트화
		- 업로드한 프로젝트의 경로에 맞춰 파일들을 보여준다.
			- 서버에는 '/' 대신 특수문자로 변환되어 저장되어 있도록 구현
		- 각 파일들을 읽기, 쓰기 가능하도록 구현
		+ 파일 삭제 기능구현

	2. 채팅 기능
		- 채팅 가능
		- 소켓 이용해 실시간으로 메시지 주고 받기 
			- 소켓은 서버 접속시 열리도록 구현
		- 새로고침이나 재접속을 하여도 채팅 내역 남기기 -> 구현 X
			- 각 유저 세션별로 mongodb Document를 만들어주어 로그기록을	저장하고 재접속할 때 해당
			document를 읽어 로그를 보여줄 수 있을 것이라 생각
		- 귓속말을 통해 1:1 메시지 교환 가능
			- 귓속말 구현에서 to, from 을 두어 해당 유저에게만 보이도록 설정함
		- 채팅방에 접속한 유저 목록 동적 구현
			- 채팅방에 접속시 db에 참여인원 저장, 채팅방 나가면 db의 참여인원에서 제거
	
	3. UI
		- reactstrap들의 여러 태그들을 이용해 적절한 ui를 구현.
	
	4. 구현하지 못한 것들 및 구현 방법 생각
		- zip, tar 파일 unzip 하여 파일로 저장하기
		- 세션 종료시 채팅 맴버 관리 구현
			- 세션 종료시 서버의 disconnection 신호를 받고 채팅 맴버를 db에서 제거하는 식으로 구현할 수 있지 않을까 생각한다.
		- 채팅방 로그기록
			- db에 전체 채팅기록 및 해당 채팅 시간들을 저장하는 collection 과 각 유저마다 채팅방 
			입장 시간, 퇴장 시간 들을 저장하는 collection 2개를 두어 해당 유저에게 로그기록을 보여줄
			수 있을 것이다.
		- 프로젝트 안의 파일들의 디렉토리화
			- 파일들의 path를 읽고 서버에서 fs모듈을 이용해 디렉토리 생성후 해당 위치에 파일을 저장
			하도록 구현할 수 있을 것이며 이를 UI level에서 디렉토리 처럼 보여주기 위해 ajax으로 특정
			디렉토리의 파일리스트를 읽어오며, react component로 파일리스트를 보여줄 수 있을 것이다.
		- app 실행시 console창에 나오는 div // table // tr 에 관한 child ~ 에러
			- 이것은 좀더 검색 후 에러에 관한 이유를 찾아봐야 할 것 같다.
			
	4. 구현을 더 한다면
		- 원하는 파일이 있는지 검색하는 검색기능
		- 채팅방에서 파일 전송 기능
		정도가 있을 것이다.
		
	5. 추가 설명
		- 구현한 react 컴포넌트들은 /src/pages/workspace/containers 에서 구현하였고, ajax 통신을 위한 api 라우팅 파일은 /routes/api 에 구현하였습니다. 그리고 mongodb 에 채팅 맴버 저장 collection을 틀은 /models에, css 디자인코드는 /statics/styles/common.css 에 추가하였습니다.
---

