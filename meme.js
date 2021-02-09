const fetch = require("node-fetch");
const Discord = require("discord.js");
const memesSubReddits = [
  "IndianMeyMeys",
  "meme",
  "indiameme",
  "IndianDankMemes",
  "dankmemes",
];

async function getMeme(msg) {
  let url = "https://meme-api.herokuapp.com/gimme/";
  subReddit =
    memesSubReddits[Math.floor(Math.random() * memesSubReddits.length)];
  url += subReddit;
  let response = await fetch(url);
  let data = await response.json();
  let embedMsg = new Discord.MessageEmbed()
    .setTitle(data.title)
    .setAuthor(data.author)
    .setImage(data.url)
    .setColor("#ff0000");
  msg.channel.send(embedMsg);
}

module.exports = { getMeme };
