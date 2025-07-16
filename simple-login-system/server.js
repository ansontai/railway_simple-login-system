// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('歡迎來到哥布林的登入村！✨');
});

app.listen(PORT, () => {
  console.log(`伺服器在 http://localhost:${PORT} 啟動了！`);
});
