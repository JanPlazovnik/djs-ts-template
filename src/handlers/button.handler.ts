import { ButtonInteraction } from 'discord.js';
import { IButton, IHandler } from '../types/bot-core';
import { getInteractionContext } from '../utilities/core.util';
import Logger from '../utilities/logger.util';

export default class ButtonHandler implements IHandler<ButtonInteraction> {
    constructor(private readonly buttons: IButton[]) {}

    public async handle(interaction: ButtonInteraction): Promise<void> {
        if (interaction.user.bot) return;

        const button = this.buttons.find((button) => button.id === interaction.customId);
        if (!button) {
            Logger.error(`Button ${interaction.customId} [ID: ${interaction.id}] not found.`);
            return;
        }

        const context = getInteractionContext(interaction);

        await interaction.deferReply({ ephemeral: button.options?.ephemeral ?? false });

        try {
            await button.execute(context);
        } catch (error: any) {
            await interaction.editReply('An error occurred while processing the button.');
            Logger.error(`Button ${interaction.customId} [ID: ${interaction.id}] failed to execute.`);
            Logger.error(error.toString());
        }
    }
}
