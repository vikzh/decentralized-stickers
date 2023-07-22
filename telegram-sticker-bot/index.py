import os
import asyncio

import telegram

import dotenv


dotenv.load_dotenv()

BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]

STICKER_SET_NAME = "crypto_stickers_by_cryptopicbot"
STICKER_SET_TITLE = "Stickers based on cryptocurrencies"


STICKER_SET_OWNER_ID = os.environ["STICKER_SET_OWNER_ID"]


async def main():
    bot = telegram.Bot(token=BOT_TOKEN)

    async def list_stickers():
        sticker_set = await bot.get_sticker_set(name=STICKER_SET_NAME, connect_timeout=60)
        return list(sticker_set.stickers)

    async def delete_sticker(position):
        assert position >= 0 and position < 120
        stickers = await list_stickers()
        await bot.delete_sticker_from_set(stickers[position].file_id, connect_timeout=160)

    stickers = await list_stickers()
    print(len(stickers))
    await delete_sticker(0)
    stickers = await list_stickers()
    print(len(stickers))

if __name__ == "__main__":
    asyncio.run(main())