@bot.command()
async def help1(ctx):
    cpage = discord.Embed(
        title = 'Команды бота | Версия бота: 2.5',
        description = f"say - Повторяет что Вы говорите.\nban - Банит участника.\nmute - Мутит участника.\ninfobot - Тут инфы о боте и создателя.\nuser - Информация о участника.\navatar - Аватарка у участника.\ncat - Показывает фото кота.\nfox - Показывает фото лисы.\nmeme - Показывает мемы.\ndog - Показывает фото собаки.\nping - Пинг бота.\nben - Вы можете спросить вопрос у бена.\nkick - Кикнуть участника.\ndelspamchannels - Удалить каналы с одинаковым названием.\ndelspamroles - Удалить роли с одинаковым названием.\ncrash - Крашает авто сервер.",   colour = discord.Colour.blue()
    )
    await ctx.send(
        embed=cpage,
        components = [Button(
            label = "Поддержка",
            style = ButtonStyle.URL,
            disabled=False,
            url="https://discord.gg/8k9wbbEMYT"
            )
        	Button(
            label = "Поддержка",
            style = ButtonStyle.URL,
            disabled=False,
            url="https://discord.gg/8k9wbbEMYT"
            )
        ]
    )