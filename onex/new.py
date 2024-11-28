import numpy as np
from PIL import Image
from flask import Flask, request
import onnxruntime as rt

app = Flask(__name__)

# Load the ONNX model
sess = rt.InferenceSession("DFUmodel.onnx")

# Define the input and output names for the model
input_name = sess.get_inputs()[0].name
output_name = sess.get_outputs()[0].name


def test_model(file):
    # open the image
    file = Image.open(file)

    # Resize the image
    img = file.resize((512, 512))
    # normalization of image
    img = img / np.max(img)

    # Convert the image to a numpy array
    input_data = np.array(img).astype(np.float32)

    # Transpose the input tensor to match the expected shape of the model
    input_data = np.transpose(input_data, (2, 0, 1))
    input_data = np.expand_dims(input_data, axis=0)

    # Run inference on the input data
    output_data = sess.run([output_name], {input_name: input_data})

    # Convert the output data to a JSON object and return it
    result = {'result': output_data[0].tolist()}

    if result['result'][0][1] < 0:
        return "DFU "
    else:
        return "Health"


@app.route('/')
def home():
    return 'Server works'


@app.route('/image', methods=['POST'])
def image():
    file = request.files['file']
    file.save('uploads/' + file.filename)
    path = 'uploads/' + file.filename
    result = test_model(path)
    return {
        "message": 'File uploaded successfully',
        "result": result
    }


if __name__ == '__main__':
    app.run(debug=True)