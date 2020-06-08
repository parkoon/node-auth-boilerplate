# Auth Boilerplate Based on Node (Express)

> 기본 인증 처리만 구현되어 있는 샘플 프로젝트

## 실행하기 앞서

아래 명령어로 설정 파일 생성 ⚙️

```bash
$ mkdir ./config/dev.js
$ touch ./config/dev.js
```

생성된 설정 파일에 DB 정보 입력 📌

```javascript
module.exports = {
  MONGO_URI: '',
}
```

## 실행

```bash
$ npm i
$ npm run dev
```

## 테스트

```bash
$ npm test
```
