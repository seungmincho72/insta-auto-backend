{
  "name": "insta-auto-backend",
  "version": "1.0.0",
  "description": "Instagram Auto DM Backend Server",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "axios": "^1.6.8",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  }
}
// Render가 지정하는 포트를 사용하거나, 없으면 3000번 사용
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`서버가 포트 ${PORT}에서 정상적으로 실행 중입니다!`);
});
