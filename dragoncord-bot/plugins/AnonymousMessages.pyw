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
from aiohttp import ClientSession
print('[Python] from aiohttp import ClientSession')

# Init bot
bot = commands.Bot(
	command_prefix="anonmsgs/",
	help_command = None,
	intents = discord.Intents.all(),
	allowed_mentions = discord.AllowedMentions.all(),
	fetch_offline_members = True
)
token = "OTY4MTUzMzc2MzQyODM1MjYy.YmatGA.TvA-vLi-BSLE5NxeGjkeaabdZgA"
rgbR = 74
rgbG = 125
rgbB = 207
guild_ids = [966381488583102546, 879681251680878653]
print('[Dragoncord Bot Plugin] Initialized')

# Events
# When bot is ready
@bot.event
async def on_ready():
    print(f'[Discord] Bot Started: {bot.user.name}#{bot.user.discriminator} | {bot.user.id}')

## BUTTONS *CLICK* *CLICK*
@bot.event
async def on_button_click(interaction):
	if interaction.responded:
		return
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

print('[Dragoncord Bot Plugin] Events loaded')

@bot.command()
async def anonMsg(ctx, *, anonMsg):
	await ctx.message.delete()
	await ctx.send(anonMsg)

print('[Dragoncord Bot Plugin] Commands loaded')
print('[Dragoncord Bot Plugin] Starting...')
bot.run(token)