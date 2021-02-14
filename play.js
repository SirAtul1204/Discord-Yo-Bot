const ytdl = require("ytdl-core");
const { DJ, NOT_DJ_REPLY } = require("./constants");
const fetch = require("node-fetch");

let dispatcher;
let playing = false;
let voiceChannel;

async function playMusic(msg, content) {
  try {
    if (msg.member.roles.cache.find((r) => r.name == DJ)) {
      if (msg.member.voice.channel == null) {
        msg.reply("**Please join a voice channel first!**");
        return;
      }
      if (msg.guild.voice != undefined) {
        if (msg.member.voice.channel != voiceChannel && voiceChannel != null) {
          msg.reply(`**Already Playing Music at ${voiceChannel}**`);
          return;
        }
      }

      const connection = await msg.member.voice.channel.join();
      voiceChannel = msg.member.voice.channel;
      let url = "";
      if (content[0] == "link") {
        url = content[1];
      } else {
        searchURL =
          "https://www.googleapis.com/youtube/v3/search?key=" +
          process.env.YOUTUBE_API_KEY +
          "&q=" +
          content.join("+");

        const response = await fetch(searchURL);
        const data = await response.json();
        const videoId = data.items[0].id.videoId;

        url = "https://www.youtube.com/watch?v=" + videoId;
      }
      dispatcher = connection.play(
        ytdl(url, {
          filter: "audioonly",
        })
      );
      playing = true;
      dispatcher.on("start", () =>
        msg.reply(`**Playing Music at ${voiceChannel}, Enjoy!**`)
      );
    } else {
      msg.reply(NOT_DJ_REPLY);
    }
  } catch (err) {
    console.log(err);
  }
}

function pauseMusic(msg) {
  if (msg.member.roles.cache.find((r) => r.name == DJ)) {
    if (msg.member.voice.channel == voiceChannel && voiceChannel != null) {
      if (dispatcher && playing) {
        dispatcher.pause();
        playing = false;
        msg.reply("**Paused Music**");
        return;
      }
      msg.reply("**Not Playing anything!**");
      return;
    }
    msg.reply(`**Join the ${voiceChannel} to listen and use this command.**`);
  } else {
    msg.reply(NOT_DJ_REPLY);
  }
}

function resumeMusic(msg) {
  if (msg.member.roles.cache.find((r) => r.name == DJ)) {
    if (msg.member.voice.channel == voiceChannel && voiceChannel != null) {
      if (dispatcher && !playing) {
        dispatcher.resume();
        playing = true;
        msg.reply("**Resuming Music, Enjoy!**");
        return;
      }
      msg.reply("**Not Playing anything!**");
      return;
    }
    msg.reply(`**Join the ${voiceChannel} to listen and use this command.**`);
  } else {
    msg.reply(NOT_DJ_REPLY);
  }
}

function leaveVoiceChannel(msg) {
  if (msg.member.roles.cache.find((r) => r.name == DJ)) {
    if (msg.member.voice.channel == voiceChannel && voiceChannel != null) {
      voiceChannel = null;
      playing = false;
      msg.guild.voice.channel.leave();
      return;
    }
    msg.reply(`**Join the ${voiceChannel} to listen and use this command.**`);
    return;
  } else {
    msg.reply(NOT_DJ_REPLY);
  }
}

module.exports = {
  playMusic,
  pauseMusic,
  leaveVoiceChannel,
  resumeMusic,
};
