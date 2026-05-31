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
// 메타에서 보내는 이벤트 데이터 수신용 (POST 요청)
app.post('/webhook', (req, res) => {
    let body = req.body;

    // 인스타그램에서 온 데이터인지 확인
    if (body.object === 'instagram') {
        body.entry.forEach(function(entry) {
            // 변경된 데이터(댓글, DM 등) 추출
            let webhookEvent = entry.changes[0].value;
            console.log('🎉 [새로운 알림 도착!] 데이터 내역:', JSON.stringify(webhookEvent, null, 2));
        });
        
        // 메타에게 "잘 받았어!"라고 200 OK 신호 보내기
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});
