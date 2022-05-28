print('[Dragoncord Bot] Started Loading')

# Main Discord Library
import discord
print('[Python] import discord')
from discord import *
print('[Python] from discord import *')
from discord.ext import commands
print('[Python] from discord.ext import commands')

from discord import utils
print('[Python] from discord import utils')
from discord import channel
print('[Python] from discord import channel')
from discord.ext.commands.core import has_permissions
print('[Python] from discord.ext.commands.core import has_permissions')
from discord.utils import get
print('[Python] from discord.utils import get')
from discord_components import DiscordComponents, Button, ButtonStyle
print('[Python] from discord_components import DiscordComponents, Button, ButtonStyle')
from aiohttp import ClientSession
print('[Python] from aiohttp import ClientSession')
import interactions
print('[Python] import interactions')
import requests
print('[Python] import requests')
import json
print('[Python] import json')
from discord_slash.utils.manage_components import create_button, create_actionrow
print('[Python] from discord_slash.utils.manage_components import create_button, create_actionrow')
from discord_slash.model import ButtonStyle
print('[Python] from discord_slash.model import ButtonStyle')
import random
print('[Python] import random')
from keep_alive import keep_alive
print('[Python] from keep_alive import keep_alive')

# Slash commands library
from discord_slash import SlashCommand, SlashContext
print('[Python] from discord_slash import SlashCommand, SlashContext')

# Init bot
bot = commands.Bot(
	command_prefix="dcord/",
	help_command = None,
	intents = discord.Intents.all(),
	allowed_mentions = discord.AllowedMentions.all(),
	fetch_offline_members = True,
	status=discord.Status.idle
)
DiscordComponents(bot)
slash = SlashCommand(bot, sync_commands=True)
token = "OTY2MzY0NzY1MzcyOTY4OTgw.YmArUg.HJ3icxr9YxCKK4SlRIPx1PjFX_s"
rgbR = 74
rgbG = 125
rgbB = 207
guild_ids = []
footerText = "Dragoncord Bot | Dragons and cats the best"
print('[Dragoncord Bot] Initialized')

# Events
# When bot is ready
@bot.event
async def on_ready():
	print(f'[Discord] Bot Started: {bot.user.name}#{bot.user.discriminator} | {bot.user.id}')
	servers = list(bot.guilds)
	print("Connected on " + str(len(bot.guilds)) + " servers:")
	for guild in bot.guilds:
		print(f" - {guild.name} | {guild.id}")

@bot.event
async def on_guild_join(guild):
	print(f'{guild.name} | {guild.id}')
	guildCurrent = guild
	embed = discord.Embed(
		title = f'Thanks!',
		description = f'Hello! Thanks for adding Dragoncord bot to {guild.name}!',
		colour = discord.Colour.from_rgb(rgbR, rgbG, rgbB)
	)
	embed.add_field(name=f'Now, this server is supporting:', value=f" - Dragoncord integration\n - Extensions\n - And more!", inline=False)
	embed.set_footer(text = footerText)
	await random.choice(guildCurrent.text_channels).send(embed=embed)

@bot.event
async def on_button_click(interaction):
	if interaction.responded: return
	else:
		embederror = discord.Embed(
			title = f'Error',
			description = f'This interaction is not available. Please execute this command again',
			colour = discord.Colour.from_rgb(255, 0, 0)
		)
		await interaction.send(embed=embederror)

## Error handling
@bot.event
async def on_command_error(ctx, error):
	if isinstance(error, commands.CommandNotFound):
		embed = discord.Embed(title = f'Command not supported', colour = discord.Colour.from_rgb(255, 0, 0))
		embed.add_field(name=f'STOP USING OLD COMMAND TYPE, PLEASE', value=f"Old commands type is not supported! Please use slash commands (/)", inline=False)
		await ctx.send(embed=embed)
	else:
		print(error)
		embederror = discord.Embed(
			title = f'Oof.. Looks like something is broken!',
			description = f'An error occurred while executing the code. Error information: ```{ error }```',
			colour = discord.Colour.from_rgb(255, 0, 0)
		)
		await ctx.send(embed=embederror)
		pass

print('[Dragoncord Bot] Events loaded')

