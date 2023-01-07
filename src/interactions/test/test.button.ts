import { IButton, IInteractionContext } from '../../types/bot-core';
import { ButtonInteraction } from 'discord.js';
import InteractionUtils from '../../utilities/interaction.util';

const TestButton: IButton = {
    // The custom_id of the button that this interaction will be executed for
    id: 'test_modal_btn',

    // Options for this interaction
    options: {
        ephemeral: true,
    },

    // The function that will be executed when the button is clicked
    async execute({ interaction }: IInteractionContext<ButtonInteraction>): Promise<void> {
        await InteractionUtils.followUp(interaction, 'Button clicked!');
    },
};

export default TestButton;
