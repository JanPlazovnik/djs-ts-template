import { Client, Events, Interaction } from 'discord.js';
import Logger from './utilities/logger.util';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { IBotOptions, IInteraction } from './types/bot-core';
import { getInteractionContext } from './utilities/core.util';

export default class Bot {
    private readonly client = this.options.client;
    private readonly interactions = this.options.interactions || {};

    constructor(private readonly options: IBotOptions) {}

    public async start(): Promise<void> {
        dayjs.extend(duration);
        dayjs.extend(relativeTime);
        dayjs.extend(customParseFormat);
        dayjs.extend(utc);
        dayjs.extend(timezone);

        this.registerListeners();
        await this.login(this.options.token);
    }

    private registerListeners(): void {
        this.client.on(Events.ClientReady, this.onReady.bind(this));
        this.client.on(Events.InteractionCreate, this.onInteraction.bind(this));
    }

    private async login(token: string): Promise<void> {
        await this.client.login(token);
    }

    private async onReady(): Promise<void> {
        Logger.process(`${this.client?.user?.tag} is ready!`);
    }

    private async onInteraction(interaction: Interaction): Promise<void> {
        // Ignore interactions from bots.
        if (interaction.user.bot) return;

        // Get the interaction runner.
        const { commands, buttons, modals } = this.interactions;
        let runner: IInteraction<any> | undefined;

        if (interaction.isChatInputCommand()) {
            runner = commands?.find((command) => command.builder.name === interaction.commandName);
        } else if (interaction.isButton()) {
            runner = buttons?.find((button) => button.id === interaction.customId);
        } else if (interaction.isModalSubmit()) {
            runner = modals?.find((modal) => modal.id === interaction.customId);
        }

        // If the interaction runner is not found, log it and
        if (!runner) {
            Logger.error(`Interaction ${interaction.id} not found.`);
            return;
        }

        // Get the interaction context.
        const context = getInteractionContext(interaction);

        // Defer the reply if the runner has the ephemeral option set.
        // This is optional because some interactions should not be deferred.
        if (runner.options?.ephemeral !== undefined && 'deferReply' in interaction) {
            await interaction.deferReply({ ephemeral: runner.options.ephemeral ?? false });
        }

        try {
            // Execute the interaction.
            await runner.execute(context);
        } catch (error: any) {
            Logger.error(`Interaction ${interaction.id} failed to execute.`);
            Logger.error(error.toString());
        }
    }
}
