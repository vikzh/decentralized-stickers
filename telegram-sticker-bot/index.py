import os
import asyncio

import telegram

import dotenv


dotenv.load_dotenv()

BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]

STICKER_SET_NAME = "crypto_stickers_by_stickerbot"
STICKER_SET_TITLE = "Stickers pack based on DAO"


STICKER_SET_OWNER_ID = os.environ["STICKER_SET_OWNER_ID"]


async def list_stickers():
    bot = telegram.Bot(token=BOT_TOKEN)
    sticker_set = await bot.get_sticker_set(name=STICKER_SET_NAME, connect_timeout=60)
    return list(sticker_set.stickers)


async def main():
    stickers = await list_stickers()
    for sticker in stickers:
        print(sticker)


if __name__ == "__main__":
    asyncio.run(main())
