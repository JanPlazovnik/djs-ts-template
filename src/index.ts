import { Client, GatewayIntentBits } from 'discord.js';
import Bot from './Bot';
import Logger from './utilities/logger.util';
import { registerCommands } from './utilities/registration.util';
import { ICommand, IModal, IButton } from './types/bot-core';
import TestCommand from './interactions/test/test.command';
import TestButton from './interactions/test/test.button';
import TestModal from './interactions/test/test.modal';

async function start(): Promise<void> {
    if (!process.env.BOT_TOKEN) {
        Logger.error('BOT_TOKEN is missing. The bot cannot start without it.');
        return;
    }

    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildScheduledEvents],
    });

    const commands: ICommand[] = [TestCommand];
    const buttons: IButton[] = [TestButton];
    const modals: IModal[] = [TestModal];

    const bot = new Bot({
        token: process.env.BOT_TOKEN,
        client,
        interactions: {
            commands,
            buttons,
            modals,
        },
    });

    if (process.argv.includes('--register-commands')) {
        if (!process.env.BOT_CLIENT_ID) {
            Logger.error('BOT_CLIENT_ID is missing. The bot cannot register commands without it.');
            return;
        }

        await registerCommands(process.env.BOT_TOKEN, process.env.BOT_CLIENT_ID, commands);
        return;
    }

    await bot.start();
}

start();
