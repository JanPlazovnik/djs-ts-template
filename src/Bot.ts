import { Client, Events, Interaction } from 'discord.js';
import Logger from './utilities/logger.util';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { IBotOptions, IHandler } from './types/bot-core';

export default class Bot {
    private readonly client: Client;
    private readonly handlers;

    constructor(private readonly options: IBotOptions) {
        this.client = options.client;
        this.handlers = options.handlers;
    }

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
        let handler: IHandler<any> | undefined;

        if (interaction.isChatInputCommand()) {
            handler = this.handlers?.command;
        } else if (interaction.isButton()) {
            handler = this.handlers?.button;
        } else if (interaction.isModalSubmit()) {
            handler = this.handlers?.modal;
        }

        if (!handler) {
            Logger.error(`Interaction ${interaction.id} [${interaction.type}] is not supported.`);
            return;
        }

        try {
            await handler.handle(interaction);
        } catch (error: any) {
            Logger.error(`Interaction ${interaction.id} failed to execute.`);
            Logger.error(error.toString());
        }
    }
}
