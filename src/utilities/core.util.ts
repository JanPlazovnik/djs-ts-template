import { Interaction, ChatInputCommandInteraction, ModalSubmitInteraction } from 'discord.js';
import { IInteractionContext } from '../types/bot-core';

// Use for interactions that don't require a specific context.
export function getInteractionContext<T extends Interaction>(interaction: T): IInteractionContext<T> {
    return {
        interaction,
    };
}
