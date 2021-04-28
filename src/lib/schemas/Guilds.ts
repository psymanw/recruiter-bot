import { Time } from '@utils/constants';
import { Client } from 'klasa';

export default Client.defaultGuildSchema
	.add('commandUses', 'Integer', { default: 0, configurable: false })
	.add('prefix', 'string', { filter: (_client, value) => (value as string).length > 10 })
	.add('custom-commands', 'CustomCommand', { array: true, configurable: false })
	.add('permissions', (folder) =>
		folder
			.add('users', 'PermissionNode', { array: true, configurable: false })
			.add('roles', 'PermissionNode', { array: true, configurable: false })
	)
	.add('channels', (folder) =>
		folder
			.add('announcements', 'TextChannel')
			.add('greeting', 'TextChannel')
			.add('farewell', 'TextChannel')
			.add('member-logs', 'TextChannel')
			.add('message-logs', 'TextChannel')
			.add('moderation-logs', 'TextChannel')
			.add('nsfw-message-logs', 'TextChannel')
			.add('image-logs', 'TextChannel')
			.add('prune-logs', 'TextChannel')
			.add('reaction-logs', 'TextChannel')
			.add('spam', 'TextChannel')
			.add('ignore', (folder) =>
				folder
					.add('message-delete', 'CategoryOrTextChannel', { array: true })
					.add('message-edit', 'CategoryOrTextChannel', { array: true })
					.add('reaction-add', 'CategoryOrTextChannel', { array: true })
					.add('all', 'CategoryOrTextChannel', { array: true })
			)
	)
	.add('command-autodelete', 'CommandAutoDelete', { array: true, configurable: false })
	.add('disabledChannels', 'TextChannel', { array: true, configurable: false })
	.add('disabledCommandsChannels', 'DisabledCommandChannel', { array: true, configurable: false })
	.add('events', (folder) =>
		folder
			.add('banAdd', 'Boolean', { default: false })
			.add('banRemove', 'Boolean', { default: false })
			.add('memberAdd', 'Boolean', { default: false })
			.add('memberRemove', 'Boolean', { default: false })
			.add('memberNameUpdate', 'Boolean', { default: false })
			.add('memberRoleUpdate', 'Boolean', { default: false })
			.add('messageDelete', 'Boolean', { default: false })
			.add('messageEdit', 'Boolean', { default: false })
			.add('twemoji-reactions', 'Boolean', { default: false })
	)
	.add('messages', (folder) =>
		folder
			.add('farewell', 'String', { maximum: 2000 })
			.add('greeting', 'String', { maximum: 2000 })
			.add('join-dm', 'String', { maximum: 1500 })
			.add('ignoreChannels', 'TextChannel', { array: true })
			.add('announcement-embed', 'Boolean', { default: false })
			.add('moderation-dm', 'Boolean', { default: false })
			.add('moderation-reason-display', 'Boolean', { default: true })
			.add('moderation-message-display', 'Boolean', { default: true })
			.add('moderation-auto-delete', 'Boolean', { default: false })
			.add('moderator-name-display', 'Boolean', { default: true })
	)
	.add('stickyRoles', 'StickyRole', { array: true, configurable: false })
	.add('reaction-roles', 'ReactionRole', { array: true, configurable: false })
	.add('roles', (folder) =>
		folder
			.add('admin', 'Role')
			.add('auto', 'AutoRole', { array: true, configurable: false })
			.add('initial', 'Role')
			.add('moderator', 'Role')
			.add('muted', 'Role')
			.add('restricted-reaction', 'Role')
			.add('restricted-embed', 'Role')
			.add('restricted-emoji', 'Role')
			.add('restricted-attachment', 'Role')
			.add('restricted-voice', 'Role')
			.add('public', 'Role', { array: true })
			.add('removeInitial', 'Boolean')
			.add('dj', 'Role')
			.add('subscriber', 'Role')
			.add('uniqueRoleSets', 'UniqueRoleSet', { array: true, configurable: false })
	)
	.add('selfmod', (folder) =>
		folder
			.add('attachment', 'Boolean', { default: false })
			.add('attachmentMaximum', 'Integer', { default: 20, minimum: 0, maximum: 60 })
			.add('attachmentDuration', 'Integer', { default: 20000, minimum: 5000, maximum: 120000, configurable: false })
			.add('attachmentAction', 'Integer', { default: 0, configurable: false })
			.add('attachmentPunishmentDuration', 'Integer', { configurable: false })
			.add('capitals', (capitals) =>
				capitals
					.add('enabled', 'Boolean', { default: false })
					.add('ignoredRoles', 'Role', { array: true })
					.add('ignoredChannels', 'TextChannel', { array: true })
					.add('minimum', 'Integer', { default: 15, minimum: 5, maximum: 2000 })
					.add('maximum', 'Integer', { default: 50, minimum: 10, maximum: 100 })
					.add('softAction', 'Integer', { default: 0, configurable: false })
					.add('hardAction', 'Integer', { default: 0, configurable: false })
					.add('hardActionDuration', 'Integer', { minimum: 1000, configurable: false })
					.add('thresholdMaximum', 'Integer', { default: 10, minimum: 0, maximum: 60, configurable: false })
					.add('thresholdDuration', 'Integer', { default: 60000, minimum: 0, maximum: 120000, configurable: false })
			)
			.add('links', (invites) =>
				invites
					.add('whitelist', 'URL', { array: true })
					.add('enabled', 'Boolean', { default: false })
					.add('ignoredRoles', 'Role', { array: true })
					.add('ignoredChannels', 'TextChannel', { array: true })
					.add('softAction', 'Integer', { default: 0, configurable: false })
					.add('hardAction', 'Integer', { default: 0, configurable: false })
					.add('hardActionDuration', 'Integer', { minimum: 1000, configurable: false })
					.add('thresholdMaximum', 'Integer', { default: 10, minimum: 0, maximum: 60, configurable: false })
					.add('thresholdDuration', 'Integer', { default: 60000, minimum: 0, maximum: 120000, configurable: false })
			)
			.add('messages', (capitals) =>
				capitals
					.add('enabled', 'Boolean', { default: false })
					.add('ignoredRoles', 'Role', { array: true })
					.add('ignoredChannels', 'TextChannel', { array: true })
					.add('maximum', 'Integer', { default: 5, minimum: 2, maximum: 100 })
					.add('queue-size', 'Integer', { default: 50, minimum: 10, maximum: 100 })
					.add('softAction', 'Integer', { default: 0, configurable: false })
					.add('hardAction', 'Integer', { default: 0, configurable: false })
					.add('hardActionDuration', 'Integer', { minimum: 1000, configurable: false })
					.add('thresholdMaximum', 'Integer', { default: 10, minimum: 0, maximum: 60, configurable: false })
					.add('thresholdDuration', 'Integer', { default: 60000, minimum: 0, maximum: 120000, configurable: false })
			)
			.add('newlines', (newline) =>
				newline
					.add('enabled', 'Boolean', { default: false })
					.add('ignoredRoles', 'Role', { array: true })
					.add('ignoredChannels', 'TextChannel', { array: true })
					.add('maximum', 'Integer', { default: 20, minimum: 10, maximum: 2000 })
					.add('softAction', 'Integer', { default: 0, configurable: false })
					.add('hardAction', 'Integer', { default: 0, configurable: false })
					.add('hardActionDuration', 'Integer', { minimum: 1000, configurable: false })
					.add('thresholdMaximum', 'Integer', { default: 10, minimum: 0, maximum: 60, configurable: false })
					.add('thresholdDuration', 'Integer', { default: 60000, minimum: 0, maximum: 120000, configurable: false })
			)
			.add('invites', (invites) =>
				invites
					.add('enabled', 'Boolean', { default: false })
					.add('ignoredCodes', 'Invite', { array: true })
					.add('ignoredGuilds', 'Snowflake', { array: true })
					.add('ignoredRoles', 'Role', { array: true })
					.add('ignoredChannels', 'TextChannel', { array: true })
					.add('softAction', 'Integer', { default: 0, configurable: false })
					.add('hardAction', 'Integer', { default: 0, configurable: false })
					.add('hardActionDuration', 'Integer', { minimum: 1000, configurable: false })
					.add('thresholdMaximum', 'Integer', { default: 10, minimum: 0, maximum: 60, configurable: false })
					.add('thresholdDuration', 'Integer', { default: 60000, minimum: 0, maximum: 120000, configurable: false })
			)
			.add('filter', (filter) =>
				filter
					.add('raw', 'String', { array: true, maximum: 32, configurable: false })
					.add('enabled', 'Boolean', { default: false })
					.add('ignoredRoles', 'Role', { array: true })
					.add('ignoredChannels', 'TextChannel', { array: true })
					.add('softAction', 'Integer', { default: 0, configurable: false })
					.add('hardAction', 'Integer', { default: 0, configurable: false })
					.add('hardActionDuration', 'Integer', { minimum: 1000, configurable: false })
					.add('thresholdMaximum', 'Integer', { default: 10, minimum: 0, maximum: 60, configurable: false })
					.add('thresholdDuration', 'Integer', { default: 60000, minimum: 0, maximum: 120000, configurable: false })
			)
			.add('reactions', (filter) =>
				filter
					.add('maximum', 'Integer', { default: 10, minimum: 1, maximum: 100 })
					.add('whitelist', 'Emoji', { array: true })
					.add('blacklist', 'Emoji', { array: true })
					.add('enabled', 'Boolean', { default: false })
					.add('ignoredRoles', 'Role', { array: true })
					.add('ignoredChannels', 'TextChannel', { array: true })
					.add('softAction', 'Integer', { default: 0, configurable: false })
					.add('hardAction', 'Integer', { default: 0, configurable: false })
					.add('hardActionDuration', 'Integer', { minimum: 1000, configurable: false })
					.add('thresholdMaximum', 'Integer', { default: 10, minimum: 0, maximum: 60, configurable: false })
					.add('thresholdDuration', 'Integer', { default: 60000, minimum: 0, maximum: 120000, configurable: false })
			)
			.add('raid', 'Boolean')
			.add('raidthreshold', 'Integer', { default: 10, minimum: 2, maximum: 50 })
			.add('ignoreChannels', 'TextChannel', { array: true })
	)
	.add('recruitment', (folder) =>
		folder
			.add('enabled', 'boolean', { default: false })
			.add('channel', 'TextChannel')
			.add('officerChannel', 'TextChannel')
			.add('officerRole', 'Role')
			.add('viewerRole', 'Role')
			.add('emoji', 'String', { default: '%E2%98%91%EF%B8%8F', configurable: false })
			.add('recruitMessage', 'String')
	)
	.add('starboard', (folder) =>
		folder
			.add('channel', 'TextChannel')
			.add('emoji', 'String', { default: '%E2%AD%90', configurable: false })
			.add('ignoreChannels', 'TextChannel', { array: true })
			.add('minimum', 'Integer', { default: 1, minimum: 1, inclusive: true })
			.add('selfStar', 'Boolean', { default: false })
	)
	.add('trigger', (folder) =>
		folder
			.add('alias', 'TriggerAlias', { array: true, configurable: false })
			.add('includes', 'TriggerInclude', { array: true, configurable: false })
	)
	.add('music', (folder) =>
		folder
			.add('default-volume', 'Number', { minimum: 0, maximum: 200, default: 100 })
			.add('maximum-duration', 'Number', { minimum: 0, maximum: Time.Hour * 12, default: Time.Hour * 2 })
			.add('maximum-entries-per-user', 'Number', { minimum: 1, maximum: 250, default: 100 })
			.add('allow-streams', 'Boolean', { default: true })
	);
