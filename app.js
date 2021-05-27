const token = "";
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const ms = require('ms');
const log = require('./modules/log.js');

log.log("logging in to discord")
client.login(token);
log.log("logged in to discord")

client.on('message', async message => {
    if (message.author.bot) return;
    log.log(message.channel.name + " - " + message.author.username + " : " + message.content);
    if (message.channel.type == "dm") {
        message.reply(':no_entry_sign: Noch kann ich nicht in Privatnachrichten antworten.');
        return;
    }
    if (message.content.startsWith("#play")) {
        if (message.member.voice.channel) {
            async function getYTlink() {
                if (message.content.substring(6).includes("www.")) {
                    ytlink = message.content.substring(6);
                } else {
                    const searchResults = await ytsr(message.content.substring(6))
                    console.log(searchResults.items[0].url);
                    ytlink = searchResults.items[0].url;
                    message.reply("Spiele: " + searchResults.items[0].title + " (" + searchResults.items[0].duration + ")")
                    const musicattachment = new client.MessageAttachment(searchResults.items[0].bestThumbnail.url);
                    message.reply(musicattachment);
                }
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play(ytdl(ytlink, { filter: 'audioonly' }));
                dispatcher.resume();
                dispatcher.setVolume(100.0); // half the volume
                dispatcher.on('finish', () => {
                    console.log('Finished playing!');
                    dispatcher.destroy(); // end the stream
                    message.member.voice.channel.leave();
                });
            }
            getYTlink();
        } else {
            message.reply(':no_entry_sign: Du musst einem Sprachkanal beitreten, um das zu benutzen!');
        }

    }
    if (message.content === '#avatar') {
        const avatarattachment = new client.MessageAttachment(message.author.displayAvatarURL());
        message.reply(avatarattachment);
    }
});
client.on('voiceStateUpdate', async voicestate => {
    console.log(voicestate.VoiceStates);
});


client.on('debug', async debug => {
    log.systemlog(debug);
});

client.on("channelCreate", async channel => {
    log.log(channel.type + "-kanal mit dem Namen " + channel.name + "und der ID:" + channel.id + "erstellt");
});

// client.on("userUpdate", async user => {
//     log.log(channel.type + "-kanal mit dem Namen " + channel.name + "und der ID:" + channel.id + "erstellt");
// });