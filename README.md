# Template for a discord.js v14 bot using TS

Since I always end up making more bots, here's a quick template to get started with.

Not entirely sure if I like this way of doing things, but it's what I've done in my latest refactor - so it's what I'm sticking with for now.

## Getting started

1. Clone the repo
2. Update the `package.json` file with your bot's info
3. Run `npm install`
4. Create a `.env` file based on the `.env.example` file
5. Run `npm run commands:register` to register the slash commands
6. Run `npm run start:dev` to start the bot

This will setup the bot and register the demo slash command. You can now start developing. The bot will automatically restart when you make changes to the code.

In hindsight, I should have made the bot register the commands on a guild level during development. I'll probably add that in the future.

## Adding functionality

Currently, the bot only supports slash commands, buttons and modals. It's pretty easy to add more functionality though. You can look at the current handlers to see how it's done.

As far as handling the interaction goes, the intended way of doing things is to make a new folder for your module in the interactions directory and then make a new file for each type (command, button, modal, ...), for example:

```
/interactions
    /foo
        foo.command.ts
```

There's an example in the interactions directory for a test command, modal and button. The command creates a new modal which then sends a message with a button, so you get to test all three at once.

If you have any questions, feel free to ask.
