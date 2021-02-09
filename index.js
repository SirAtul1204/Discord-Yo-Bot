const Discord = require("discord.js");
const { getMeme } = require("./meme");
const { getGif } = require("./gif");
const {
  YO,
  YO_REPLY,
  MEME,
  WRONG_COMMAND,
  GIF,
  HELP,
  HELP_REPLY,
} = require("./constants");

const client = new Discord.Client();
require("dotenv").config();

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log("Ready!");
});

client.on("message", (msg) => {
  if (msg.content[0] == "!") {
    msg.content = msg.content.substring(1);
    let content = msg.content.split(" ");
    switch (content[0]) {
      case YO:
        msg.reply(YO_REPLY);
        break;
      case MEME:
        getMeme(msg);
        break;
      case GIF:
        content.shift();
        getGif(msg, content);
        break;
      case HELP:
        msg.channel.send(HELP_REPLY);
        break;
      default:
        msg.reply(WRONG_COMMAND);
        break;
    }
  }
});
