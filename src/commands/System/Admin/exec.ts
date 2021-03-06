import { BotCommand } from '@lib/structures/BotCommand';
import { PermissionLevels } from '@lib/types/Enums';
import { codeBlock } from '@sapphire/utilities';
import { exec } from '@utils/exec';
import { fetch, FetchMethods, FetchResultTypes } from '@utils/util';
import { MessageAttachment } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends BotCommand {
	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['execute'],
			description: (language) => language.get('commandExecDescription'),
			extendedHelp: (language) => language.get('commandExecExtended'),
			guarded: true,
			permissionLevel: PermissionLevels.BotOwner,
			usage: '<expression:string>',
			flagSupport: true
		});
	}

	public async run(message: KlasaMessage, [input]: [string]) {
		const result = await exec(input, { timeout: 'timeout' in message.flagArgs ? Number(message.flagArgs.timeout) : 60000 }).catch((error) => ({
			stdout: null,
			stderr: error
		}));
		const output = result.stdout ? `**\`OUTPUT\`**${codeBlock('prolog', result.stdout)}` : '';
		const outerr = result.stderr ? `**\`ERROR\`**${codeBlock('prolog', result.stderr)}` : '';
		const joined = [output, outerr].join('\n') || 'No output';

		return message.sendMessage(
			joined.length > 2000 ? await this.getHaste(joined).catch(() => new MessageAttachment(Buffer.from(joined), 'output.txt')) : joined
		);
	}

	private async getHaste(result: string) {
		const { key } = (await fetch('https://hasteb.in/documents', { method: FetchMethods.Post, body: result }, FetchResultTypes.JSON)) as {
			key: string;
		};
		return `https://hasteb.in/${key}.js`;
	}
}
