const Discord = require("discord.js");
const { getMeme } = require("./meme");
const { getGif } = require("./gif");
const {
  playMusic,
  pauseMusic,
  leaveVoiceChannel,
  resumeMusic,
} = require("./play");
const {
  YO,
  YO_REPLY,
  MEME,
  WRONG_COMMAND,
  GIF,
  HELP,
  HELP_REPLY,
  PLAY,
  PAUSE,
  LEAVE,
  RESUME,
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
        console.log(msg);
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
      case PLAY:
        content.shift();
        playMusic(msg, content);
        break;
      case PAUSE:
        pauseMusic(msg);
        break;
      case LEAVE:
        leaveVoiceChannel(msg);
        break;
      case RESUME:
        resumeMusic(msg);
        break;
      default:
        msg.reply(WRONG_COMMAND);
        break;
    }
  }
});
