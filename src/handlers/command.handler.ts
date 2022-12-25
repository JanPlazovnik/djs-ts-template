import { ChatInputCommandInteraction } from 'discord.js';
import { ICommand, IHandler } from '../types/bot-core';
import { getInteractionContext } from '../utilities/core.util';
import Logger from '../utilities/logger.util';

export default class CommandHandler implements IHandler<ChatInputCommandInteraction> {
    constructor(private readonly commands: ICommand[]) {}

    public async handle(interaction: ChatInputCommandInteraction): Promise<void> {
        if (interaction.user.bot) return;

        const command = this.commands.find((command) => command.builder.name === interaction.commandName);
        if (!command) {
            Logger.error(`Command ${interaction.commandName} [ID: ${interaction.id}] not found.`);
            return;
        }

        const context = getInteractionContext(interaction);

        // Checking for undefined since some commands must not be deferred.
        // For example, if a command needs to show a modal, it should never be deferred.
        // Unless I did something wrong during testing, in which case, please let me know :)
        if (command.options?.ephemeral !== undefined) {
            await interaction.deferReply({ ephemeral: command.options.ephemeral ?? false });
        }

        try {
            await command.execute(context);
        } catch (error: any) {
            await interaction.editReply('An error occurred while processing the command.');
            Logger.error(`Command ${interaction.commandName} [ID: ${interaction.id}] failed to execute.`);
            Logger.error(error.toString());
        }
    }
}
