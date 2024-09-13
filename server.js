const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = '7509726673:AAE_XuqtWrCnt2NJk_3sX6XlpghyBRO3QFU';

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const chatId = req.body.message.chat.id;
  const messageText = req.body.message.text;

  try {
    await sendMessageToBot(chatId, messageText);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending message to bot:', error);
    res.sendStatus(500);
  }
});

async function sendMessageToBot(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});