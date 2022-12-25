import { ButtonInteraction } from 'discord.js';
import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ModalSubmitInteraction,
    Interaction,
    Client,
} from 'discord.js';

export interface IBotOptions {
    token: string;
    client: Client;
    handlers?: {
        command?: IHandler<ChatInputCommandInteraction>;
        button?: IHandler<ButtonInteraction>;
        modal?: IHandler<ModalSubmitInteraction>;
    };
}

export interface IInteractionOptions {
    ephemeral?: boolean;
    cooldown?: number;
}

export interface IInteractionContext<T extends Interaction> {
    interaction: T;
}

export interface IHandler<T extends Interaction> {
    handle: (interaction: T) => Promise<void>;
}

export interface IInteraction<T extends Interaction> {
    options: IInteractionOptions;
    execute: (context: IInteractionContext<T>) => Promise<void>;
}

export interface ICommand extends IInteraction<ChatInputCommandInteraction> {
    builder: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
}

export interface IButton extends IInteraction<ButtonInteraction> {
    id: string;
}

export interface IModal extends IInteraction<ModalSubmitInteraction> {
    id: string;
}
