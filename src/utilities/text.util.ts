export function truncate(text: string, length: number): string {
    return text.length > length ? text.slice(0, length) + '…' : text;
}

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function upperCase(text: string): string {
    return text.toUpperCase();
}

export function lowerCase(text: string): string {
    return text.toLowerCase();
}

export function spongeCase(text: string): string {
    return text
        .split('')
        .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join('');
}

export function reverse(text: string): string {
    return text.split('').reverse().join('');
}

export function codeBlock(text: string, language = ''): string {
    return `\`\`\`${language}\n${text}\n\`\`\``;
}

export function inlineCode(text: string): string {
    return `\`${text}\``;
}

export function bold(text: string): string {
    return `**${text}**`;
}

export function italic(text: string): string {
    return `*${text}*`;
}

export function underline(text: string): string {
    return `__${text}__`;
}

export function strikethrough(text: string): string {
    return `~~${text}~~`;
}

export function quote(text: string): string {
    return `> ${text}`;
}

export function spoiler(text: string): string {
    return `||${text}||`;
}
