import dotenv from 'dotenv';
import { Client, ClientUser, Intents, Util } from 'discord.js';
dotenv.config();
const client: Client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
    allowedMentions: {
        parse: [],
        repliedUser: false,
    },
});
/**
 * ロールをレインボーにするプログラムが実行中か
 */
let runed = false;

client.on('ready', () => {
    console.log(`Logged in as ${(client.user as ClientUser).tag}`);

    setInterval(() => {
        if (!runed) return;
        client.guilds.cache.get(process.env.GUILD_ID as string)?.roles.cache.get(process.env.ROLE_ID as string)?.setColor(Util.resolveColor('RANDOM'));
    }, 30000);
});

client.on('messageCreate', async message => {
    if (message.author.bot || message.system || !message.guild || !message.member?.permissions.has('ADMINISTRATOR')) return;

    if (message.content.startsWith('rbstart')) {
        runed = true;
        message.reply('スタート');
    }
    else if (message.content.startsWith('rbstop')) {
        runed = false;
        message.reply('停止');
    }
});

process.on('unhandledRejection', async (error, promise) => {
    console.error(error);
});


client.login();