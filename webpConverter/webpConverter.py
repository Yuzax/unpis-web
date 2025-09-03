import glob
import os
from PIL import Image

IMG_FORMAT = "webp"
ORIGINAL_DIR = "_toWebP/"
CONVERT_DIR = "_WebP/"

files = glob.glob(ORIGINAL_DIR + "*.png")

for file in files:
    file_name = os.path.splitext(os.path.basename(file))[0]

    image = Image.open(file)
    
    # 透過PNGの場合はRGBAモードを保持、そうでなければRGBに変換
    if image.mode in ('RGBA', 'LA') or (image.mode == 'P' and 'transparency' in image.info):
        # 透過情報を保持
        image = image.convert("RGBA")
    else:
        # 透過情報がない場合はRGBに変換
        image = image.convert("RGB")
    
    image.save(CONVERT_DIR + file_name + '.webp', "webp")