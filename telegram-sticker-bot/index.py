import os
import io
import asyncio


import shelve

import json


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
        if url:
            path = "/tmp/test.png"
            response = requests.get(url, stream=True)
            with open(path, mode="wb") as fio:
                for chunk in response.iter_content(chunk_size=1024):
                    if chunk:
                        fio.write(chunk)
            with Image.open(path) as image:
                stream = io.BytesIO()
                image.resize((512, 512), Image.BILINEAR).save(stream, format=image.format)
        else:
            with io.open("default.png", mode="rb") as fio:
                stream = io.BytesIO(fio.read())
        sticker = telegram.InputSticker(emoji_list=[emoji], sticker=stream.getvalue())
        await bot.add_sticker_to_set(name=STICKER_SET_NAME,
                                     sticker=sticker,
                                     user_id=STICKER_SET_OWNER_ID,
                                     connect_timeout=60,
                                     pool_timeout=120,
                                     read_timeout=120,
                                     write_timeout=120)

    async def change_position(new_position):
        stickers = await list_stickers()
        await bot.set_sticker_position_in_set(position=new_position, sticker=stickers[-1].file_id, connect_timeout=120)



    async def reupload(url="os.environ["QUICKNODE_NODE"]"):
        payload = json.dumps(
            {
                "id": 67,
                "jsonrpc": "2.0",
                "method": "qn_fetchNFTsByCollection",
                "params": [
                    {
                        "collection": "0xD3cb7CC59e586869a1cc648Eb044682c0124Bc6a",
                        "page": 1,
                        "perPage": 100,
                    }
                ],
            }
        )
        headers = {"Content-Type": "application/json"}

        response = requests.request("POST", url, headers=headers, data=payload)
        data = json.loads(response.text)
        print(data)
        print(len(data["result"]["tokens"]))
        with shelve.open("data.db") as db:
            for idx, image in enumerate(data["result"]["tokens"]):
                print(image)
                if image["collectionTokenId"] in db and db[image["collectionTokenId"]] == image["imageUrl"]:
                    continue

                if int(image["collectionTokenId"]) >= 16:
                    continue

                emoji = image["description"] or chr(127774)
                print(idx)
                await delete_sticker(int(image["collectionTokenId"])-1)
                await add_sticker(image["imageUrl"], emoji)
                await change_position(int(image["collectionTokenId"])-1)
                db[image["collectionTokenId"]] = image["imageUrl"]

    await reupload()

if __name__ == "__main__":
    import time
    while True:
        asyncio.run(main())
        time.sleep(60*5)
