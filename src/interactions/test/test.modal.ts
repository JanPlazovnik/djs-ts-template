import { IModal, IInteractionContext, IInteractionOptions } from '../../types/bot-core';
import { ModalSubmitInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import InteractionUtils from '../../utilities/interaction.util';

export default class TestModal implements IModal {
    public id = 'test_modal';

    public options: IInteractionOptions = {
        ephemeral: true,
    };

    public async execute({ interaction }: IInteractionContext<ModalSubmitInteraction>): Promise<void> {
        // Create a new button
        const btn = new ButtonBuilder({
            custom_id: 'test_modal_btn',
            label: 'Test Button',
            style: ButtonStyle.Primary,
        });

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(btn);

        // Respond to the modal submit with a message containing a button
        await InteractionUtils.followUp(interaction, { content: 'Modal submitted!', components: [row] });
    }
}
