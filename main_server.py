from fastapi import FastAPI, File, UploadFile, Response
import uvicorn
import numpy as np
import pandas as pd
from io import BytesIO
from PIL import Image
import tensorflow as tf
from tensorflow import keras
from io import BytesIO
import base64
from fastapi.middleware.cors import CORSMiddleware
import cv2 


from utils import *

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



"""
This is for the segmentation
"""
model = keras.models.load_model('unetv.hdf5', custom_objects={'dice_coefficients_loss': dice_coefficients_loss, 'iou': iou, 'dice_coefficients': dice_coefficients  } )

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.get("/ping")
async def ping():
    return "Hello i am  alive"

@app.post("/segment")
async def segment(
    file: UploadFile = File(...)
):


    image = read_file_as_image(await file.read())
    print(image.shape)
   
    image_batch = np.expand_dims(image, axis=0)
   
    reshaping_image = tf.image.resize(image_batch, (256, 256,))
    print(reshaping_image.shape)
    
    test =reshaping_image/255
    print(test)
    predictions =  model.predict(test)
    
    arr = np.squeeze(predictions[0])  
    img = Image.fromarray((255 * arr).astype(np.uint8))  
    img.save('output_image.png')
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    imgS = base64.b64encode(buffer.getvalue())
    print(img)

    
    return Response(content=imgS, media_type="image/png")
  



if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)