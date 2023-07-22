import os
import io
import asyncio


import telegram
import requests
from PIL import Image

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

    async def add_sticker(url, emoji):
        path = "/tmp/test.png"
        response = requests.get(url, stream=True)
        with open(path, mode="wb") as fio:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    fio.write(chunk)
        with Image.open(path) as image:
            stream = io.BytesIO()
            image.resize((512, 512), Image.BILINEAR).save(stream, format=image.format)
        sticker = telegram.InputSticker(emoji_list=[emoji], sticker=stream.getvalue())
        await bot.add_sticker_to_set(name=STICKER_SET_NAME,
                                     sticker=sticker,
                                     user_id=STICKER_SET_OWNER_ID,
                                     connect_timeout=60,
                                     pool_timeout=120,
                                     read_timeout=120,
                                     write_timeout=120)

    stickers = await list_stickers()
    print(len(stickers))
    await delete_sticker(0)
    stickers = await list_stickers()
    print(len(stickers))
    await add_sticker("https://cards2.collecttrumpcards.com/cards/3627c140e.jpg", "🐶")

if __name__ == "__main__":
    asyncio.run(main())