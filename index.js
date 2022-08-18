// load env
require('dotenv').config();
// imports
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
// apps
const appForPublic = require('./api/publics/index');
// express app
const app = express();
// ThirdParty
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// Router 등록
app.use('/api/public', appForPublic);
// Run
const serverPort = parseInt(process.env.SERVER_PORT);
app.listen(serverPort, () => {
    // tmp 디렉토리 생성
    if (fs.existsSync('tmp') && fs.lstatSync('tmp').isDirectory())
        // 이미 있는 경우 디렉토리를 삭제한다.
        fs.rmSync('tmp', { recursive: true, force: true});
    fs.mkdirSync('tmp');
    console.log('Running');
});
const terminateEvent = () => {
    // 서버 종료 시 이벤트
    if (fs.existsSync('tmp') && fs.lstatSync('tmp').isDirectory())
        // tmp 파일 있는 경우 삭제
        fs.rmSync('tmp', { recursive: true, force: true});
    console.log('Shutdown');
}
process.on('SIGINT', () => process.exit(1));
process.on('SIGTERM', () => process.exit(1));
process.on('exit', terminateEvent)