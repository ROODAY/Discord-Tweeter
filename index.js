require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.channel.name === process.env.CHANNEL) {
    console.log("am i mentioned:", msg.mentions.users.has(client.user.id));
    if (msg.mentions.users.has(client.user.id)) msg.reply("You called?");
    //msg.content
  }
});

client.login(process.env.BOT_TOKEN);