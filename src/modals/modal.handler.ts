import { ModalSubmitInteraction } from 'discord.js';
import { IHandler, IModal } from '../types/bot-core';
import { getInteractionContext } from '../utilities/core.util';
import Logger from '../utilities/logger.util';

export default class ModalHandler implements IHandler<ModalSubmitInteraction> {
    constructor(private readonly modals: IModal[]) {}

    public async handle(interaction: ModalSubmitInteraction): Promise<void> {
        if (interaction.user.bot) return;

        const modal = this.modals.find((modal) => modal.id === interaction.customId);
        if (!modal) {
            Logger.error(`Modal ${interaction.customId} [ID: ${interaction.id}] not found.`);
            return;
        }

        const context = getInteractionContext(interaction);

        await interaction.deferReply({ ephemeral: modal.options.ephemeral ?? false });

        try {
            await modal.execute(context);
        } catch (error: any) {
            await interaction.editReply('An error occurred while processing the modal.');
            Logger.error(`Modal ${interaction.customId} [ID: ${interaction.id}] failed to execute.`);
            Logger.error(error.toString());
        }
    }
}
