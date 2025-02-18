import glob
import os
from PIL import Image

IMG_FORMAT = "webp"
ORIGINAL_DIR = "_toWebP/"
CONVERT_DIR = "_WebP/"

files = glob.glob(ORIGINAL_DIR + "*.jpg")

for file in files:
    file_name = os.path.splitext(os.path.basename(file))[0]

    image = Image.open(file)
    image = image.convert("RGB")
    image.save(CONVERT_DIR + file_name + '.webp', "webp")