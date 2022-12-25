import {
    CommandInteraction,
    EmbedBuilder,
    InteractionReplyOptions,
    MessageComponentInteraction,
    ModalSubmitInteraction,
} from 'discord.js';
import Logger from './logger.util';

export default class InteractionUtils {
    // prettier-ignore
    public static async sendError(
        interaction: CommandInteraction | MessageComponentInteraction | ModalSubmitInteraction, 
        message: string|EmbedBuilder = 'An error occurred while executing the command.'
    ): Promise<void> {
        try {
            let embed: EmbedBuilder;
            if (typeof message === 'string') {
                embed = new EmbedBuilder().setDescription(message).setColor(0xff0000);
            } else {
                embed = message;
            }
            
            await interaction.followUp({ ephemeral: true, embeds: [embed] });
        } catch (error: any) {
            Logger.error(`Failed to send error message to interaction ${interaction.id}.`);
            Logger.error(error.toString());
        }
    }

    // prettier-ignore
    public static async followUp(
        interaction: CommandInteraction | MessageComponentInteraction | ModalSubmitInteraction,
        options: string | InteractionReplyOptions
    ) {
        try {
            if (typeof options === 'string') {
                await interaction.followUp({ content: options, ephemeral: true });
                return;
            }
            await interaction.followUp({ ephemeral: true, ...options });
        } catch (error: any) {
            Logger.error(`Failed to send error message to interaction ${interaction.id}.`);
            Logger.error(error.toString());
        }
    }
}
