import { IModal, IInteractionContext, IInteractionOptions } from '../../types/bot-core';
import { ModalSubmitInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import InteractionUtils from '../../utilities/interaction.util';

const TestModal: IModal = {
    // The custom_id of the modal that this interaction will be executed for
    id: 'test_modal',

    // Options for this interaction
    options: {
        ephemeral: true,
    },

    // The function that will be executed when the modal is submitted
    async execute({ interaction }: IInteractionContext<ModalSubmitInteraction>): Promise<void> {
        // Create a new button
        const btn = new ButtonBuilder({
            custom_id: 'test_modal_btn',
            label: 'Test Button',
            style: ButtonStyle.Primary,
        });

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(btn);

        // Respond to the modal submit with a message containing a button
        await InteractionUtils.followUp(interaction, { content: 'Modal submitted!', components: [row] });
    },
};

export default TestModal;
