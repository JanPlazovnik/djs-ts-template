import { ICommand, IInteractionContext } from '../../types/bot-core';
import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    TextInputStyle,
    ComponentType,
    ActionRowBuilder,
} from 'discord.js';
import { ModalBuilder, TextInputBuilder } from '@discordjs/builders';

export default class TestCommand implements ICommand {
    public builder = new SlashCommandBuilder().setName('test').setDescription('Opens a modal.');

    public async execute({ interaction }: IInteractionContext<ChatInputCommandInteraction>): Promise<void> {
        // Create a new modal
        const modal = new ModalBuilder({
            title: 'Test Modal',
            custom_id: 'test_modal',
        });

        // Create a new text input
        const textInput = new TextInputBuilder({
            custom_id: 'test_text_input',
            label: 'Test Text Input',
            placeholder: 'Enter some text',
            style: TextInputStyle.Short,
            type: ComponentType.TextInput,
        });

        // Create a new action row
        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);

        // Add the row to the modal
        modal.addComponents(row);

        // Send the modal to the user
        await interaction.showModal(modal);
    }
}
