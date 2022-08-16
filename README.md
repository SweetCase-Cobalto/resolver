# Resolver [Server]
![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![nodejs](https://img.shields.io/badge/Node.js--16.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

내가 불편해서 만드는 웹서비스

내가 불편해서 직접 개발한 자동화 알고리즘 코드를 서버에 부착해서 서비스하는 프로젝트 입니다. 서버는 **NodeJS** 기반이자만, 알고리즘 에 사용되는 언어는 그 어떤 언어이든 상관 없습니다.

각 알고리즘 코드들은 Git Submodule단위로 관리하고 있기 때문에 직접 Repository에 코드를 복사할 필요 없이 개별의 Repository에 저장한 다음 그 Repository를 git-submodule로 설정하는 방식 입니다.

## 현재 내장하고 있는 기능
|서비스명|설명|구현 언어|
|---|---|---|
|[PCFL](https://github.com/Vector-7/PCFL)|Midi파일에서 연속된 서스테인(CC64)의 간격을 벌려서 FL Studio에서 임포트 할 때 불협화음이 발생하지 않게 처리|Python3.9|

## 설치 방법 (개발자 기준)
1. Repository를 다운받습니다.
2. NodeJS를 설치합니다. (16 버전 이상이어야 합니다.)
3. Repository로 이동합니다.
4. Node Package들을 설치합니다.
```bash
npm i
```
5. 아래 명령어로 서버를 실행합니다. 단 기능들 까지 실행을 원할 경우 각 기능이 요구하는 언어 및 패키지를 설치해야 합니다.