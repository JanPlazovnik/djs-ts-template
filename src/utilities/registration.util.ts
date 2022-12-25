import { REST, Routes } from 'discord.js';
import { ICommand } from '../types/bot-core';
import Logger from './logger.util';

export async function registerCommands(token: string, clientId: string, commands: ICommand[]): Promise<void> {
    const rest = new REST({ version: '9' }).setToken(token);

    try {
        Logger.process('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands.map((command) => command.builder.toJSON()),
        });
        Logger.process('Successfully reloaded application (/) commands.');
    } catch (error: any) {
        Logger.error('Failed to register commands.');
        Logger.error(error.toString());
    }
}
