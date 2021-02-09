const Discord = require("discord.js");
const fetch = require("node-fetch");
let GIF_LIMIT = 3;

async function getGif(msg, searchTerms) {
  let url = "https://g.tenor.com/v1/search?q=";
  if (searchTerms.length > 0) {
    url += searchTerms.join("+");
  } else {
    GIF_LIMIT = 40;
    url += "random";
  }
  url += "&key=" + process.env.TENOR_GIF_KEY + "&limit=" + String(GIF_LIMIT);
  const response = await fetch(url);
  const data = await response.json();
  let randomIndex = Math.floor(Math.random() * GIF_LIMIT);
  const gif = data.results[randomIndex];

  let embedMsg = new Discord.MessageEmbed()
    .setTitle(gif.h1_title)
    .setImage(gif.media[0].mediumgif.url)
    .setColor("#00ff00");
  msg.channel.send(embedMsg);
}

module.exports = { getGif };
