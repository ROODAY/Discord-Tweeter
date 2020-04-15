require('dotenv').config();
const Discord = require('discord.js');
const Twitter = require('twitter');
const client = new Discord.Client();

const tweeter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.channel.name === process.env.CHANNEL && msg.mentions.users.has(client.user.id)) {
    tweeter.post('statuses/update', { status: msg.content.replace(`<@!${client.user.id}> `, '') })
      .then(tweet => {
        const link = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
        console.log(`Posted: ${link}`);
        msg.reply(`Your tweet is up! ${link}`);
      })
      .catch(error => {
        console.error(error);
        msg.reply(`Uh oh, something went wrong! ${error}`);
      });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);