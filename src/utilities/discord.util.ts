import { APIEmbedField } from 'discord.js';

export function field(name: string, value: string, inline = false): APIEmbedField {
    return { name, value, inline };
}
