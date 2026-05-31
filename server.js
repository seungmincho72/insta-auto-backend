const express = require('express');
const app = express();

// JSON 데이터를 받기 위한 설정
app.use(express.json());

// 메타 웹훅 인증용 (GET 요청)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            console.log('웹훅 인증 성공!');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Render가 지정하는 포트를 사용하거나, 없으면 3000번 사용
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`서버가 포트 ${PORT}에서 정상적으로 실행 중입니다!`);
});
