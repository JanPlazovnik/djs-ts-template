import { IButton, IInteractionContext } from '../../types/bot-core';
import { ButtonInteraction } from 'discord.js';
import InteractionUtils from '../../utilities/interaction.util';

export default class TestButton implements IButton {
    public id = 'test_modal_btn';

    public options = {
        ephemeral: true,
    };

    public async execute({ interaction }: IInteractionContext<ButtonInteraction>): Promise<void> {
        await InteractionUtils.followUp(interaction, 'Button clicked!');
    }
}