# NITRO FEATURES
## Free Emotes
#@bot.event
#async def on_message(message):
#	if (message.author.bot): pass
#	else:
#		await message.delete()
#		async with ClientSession() as session:
#			webhook = discord.Webhook.from_url("https://discord.com/api/webhooks/966394407404306442/DE-T_sVDtWbuStOdS57yuY8yN_Hd0XKGMiiQkKVkprZp2QJXIFzXS9eINw-z5CJ4X4pH", adapter=discord.AsyncWebhookAdapter(session))
#			handledMessage = message.content.replace("1:", "<:custom_emoji:").replace(":2", ">")
#			await webhook.send(
#				content=handledMessage,
#				username=message.author.name,
#				avatar_url=message.author.avatar_url
#			)

## Split Message
@bot.event
async def on_message(message):
	if (message.author.bot): pass
	else:
		try:
			if message.attachments[0].filename == "message.txt":
				print('[Dragoncord] message.txt detected!')
				print('[Dragoncord] Downloading message.txt')
				await attach.save(f".\\temp\\split-message\\{message.attachments[0].filename}")
				print('[Dragoncord] Splitting...')
				splittedMsg = open(f".\\temp\\split-message\\{message.attachments[0].filename}", "r")
				splittedMessage = wrap(s, 2000)
		except IndexError:
			pass
# Commands
## Ping
@slash.slash(name="ping", description="Ping! Pong!", guild_ids=guild_ids)
async def ping(ctx: SlashContext):
	embed = discord.Embed(
		title = f'Pong!',
		description = f'Ping: {bot.latency * 1000}',
		colour = discord.Colour.from_rgb(rgbR, rgbG, rgbB)
	)
	embed.set_footer(text = footerText)
	await ctx.send(embed=embed)

## Extensions
@slash.slash(name="extensions", description="Extensions for server", guild_ids=guild_ids)
async def extensions(ctx: SlashContext):
	embed = discord.Embed(
		title = f'Extensions (BETA)',
		description = f'Extensions store',
		colour = discord.Colour.from_rgb(rgbR, rgbG, rgbB)
	)
	embed.add_field(name='Dragoncord', value='[Main client for everything](https://github.com/Dragoncord-for-discord/dragoncord)', inline=True)
	embed.add_field(name='Dragoncord Bot', value=f'[Bot for some features](https://discord.com/api/oauth2/authorize?client_id=966364765372968980&permissions=8&scope=bot%20applications.commands)', inline=True)
	embed.add_field(name='Anonymous messages', value='[Write you messages as Anonymous](https://discord.com/api/oauth2/authorize?client_id=968153376342835262&permissions=8&scope=bot)', inline=True)
	embed.add_field(name='Test', value='Test', inline=True)
	embed.add_field(name='Test', value='Test', inline=True)
	embed.add_field(name='Test', value='Test', inline=True)
	embed.add_field(name='Extensions are still under constuction', value='Extensions are still under constuction', inline=True)
	embed.set_footer(text = footerText)
	await ctx.send(embed=embed)

## Extensions
@slash.slash(name="added_extensions", description="Added extensions", guild_ids=guild_ids)
async def added_extensions(ctx: SlashContext):
	if ctx.guild.get_member(968153376342835262) is not None: anonymousMessagesPlugin = True
	else: anonymousMessagesPlugin = False

	if ctx.guild.get_member(966364765372968980) is not None: dragoncordBot = True
	else: dragoncordBot = False

	embed = discord.Embed(
		title = f'Extensions (BETA)',
		description = f'Added extensions',
		colour = discord.Colour.from_rgb(rgbR, rgbG, rgbB)
	)

	embed.add_field(name='Dragoncord Bot', value=f'{dragoncordBot}', inline=True)
	if anonymousMessagesPlugin == True: embed.add_field(name='Anonymous messages', value=f'{anonymousMessagesPlugin}', inline=True)
	if dragoncordBot == True: embed.add_field(name='Extensions are still under constuction', value='Extensions are still under constuction', inline=True)
	embed.set_footer(text = footerText)
	await ctx.send(embed=embed)

## Setup
@slash.slash(name="setup", description="Setup server to start using bypasses!", guild_ids=guild_ids)
async def ping(ctx: SlashContext):
	embed = discord.Embed(
		title = f'Setup',
		description = f'0%/100%',
		colour = discord.Colour.from_rgb(rgbR, rgbG, rgbB)
	)
	msgToEdit = await ctx.send(embed=embed)
	await ctx.channel.create_webhook(name="Dragoncord")
	embed = discord.Embed(
		title = f'Setup',
		description = f'100%/100% | Setup completed!',
		colour = discord.Colour.from_rgb(rgbR, rgbG, rgbB)
	)
	await msgToEdit.edit(embed=embed)

print('[Dragoncord Bot] Commands loaded')
print('[Dragoncord Bot] Starting...')
bot.run(token)