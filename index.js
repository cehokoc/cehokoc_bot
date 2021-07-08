const TGApi = require('node-telegram-bot-api');
const axios = require('axios');

const token = '1831196239:AAH0AcbpII6qeSaVcRSd1KeAG6KpR4ax9bI';

const bot = new TGApi(token, { polling: true });

const apiKey = 'f4318cc950d4c50db7abd935377fe6e1';

bot.on('message', async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const username = msg.from.username;

  console.log(msg);
  bot.setMyCommands([
    { command: '/weather', description: 'Show the weather in ur location' },
    { command: '/start', description: ' Start the bot!' },
    { command: '/Perm', description: 'Show the weather in Perm' },
  ]);

  if (text === '/start') {
    return await bot.sendMessage(chatId, `Твое имя -  ${username}`);
  }
  if (text === '/weather') {
    bot.sendMessage(chatId, 'Write here ur location');
    return weather();
  }
  if (text === '/Perm') {
    return PermWeather();
  }

  async function weather() {
    bot.on('message', async (msg2) => {
      let textforcity = msg2.text;
      bot.sendMessage(chatId, `${textforcity} right?`);
      const siteurl = `http://api.openweathermap.org/data/2.5/weather?q=${textforcity}&lang=ru&units=metric&appid=${apiKey}`;
      axios.get(siteurl).then((res) => {
        let temp = res.data.main.temp;
        return bot.sendMessage(chatId, `Temp in ${textforcity} - ${temp}`);
      });
    });
  }
  async function PermWeather() {
    const permurl = `http://api.openweathermap.org/data/2.5/weather?q=perm&lang=ru&units=metric&appid=${apiKey}`;
    axios.get(permurl).then((res) => {
      let temp = res.data.main.temp;
      return bot.sendMessage(chatId, `Temp in Perm - ${temp}`);
    });
  }
});
