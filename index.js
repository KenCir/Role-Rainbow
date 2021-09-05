require('dotenv').config();
const { codeBlock } = require('@discordjs/builders');
const { Client, Intents, Util, WebhookClient } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
let runed = false;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('監査ログスパム');

    setInterval(() => {
        if (!runed) return;
        client.guilds.cache.get('794380572323086358').roles.cache.get('884072208157270116').setColor(Util.resolveColor('RANDOM'));
    }, 30000);
})

client.on('messageCreate', async message => {
    if (message.author.bot || message.system || !message.guild || !message.member.permissions.has('ADMINISTRATOR')) return;

    if (message.content.startsWith('rstart')) {
        runed = true;
        message.react('881574101041442887');
    }
    else if (message.content.startsWith('rstop')) {
        runed = false;
        message.react('881574101041442887');
    }
})

process.on('unhandledRejection', async (error, promise) => {
    console.error(error);
    try {
        const webhook = new WebhookClient({ url: process.env.ERRORLOG_WEBHOOK_URL });
        await webhook.send(codeBlock(error.stack));
    } catch (error) {
        console.error(error);
    }
})


client.login();